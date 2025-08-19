import { CollectedForms } from '~components/collected-forms';
import { ControlledForm } from '~components/controlled-form';

const MainPage = () => {
  return (
    <>
      {/*<UncontrolledForm />*/}
      <ControlledForm />
      <CollectedForms />
    </>
  );
};

export default MainPage;