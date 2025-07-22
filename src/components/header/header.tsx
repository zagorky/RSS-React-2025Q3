import { navigation } from '~config/navigation';
import { NavLink } from 'react-router';

export const Header = () => {
  return (
    <header className="w-full border-b px-4 py-6 text-center text-sm shadow-sm">
      <nav className="flex flex-col items-center gap-2 md:flex-row md:justify-center md:gap-6">
        <NavLink
          to={navigation.main}
          className={({ isActive }) =>
            `transition-colors hover:underline ${
              isActive ? 'font-semibold' : 'text-gray-600'
            }`
          }
        >
          Main
        </NavLink>
        <NavLink
          to={navigation.about}
          className={({ isActive }) =>
            `transition-colors hover:underline ${
              isActive ? 'font-semibold' : 'text-gray-600'
            }`
          }
        >
          About
        </NavLink>
      </nav>
    </header>
  );
};