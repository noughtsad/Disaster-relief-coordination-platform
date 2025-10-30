# Authentication Flow Diagrams

## 1. User Login Flow

```
┌─────────────┐
│   User      │
│  Login Page │
└──────┬──────┘
       │ Enters credentials
       ▼
┌─────────────────────┐
│  POST /auth/login   │
│   (Backend)         │
└──────┬──────────────┘
       │ Validates credentials
       │ Issues JWT with userType
       ▼
┌─────────────────────┐
│  Redux Store        │
│  (Frontend)         │
│  - user             │
│  - isAuthenticated  │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  ProtectedRoute     │
│  Component          │
└──────┬──────────────┘
       │ Quick check: user.userType
       │
       ▼
┌──────────────────────────────┐
│ GET /auth/validate/:dashboard│
│        (Backend)             │
└──────┬───────────────────────┘
       │ Validates JWT & userType
       │
       ▼
    ┌──────┐
    │Valid?│
    └──┬───┘
       │
   ┌───┴────┐
   │Yes     │No
   ▼        ▼
┌────────┐ ┌──────────────┐
│Render  │ │  Redirect    │
│Dashboard│ │  - /login    │
└────────┘ │  - /select   │
           │  - /correct  │
           └──────────────┘
```

## 2. New User Signup Flow

```
┌─────────────┐
│   User      │
│ Signup Page │
└──────┬──────┘
       │ Enters details
       ▼
┌─────────────────────┐
│ POST /auth/signup   │
│   (Backend)         │
│ userType: null      │
└──────┬──────────────┘
       │ Issues JWT
       ▼
┌─────────────────────┐
│  Redux Store        │
│  user.userType=null │
└──────┬──────────────┘
       │
       ▼
┌──────────────────────┐
│  ProtectedRoute      │
│  (Any Dashboard)     │
└──────┬───────────────┘
       │ Checks: !user.userType
       ▼
┌──────────────────────┐
│ Redirect to          │
│ /selectUserType      │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ User selects type    │
│ POST /updateUserType │
└──────┬───────────────┘
       │ Updates userType
       │ Issues new JWT
       ▼
┌──────────────────────┐
│ Navigate to          │
│ Correct Dashboard    │
└──────────────────────┘
```

## 3. Google OAuth Flow

```
┌─────────────┐
│   User      │
│ Click Google│
└──────┬──────┘
       │
       ▼
┌─────────────────────┐
│ GET /auth/google    │
│   (Backend)         │
└──────┬──────────────┘
       │ Redirect to Google
       ▼
┌─────────────────────┐
│  Google OAuth       │
│  (External)         │
└──────┬──────────────┘
       │ User authenticates
       ▼
┌─────────────────────┐
│ /auth/google/       │
│  callback           │
└──────┬──────────────┘
       │ Find/Create user
       │ Issue JWT
       ▼
    ┌──────────┐
    │userType? │
    └──┬───────┘
       │
   ┌───┴────┐
   │Yes     │No
   ▼        ▼
┌────────┐ ┌──────────────┐
│Redirect│ │  Redirect    │
│to      │ │  to          │
│Dashboard│ │/selectUserType│
└────────┘ └──────────────┘
```

## 4. Dashboard Access Validation

```
┌─────────────────────┐
│   User navigates    │
│   to /ngoDashboard  │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  ProtectedRoute     │
│  requiredUserType   │
│  = "NGO"            │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  Check Redux State  │
│  isAuthenticated?   │
└──────┬──────────────┘
       │
   ┌───┴────┐
   │No      │Yes
   ▼        ▼
┌────────┐ ┌──────────────┐
│Redirect│ │Check userType│
│to      │ │  exists?     │
│/login  │ └──────┬───────┘
└────────┘        │
            ┌─────┴─────┐
            │No         │Yes
            ▼           ▼
      ┌──────────┐ ┌──────────────┐
      │Redirect  │ │Quick check:  │
      │to        │ │userType="NGO"│
      │/select   │ └──────┬───────┘
      └──────────┘        │
                    ┌─────┴─────┐
                    │No         │Yes
                    ▼           ▼
              ┌──────────┐ ┌──────────────┐
              │Redirect  │ │Call Backend  │
              │to correct│ │/auth/validate│
              │dashboard │ │/ngo          │
              └──────────┘ └──────┬───────┘
                                  │
                            ┌─────┴─────┐
                            │Valid?     │
                            └─────┬─────┘
                              ┌───┴───┐
                              │Yes│No │
                              ▼   ▼   
                          ┌─────┐ ┌─────────┐
                          │Render│ │Redirect │
                          │NGO   │ │to       │
                          │Dash  │ │correct  │
                          └─────┘ └─────────┘
```

