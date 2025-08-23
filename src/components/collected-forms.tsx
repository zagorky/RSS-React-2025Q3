import { FormCard } from '~components/form-card';

import { useCollectedForms } from '~/store/use-form-store';

export const CollectedForms = () => (
  <section className="flex w-full flex-wrap items-center justify-center">
    {useCollectedForms().map((form) => (
      <FormCard key={form.createAt} form={form} />
    ))}
  </section>
);