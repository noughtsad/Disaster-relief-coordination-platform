import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { fetchUser } from '../store/appSlice';
import Navbar from './Navbar';
import Footer from './Footer';

const Root = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.app);

  useEffect(() => {
    // Fetch user data on app load to check authentication status
    dispatch(fetchUser());
  }, [dispatch]);

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
