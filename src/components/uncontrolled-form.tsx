import type { FormType } from '~types/form-types';
import type { FormEvent } from 'react';

import { Button } from '~components/button';
import { FormField } from '~components/form-field';
import { formSchema, genderSchema } from '~types/form-types';
import { useState } from 'react';
import { z } from 'zod';

import { useFormStoreActions } from '~/store/use-form-store';

// Implement validation according to the inputs description +
// Show errors either above each component, or below +
// Block submitting the form before all the errors are fixed -
// Good UX assumes that there are no "jumps" when showing errors. +
// Uncontrolled components should implement validation on submit +

export const UncontrolledForm = () => {
  const { addForm } = useFormStoreActions();

  const [errors, setErrors] = useState<{
    fieldErrors?: Partial<Record<keyof FormType, string[]>>;
    formErrors?: string[];
  } | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const rawData = Object.fromEntries(form.entries());
    const processedData = {
      ...rawData,
      age: Number(rawData.age),
      terms: rawData.terms === 'on',
    };

    try {
      const validatedData = formSchema.parse(processedData);

      addForm({ ...validatedData, id: crypto.randomUUID(), createAt: new Date().toISOString() });
      setErrors(null);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(z.flattenError(error));
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex max-w-xl flex-col flex-wrap rounded-lg p-4">
      <div className="flex w-full justify-between gap-2">
        <FormField label="Name" name="name" type="text" placeholder="Name" error={errors?.fieldErrors?.name?.[0]} />
        <FormField label="Age" name="age" type="number" placeholder="Age" error={errors?.fieldErrors?.age?.[0]} />
      </div>
      <div className="flex w-full justify-between gap-2">
        <FormField
          label="Password"
          name="password"
          type="text"
          placeholder="Password"
          error={errors?.fieldErrors?.password?.[0]}
        />
        <FormField
          label="Confirm password"
          name="confirmPassword"
          type="text"
          placeholder="Confirm password"
          error={errors?.fieldErrors?.confirmPassword?.[0]}
        />
      </div>
      <div className="flex w-full justify-between gap-2">
        <FormField label="Email" name="email" type="text" placeholder="Email" error={errors?.fieldErrors?.email?.[0]} />

        <FormField
          label="Gender"
          name="gender"
          type="radio"
          options={genderSchema.options}
          error={errors?.fieldErrors?.gender?.[0]}
        />
      </div>
      <div className="flex w-full justify-between gap-2">
        <FormField label="Image" name="image" type="file" placeholder="Image" error={errors?.fieldErrors?.image?.[0]} />
        <FormField
          label="Country"
          name="country"
          type="text"
          placeholder="Country"
          error={errors?.fieldErrors?.country?.[0]}
        />
      </div>
      {/*<div className="flex w-full justify-between gap-2">*/}
      <FormField
        containerClassName="flex text-center"
        label="By checking this box I accept the Terms and Conditions"
        name="terms"
        type="checkbox"
        error={errors?.fieldErrors?.terms?.[0]}
      />
      <Button variant="secondary" classNames="w-full" type="submit">
        Submit
      </Button>
      {/*</div>*/}
    </form>
  );
};