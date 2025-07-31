import { ThemeSwitcher } from '~components/theme-switcher/components/theme-switcher';
import { navBar } from '~config/navigation';
import { cn } from '~utils/cn';
import { NavLink } from 'react-router';

export const Header = () => {
  return (
    <header className="border-primary-600 w-full border-b-3 px-4 py-6 text-center text-sm shadow-sm">
      <nav className="flex flex-col items-center gap-2 md:flex-row md:justify-center md:gap-6">
        {navBar.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                'text-text-primary relative rounded-md px-4 py-2 font-medium transition-all duration-300 ease-in-out',
                'hover:text-primary-500',
                isActive &&
                  'bg-primary-500 text-text-on-primary hover:text-text-secondary after:bg-primary-600 font-semibold',
                !isActive && 'text-text-primary'
              )
            }
          >
            {item.title}
          </NavLink>
        ))}
        <ThemeSwitcher />
      </nav>
    </header>
  );
};
