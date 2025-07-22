import { Header } from '~components/header/header';
import { Outlet } from 'react-router';

export const Layout = () => {
  return (
    <div className="main-wrapper">
      <Header />
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
};