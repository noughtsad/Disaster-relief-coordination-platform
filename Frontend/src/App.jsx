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
import ThemeProvider from './context/ThemeContext';
import LoginPage from './pages/LoginPage';
import UserTypeSelectionPage from './pages/UserTypeSelectionPage';
import Root from './components/Root';
import PageNotFound from './pages/PageNotFound';
import SupplierDashboard from './pages/SupplierDashboard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
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
      },
      {
        path: '/supplierDashboard',
        element: <SupplierDashboard />
      },
      {
        path: '*',
        element: <PageNotFound />
      }
    ]
  }
]);

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;