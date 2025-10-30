import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';

/**
 * ProtectedRoute component that checks both authentication and user type
 * @param {Object} props
 * @param {React.ReactNode} props.children - The component to render if access is granted
 * @param {string} props.requiredUserType - The user type required to access this route (e.g., 'Survivor', 'NGO', 'Volunteer', 'Supplier')
 * @param {string} props.dashboardType - The dashboard type for validation endpoint (e.g., 'survivor', 'ngo', 'volunteer', 'supplier')
 */
const ProtectedRoute = ({ children, requiredUserType, dashboardType }) => {
  const { isAuthenticated, user } = useSelector((state) => state.app);
  const location = useLocation();
  const [validating, setValidating] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const validateAccess = async () => {
      // If not authenticated, stop validation
      if (!isAuthenticated) {
        setValidating(false);
        setHasAccess(false);
        return;
      }

      // If user hasn't selected a user type, redirect to selection page
      if (!user?.userType) {
        setValidating(false);
        setHasAccess(false);
        return;
      }

      // Quick client-side check before making API call
      if (user.userType !== requiredUserType) {
        setValidating(false);
        setHasAccess(false);
        return;
      }

      // Validate with backend to ensure token is valid and user type matches
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/auth/validate/${dashboardType}`,
          { withCredentials: true }
        );
        
        if (response.data.hasCorrectUserType) {
          setHasAccess(true);
        } else {
          setHasAccess(false);
        }
      } catch (error) {
        console.error('Dashboard validation failed:', error);
        setHasAccess(false);
      } finally {
        setValidating(false);
      }
    };

    validateAccess();
  }, [isAuthenticated, user, requiredUserType, dashboardType]);

  // Show loading state while validating
  if (validating) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Validating access...</p>
        </div>
      </div>
    );
  }

  // Not authenticated - redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Authenticated but no user type selected - redirect to selection page
  if (!user?.userType) {
    return <Navigate to="/selectUserType" state={{ from: location }} replace />;
  }

  // Authenticated but wrong user type - redirect to their correct dashboard
  if (!hasAccess) {
    const redirectMap = {
      'Survivor': '/survivorDashboard',
      'NGO': '/ngoDashboard',
      'Volunteer': '/volunteer',
      'Supplier': '/supplierDashboard'
    };
    
    const correctDashboard = redirectMap[user.userType];
    
    // If already on their correct dashboard, show them
    if (location.pathname === correctDashboard) {
      return children;
    }
    
    // Redirect to their correct dashboard
    return <Navigate to={correctDashboard || '/'} replace />;
  }

  // All checks passed - render the protected content
  return children;
};

export default ProtectedRoute;
