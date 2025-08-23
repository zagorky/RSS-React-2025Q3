import { ItemImg } from '~components/img-item';
import { InfoBadge } from '~components/info-badge';
import { cn } from '~utils/cn';
import { useEffect, useState } from 'react';

import type { StoreFormType } from '~/store/use-form-store';

export const FormCard = ({ form }: { form: StoreFormType }) => {
  const { name, age, gender, email, password, country, image, createAt } = form;

  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    const created = new Date(createAt).getTime();

    if (Date.now() - created < 2000) {
      setIsNew(true);
      const timer = setTimeout(() => setIsNew(false), 2000);

      return () => clearTimeout(timer);
    }
  }, [createAt]);

  return (
    <div
      className={cn('m-2 w-full max-w-[350px] columns-sm rounded-lg border-3 p-4 transition-colors duration-500', {
        'border-warning': isNew,
      })}
    >
      <div className="flex w-full flex-wrap items-center justify-between gap-4">
        <div className="flex w-full items-center justify-between gap-6">
          <div className="w-full max-w-20 overflow-hidden rounded-full">
            <ItemImg testId={`img-${name}`} url={image} alt={`${name} image`} />
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