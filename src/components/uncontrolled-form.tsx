import type { FormEvent } from 'react';

import { Button } from '~components/button';
import { FormField } from '~components/form-field';
import { formSchema } from '~types/form-types';
import * as crypto from 'node:crypto';
import { useState } from 'react';
import { z } from 'zod';

import { useFormStoreActions } from '~/store/use-form-store';

// Implement validation according to the inputs description
// Show errors either above each component, or below
// Block submitting the form before all the errors are fixed
// Good UX assumes that there are no "jumps" when showing errors.
// Uncontrolled components should implement validation on submit

export const UncontrolledForm = () => {
  const { addForm } = useFormStoreActions();
  const [errors, setErrors] = useState<z.ZodError | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const rawData = Object.fromEntries(form.entries());
    const processedData = {
      ...rawData,
      age: Number(rawData.age),
    };

    console.log(errors);
    try {
      const validatedData = formSchema.parse(processedData);

      addForm({ ...validatedData, id: crypto.randomUUID(), createAt: new Date().toISOString() });
      setErrors(null);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-bg-dark/10 flex max-w-xl flex-col flex-wrap rounded-lg p-4">
      <div className="flex w-full justify-between gap-2">
        <FormField label="Name" name="name" type="text" placeholder="Name" />
        <FormField label="Age" name="age" type="number" placeholder="Age" />
      </div>
      <div className="flex w-full justify-between gap-2">
        <FormField label="Email" name="email" type="text" placeholder="Email" />
        <FormField label="Password" name="password" type="text" placeholder="Password" />
      </div>
      <div className="flex w-full justify-between gap-2">
        <FormField label="Confirm password" name="confirm-password" type="text" placeholder="Confirm password" />
        <FormField label="Gender" name="gender" type="radio" />
      </div>
      <div className="flex w-full justify-between gap-2">
        <FormField label="Image" name="image" type="file" placeholder="Image" />
        <FormField label="Country" name="country" type="text" placeholder="Country" />
      </div>
      <div className="flex w-full justify-between gap-2">
        <FormField labelClassName="flex " label="Terms and Conditions" name="terms" type="checkbox" />
        <Button classNames="w-full" type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
};