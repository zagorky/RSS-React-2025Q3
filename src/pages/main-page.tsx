import { CollectedForms } from '~components/collected-forms';
import { ControlledForm } from '~components/controlled-form';
import { UncontrolledForm } from '~components/uncontrolled-form';

const MainPage = () => {
  return (
    <>
      <div className="flex">
        <UncontrolledForm />
        <ControlledForm />
      </div>
      <CollectedForms />
    </>
  );
};

export default MainPage;