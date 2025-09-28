import './App.css'
import ThemeProvider from './context/ThemeContext'
import FeedbackPage from './pages/Feedback'
import LandingPage from './pages/LandingPage'
import NgoDashboard from './pages/NGO/NgoDashboard'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Register from './pages/Register'
import SurvivorDashboard from './pages/Survivor/SurvivorDashboard'
import VolunteerDashboard from './pages/Volunteer/VolunteerDashboard'
import DonationsPage from './pages/Donations'
import AboutPage from './pages/About'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

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
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
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
    path: '/volunteerDashboard',
    element: <VolunteerDashboard />,
  },
  {
    path: '/donations',
    element: <DonationsPage />,
  },
  {
    path: '/about',
    element: <AboutPage />,
  },
  {
    path: '/feedback',
    element: <FeedbackPage />,
  }
]);

function App() {
  return (
    <>
      <ThemeProvider><RouterProvider router={router} /></ThemeProvider>
    </>
  );
};

export default App
