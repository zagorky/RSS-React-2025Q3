import { Outlet } from 'react-router';

export const Layout = () => {
  return (
    <div className="main-wrapper">
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
};
