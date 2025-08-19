import { FormCard } from '~components/form-card';

import { useCollectedForms } from '~/store/use-form-store';

// On successful form submission close the modal and display the newly entered data on the main page
// Make an indication for a newly entered data on the main route (e.g. show border in a different color for a few seconds, or a different background color)

export const CollectedForms = () => {
  const forms = useCollectedForms();

  return (
    <section>
      {forms.map((form, i) => (
        <FormCard key={i} form={form} />
      ))}
    </section>
  );
};