## 5. Backend Middleware Chain

```
┌─────────────────────────────────┐
│  Incoming Request               │
│  POST /ngo                      │
└────────┬────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│  isAuthenticated Middleware     │
│  - Check JWT token              │
│  - Decode user info             │
│  - Attach to req.user           │
└────────┬────────────────────────┘
         │
         ▼ Success
┌─────────────────────────────────┐
│  checkUserType(["NGO"])         │
│  Middleware                     │
│  - Check req.user exists        │
│  - Check userType not null      │
│  - Check userType in allowed    │
└────────┬────────────────────────┘
         │
         ▼ Success
┌─────────────────────────────────┐
│  createNgo Controller           │
│  - Execute business logic       │
│  - Return response              │
└─────────────────────────────────┘

         Failure paths:
         ├─ No token → 401 Unauthorized
         ├─ Invalid token → 401 Unauthorized  
         ├─ No userType → 403 (select type)
         └─ Wrong userType → 403 (denied)
```

## 6. ProtectedRoute Component Logic

```
┌─────────────────────────────────┐
│  <ProtectedRoute>               │
│    requiredUserType="NGO"       │
│    dashboardType="ngo"          │
│  </ProtectedRoute>              │
└────────┬────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│  useEffect - Validation         │
└────────┬────────────────────────┘
         │
         ▼
    ┌────────────┐
    │isAuth?     │
    └────┬───────┘
         │
   ┌─────┴─────┐
   │No         │Yes
   ▼           ▼
┌────────┐ ┌──────────┐
│Return  │ │userType? │
│Navigate│ └────┬─────┘
│/login  │      │
└────────┘  ┌───┴───┐
            │No│Yes │
            ▼  ▼    
       ┌─────┐ ┌─────────────┐
       │Nav  │ │Match        │
       │/sel │ │required?    │
       └─────┘ └────┬────────┘
                    │
                ┌───┴───┐
                │No│Yes │
                ▼  ▼    
           ┌─────┐ ┌──────────┐
           │Nav  │ │Backend   │
           │to   │ │Validate  │
           │corr │ └────┬─────┘
           └─────┘      │
                    ┌───┴───┐
                    │Valid? │
                    └───┬───┘
                    ┌───┴───┐
                    │Yes│No │
                    ▼   ▼
              ┌──────┐ ┌──────┐
              │Render│ │Nav to│
              │Child │ │corr  │
              └──────┘ └──────┘
```

## Component Relationships

```
┌─────────────────────────────────────────────────┐
│                   App.jsx                       │
│  ┌──────────────────────────────────────────┐  │
│  │           <Root />                       │  │
│  │  ┌────────────────────────────────────┐ │  │
│  │  │  <Navbar />                        │ │  │
│  │  └────────────────────────────────────┘ │  │
│  │  ┌────────────────────────────────────┐ │  │
│  │  │  <Outlet />                        │ │  │
│  │  │    ├─ /login                       │ │  │
│  │  │    ├─ /signup                      │ │  │
│  │  │    ├─ /selectUserType              │ │  │
│  │  │    │                                │ │  │
│  │  │    ├─ <ProtectedRoute>             │ │  │
│  │  │    │   <SurvivorDashboard />       │ │  │
│  │  │    │                                │ │  │
│  │  │    ├─ <ProtectedRoute>             │ │  │
│  │  │    │   <NgoDashboard />            │ │  │
│  │  │    │                                │ │  │
│  │  │    ├─ <ProtectedRoute>             │ │  │
│  │  │    │   <VolunteerPage />           │ │  │
│  │  │    │                                │ │  │
│  │  │    └─ <ProtectedRoute>             │ │  │
│  │  │        <SupplierDashboard />       │ │  │
│  │  └────────────────────────────────────┘ │  │
│  └──────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```
