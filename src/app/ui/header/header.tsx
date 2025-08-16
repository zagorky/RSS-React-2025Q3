import { navBar } from '~config/navigation';
import LocaleSwitcher from '~ui/locale-switcher/locate-switcher';
import NavElement from '~ui/nav-element/nav-element';
import { RefreshQueryButton } from '~ui/refresh-query-button/refresh-query-button';
import { ThemeSwitcher } from '~ui/theme-switcher/theme-switcher';

export const Header = () => {
  return (
    <header className="border-primary-600 te xt-sm flex w-full justify-between border-b-3 p-4 text-center shadow-sm">
      <nav className="flex flex-wrap items-center justify-center gap-2">
        {navBar.map((item) => (
          <NavElement
            key={item.title}
            path={item.path}
            translationKey={item.title}
          />
        ))}
      </nav>
      <div className="flex flex-wrap gap-4">
        <RefreshQueryButton />
        <LocaleSwitcher />
        <ThemeSwitcher />
      </div>
    </header>
  );
};