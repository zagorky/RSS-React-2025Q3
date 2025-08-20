import { Button } from '~components/button';
import { Autocomplete } from '~components/form-field/autocomplete';
import { FormField } from '~components/form-field/form-field';
import { Input } from '~components/form-field/input';
import { RadioButton } from '~components/form-field/radio-button';
import { formSchema, type FormType, genderSchema } from '~types/form-types';
import { type FormEvent, useState } from 'react';
import { z } from 'zod';

import { useFormStoreActions } from '~/store/use-form-store';

export const UncontrolledForm = () => {
  const { addForm } = useFormStoreActions();

  const [errors, setErrors] = useState<{
    fieldErrors?: Partial<Record<keyof FormType, string[]>>;
    formErrors?: string[];
  } | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const rawData = Object.fromEntries(form.entries());
    const processedData = {
      ...rawData,
      age: Number(rawData.age),
      terms: rawData.terms === 'on',
    };

    try {
      const validatedData = await formSchema.parseAsync(processedData);

      addForm({ ...validatedData });
      setErrors(null);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(z.flattenError(error));
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex max-w-xl flex-col flex-wrap rounded-lg p-4">
      <header className="h2">Uncontrolled form</header>
      <div className="flex w-full justify-between gap-2">
        <FormField errorMessage={errors?.fieldErrors?.name?.[0]}>
          <Input type="text" name="name" placeholder="Name" label="Name" />
        </FormField>
        <FormField errorMessage={errors?.fieldErrors?.age?.[0]}>
          <Input label="Age" name="age" type="number" placeholder="Age" />
        </FormField>
      </div>
      <div className="flex w-full justify-between gap-2">
        <FormField errorMessage={errors?.fieldErrors?.password?.[0]}>
          <Input label="Password" name="password" type="text" placeholder="Password" />
        </FormField>
        <FormField errorMessage={errors?.fieldErrors?.confirmPassword?.[0]}>
          <Input label="Confirm password" name="confirmPassword" type="text" placeholder="Confirm password" />
        </FormField>
      </div>
      <div className="flex w-full justify-between gap-2">
        <FormField errorMessage={errors?.fieldErrors?.email?.[0]}>
          <Input label="Email" name="email" type="text" placeholder="Email" />
        </FormField>

        <FormField errorMessage={errors?.fieldErrors?.gender?.[0]}>
          <RadioButton label="Gender" name="gender" type="radio" options={genderSchema.options} />
        </FormField>
      </div>
      <div className="flex w-full justify-between gap-2">
        <FormField errorMessage={errors?.fieldErrors?.image?.[0]}>
          <Input label="Image" name="image" type="file" placeholder="Image" />
        </FormField>
        <FormField errorMessage={errors?.fieldErrors?.country?.[0]}>
          <Autocomplete label="Counrty" name="country" type="text" />
        </FormField>
      </div>
      <FormField errorMessage={errors?.fieldErrors?.terms?.[0]}>
        <Input
          className="flex items-center space-x-2"
          label="By checking this box I accept the Terms and Conditions"
          name="terms"
          type="checkbox"
        />
      </FormField>
      <Button variant="secondary" classNames="w-full" type="submit">
        Submit
      </Button>
    </form>
  );
};