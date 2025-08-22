import {Button} from '~components/button';
import {CollectedForms} from '~components/collected-forms';
import {Modal} from '~components/modal';

const App = () => {
  return (
    <div className="main-wrapper">
      <header className="border-primary-600 w-full border-b-3 p-4 text-center text-sm shadow-sm">
        <nav className="flex flex-col items-center gap-2 md:flex-row md:justify-center md:gap-6">
          <Button variant="outline">Controlled Form</Button>
          <Button variant="secondary">Uncontrolled Form</Button>
        </nav>
      </header>
      <Modal id="d">s</Modal>
      <main className="main">
        <CollectedForms />
      </main>
    </div>
  );
};

export default App;