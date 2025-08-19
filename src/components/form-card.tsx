import type { FormType } from '~types/form-types';

import { InfoBadge } from '~components/info-badge';
import { cn } from '~utils/cn';

export const FormCard = ({ form }: { form: FormType }) => {
  const { name, age, gender, email, password, country } = form;

  return (
    <div className={cn('border-warning m-2 columns-sm rounded-lg border-3 p-4')}>
      {/*<ItemImg url={} alt={} />*/}
      <div className="flex w-full flex-wrap items-center justify-between gap-4">
        <InfoBadge name="Name:" data={name} testId={name} color="bg-primary-200 text-text-primary" />
        <InfoBadge name="Age:" data={age} testId={`${age}`} color="bg-secondary-300 text-text-primary" />
        <InfoBadge name="Country:" data={country} testId={country} color="bg-secondary-400" />
        <InfoBadge name="Gender:" data={gender} testId={gender} color="bg-primary-500 " />
      </div>
      <div className="flex flex-nowrap items-center justify-between gap-4">
        <InfoBadge name="Email:" data={email} testId={email} color="bg-secondary-600" />
        <InfoBadge name="Password" data={password} testId={password} color="bg-primary-700" />
      </div>
    </div>
  );
};