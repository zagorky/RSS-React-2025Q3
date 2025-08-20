import type { FormType } from '~types/form-types';

import { ItemImg } from '~components/img-item';
import { InfoBadge } from '~components/info-badge';
import { cn } from '~utils/cn';

export const FormCard = ({ form }: { form: FormType }) => {
  const { name, age, gender, email, password, country, image } = form;

  return (
    <div className={cn('border-warning m-2 w-full max-w-[350px] columns-sm rounded-lg border-3 p-4')}>
      <div className="flex w-full flex-wrap items-center justify-between gap-4">
        <div className="flex w-full items-center justify-between gap-6">
          <div className="w-full max-w-20 overflow-hidden rounded-full">
            <ItemImg url={image} alt={`${name} image`} />
          </div>
          <InfoBadge data={name} testId={name} color="bg-primary-200 text-text-primary" />
        </div>
        <div className="flex w-full items-center justify-between gap-6">
          <InfoBadge name="Age:" data={age} testId={`${age}`} color="bg-secondary-300 text-text-primary" />
          <InfoBadge name="Country:" data={country} testId={country} color="bg-primary-400 text-text-primary" />
        </div>
        <InfoBadge name="Gender:" data={gender} testId={gender} color="bg-secondary-500 " />
      </div>
      <div className="flex flex-nowrap items-center justify-between gap-4">
        <InfoBadge name="Email:" data={email} testId={email} color="bg-primary-600" />
        <InfoBadge name="Password" data={password} testId={password} color="bg-secondary-700" />
      </div>
    </div>
  );
};