import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setUser } from './store/appSlice';
import FeedbackPage from './pages/Feedback';
import LandingPage from './pages/LandingPage';
import NgoDashboard from './pages/NgoDashboard';
import Signup from './pages/Signup';
import SurvivorDashboard from './pages/SurvivorDashboard';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ThemeProvider, { ThemeContext } from './context/ThemeContext'; // Import ThemeProvider and ThemeContext

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
  }
]);

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.app);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(setUser({ username: 'Guest' }));
    }
  }, [dispatch]);

  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
