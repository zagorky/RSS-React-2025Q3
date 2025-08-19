import type { FormType } from '~types/form-types';

import { InfoBadge } from '~components/info-badge';

export const FormCard = ({ form }: { form: FormType }) => {
  const { name, age, gender, email, password } = form;

  return (
    <div className="flex flex-wrap">
      {/*<ItemImg url={} alt={} />*/}
      <InfoBadge data={name} testId={name} color="bg-primary-200" />
      <InfoBadge data={age} testId={`${age}`} color="bg-secondary-200" />
      <InfoBadge data={gender} testId={gender} color="bg-primary-200" />
      <InfoBadge data={email} testId={email} color="bg-secondary-200" />
      <InfoBadge data={password} testId={password} color="bg-primary-200" />
    </div>
  );
};