import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';

const Layout = () => {
  return (
    <>
      <NavBar />
      <main className="flex-1 ">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
