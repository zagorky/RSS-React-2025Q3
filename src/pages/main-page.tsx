import { CollectedForms } from '~components/collected-forms';
import { ControlledForm } from '~components/forms/controlled-form';
import { UncontrolledForm } from '~components/forms/uncontrolled-form';

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