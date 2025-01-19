import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoading } from '../redux/selectors/CommonSelector';
import LoadingModal from './Modal/LoadingModal';
import { storage } from '../constants/storage';
import { useEffect } from 'react';
import { loginSuccess } from '../redux/slices/AuthSlice';
import { userActions } from '../redux/actions/UserActions';

const Layout = () => {
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedInUser = storage.getUser();
    if (loggedInUser) {
      dispatch(loginSuccess(JSON.parse(loggedInUser)));
    }else{
      dispatch(userActions.getMe());
    }
  }, [dispatch]);

  return (
    <>
      <NavBar />
      <main className="flex-1 ">
        <Outlet />
      </main>
      <Footer />
      <LoadingModal isOpen={loading} />
    </>
  );
};

export default Layout;
