import './App.css'
import ThemeProvider from './context/ThemeContext'
import LandingPage from './pages/LandingPage'
import Signup from './pages/Signup'
import SurvivorDashboard from './pages/SurvivorDashboard'
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
    path: '/survivorDashboard',
    element: <SurvivorDashboard />,
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
