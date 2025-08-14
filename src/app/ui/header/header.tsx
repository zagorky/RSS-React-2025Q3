import { navBar } from '~config/navigation';
import LocaleSwitcher from '~ui/locale-switcher/locate-switcher';
import NavElement from '~ui/nav-element/nav-element';
import { ThemeSwitcher } from '~ui/theme-switcher/theme-switcher';

export const Header = () => {
  return (
    <header className="border-primary-600 w-full border-b-3 px-4 py-6 text-center text-sm shadow-sm">
      <nav className="flex flex-wrap items-center justify-center gap-2">
        {/*<RefreshQueryButton />*/}
        <LocaleSwitcher />

        {navBar.map((item) => (
          <NavElement
            key={item.title}
            path={item.path}
            translationKey={item.title}
          />
        ))}
        <ThemeSwitcher />
      </nav>
    </header>
  );
};