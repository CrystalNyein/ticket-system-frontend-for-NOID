import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';
import { useSelector } from 'react-redux';
import { selectLoading } from '../redux/selectors/CommonSelector';
import LoadingModal from './Modal/LoadingModal';

const Layout = () => {
  const loading = useSelector(selectLoading);

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
