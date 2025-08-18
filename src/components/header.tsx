import { Button } from '~components/button';

const handleClick = () => {
  console.log('open modal');
};

export const Header = () => {
  return (
    <header className="border-primary-600 w-full border-b-3 p-4 text-center text-sm shadow-sm">
      <nav className="flex flex-col items-center gap-2 md:flex-row md:justify-center md:gap-6">
        <Button onClick={handleClick} variant="outline">
          Controlled Form
        </Button>
        <Button onClick={handleClick} variant="secondary">
          Uncontrolled Form
        </Button>
      </nav>
    </header>
  );
};