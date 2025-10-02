import './App.css';
import FeedbackPage from './pages/Feedback';
import LandingPage from './pages/LandingPage';
import NgoDashboard from './pages/NgoDashboard';
import Signup from './pages/SignupPage';
import SurvivorDashboard from './pages/SurvivorDashboard';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ThemeProvider, { ThemeContext } from './context/ThemeContext';
import LoginPage from './pages/LoginPage';

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