import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { fetchUser } from '../store/appSlice';
import Navbar from './Navbar';
import Footer from './Footer';

const Root = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    const publicPaths = ['/', '/about', '/donate', '/login', '/signup'];
    if (!isAuthenticated && !publicPaths.includes(window.location.pathname)) {
      navigate('/signup');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar user={user} isAuthenticated={isAuthenticated} />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Root;
