import './App.css';
import FeedbackPage from './pages/Feedback';
import LandingPage from './pages/LandingPage';
import NgoDashboard from './pages/NgoDashboard';
import Signup from './pages/SignupPage';
import SurvivorDashboard from './pages/SurvivorDashboard';
import VolunteerPage from './pages/VolunteerPage';
import AboutPage from './pages/AboutPage';
import DonationsPage from './pages/DonationsPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ThemeProvider, { ThemeContext } from './context/ThemeContext';
import LoginPage from './pages/LoginPage';
import UserTypeSelectionPage from './pages/UserTypeSelectionPage';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from './store/appSlice';
import { fetchNgoProfile } from './store/ngoSlice';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/survivorDashboard',
    element: <SurvivorDashboard />,
  },
  {
    path: '/ngoDashboard',
    element: <NgoDashboard />,
  },
  {
    path: '/feedback',
    element: <FeedbackPage />,
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/selectUserType',
    element: <UserTypeSelectionPage />
  },
  {
    path: '/volunteer',
    element: <VolunteerPage />
  },
  {
    path: '/about',
    element: <AboutPage />
  },
  {
    path: '/donate',
    element: <DonationsPage />
  }
]);

function App() {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    console.log("App.jsx - isAuthenticated:", isAuthenticated);
    console.log("App.jsx - user?.userType:", user?.userType);
    console.log("App.jsx - user?._id:", user?._id);

    if (isAuthenticated && user?.userType === 'NGO' && user?._id) {
      console.log("App.jsx - Dispatching fetchNgoProfile with userId:", user._id);
      dispatch(fetchNgoProfile(user._id));
    }
  }, [isAuthenticated, user, dispatch]);

  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
