import { queryClient } from '~api/query-client';
import { Button } from '~components/button/button';
import { ThemeSwitcher } from '~components/theme-switcher/theme-switcher';
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
                'relative rounded-md px-4 py-2 font-medium transition-all duration-300 ease-in-out',
                'hover:text-text-primary-500',
                {
                  'bg-primary-500 hover:bg-primary-600/70 text-text-on-primary after:bg-primary-600 font-semibold':
                    isActive,
                  'text-text-secondary hover:text-text-primary': !isActive,
                }
              )
            }
          >
            {item.title}
          </NavLink>
        ))}
        <ThemeSwitcher />
        <Button
          variant="secondary"
          classNames="cursor-pointer"
          onClick={() => queryClient.clear()}
        >
          Clean cache
        </Button>
      </nav>
    </header>
  );
};
