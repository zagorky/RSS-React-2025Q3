import {Button} from '~components/button';
import {CollectedForms} from '~components/collected-forms';
import {ControlledForm} from '~components/forms/controlled-form';
import {UncontrolledForm} from '~components/forms/uncontrolled-form';
import {Modal, ModalProvider} from '~components/modal/modal';
import {XIcon} from 'lucide-react';

const App = () => (
  <ModalProvider>
    <div className="main-wrapper">
      <header className="border-primary-600 w-full border-b-3 p-4 text-center text-sm shadow-sm">
        <nav className="flex flex-col items-center gap-2 md:flex-row md:justify-center md:gap-6">
          <Modal
            type="controlled"
            openButton={<Button variant="outline">Controlled Form</Button>}
            closeButton={<XIcon className="justify-self-center" />}
          >
            <ControlledForm />
          </Modal>
          <Modal
            type="uncontrolled"
            openButton={<Button variant="secondary">Uncontrolled Form</Button>}
            closeButton={<XIcon className="justify-self-center" />}
          >
            <UncontrolledForm />
          </Modal>
        </nav>
      </header>
      <main className="main">
        <CollectedForms />
      </main>
    </div>
  </ModalProvider>
);

export default App;