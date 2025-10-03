import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { fetchUser } from '../store/appSlice';
import Navbar from './Navbar';

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
    <>
      <Navbar user={user} isAuthenticated={isAuthenticated} />
      <Outlet />
    </>
  );
};

export default Root;
