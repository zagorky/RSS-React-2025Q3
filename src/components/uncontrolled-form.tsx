import { Button } from '~components/button';
import { FormField } from '~components/form-field/form-field';
import { Input } from '~components/form-field/input';
import { RadioButton } from '~components/form-field/radio-button';
import { formSchema, type FormType, genderSchema } from '~types/form-types';
import { type FormEvent, useState } from 'react';
import { z } from 'zod';

import { useFormStoreActions } from '~/store/use-form-store';

export const UncontrolledForm = () => {
  const { addForm } = useFormStoreActions();
  // const countries = useCountryStore((state) => state.countries);

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
      <header className="h2">Uncontrolled form</header>
      {/*<div className="flex w-full justify-between gap-2">*/}
      {/*  <FormField label="Name" name="name" type="text" placeholder="Name" error={errors?.fieldErrors?.name?.[0]} />*/}
      {/*  <FormField label="Age" name="age" type="number" placeholder="Age" error={errors?.fieldErrors?.age?.[0]} />*/}
      {/*</div>*/}
      {/*<div className="flex w-full justify-between gap-2">*/}
      {/*  <FormField*/}
      {/*    label="Password"*/}
      {/*    name="password"*/}
      {/*    type="text"*/}
      {/*    placeholder="Password"*/}
      {/*    error={errors?.fieldErrors?.password?.[0]}*/}
      {/*  />*/}
      {/*  <FormField*/}
      {/*    label="Confirm password"*/}
      {/*    name="confirmPassword"*/}
      {/*    type="text"*/}
      {/*    placeholder="Confirm password"*/}
      {/*    error={errors?.fieldErrors?.confirmPassword?.[0]}*/}
      {/*  />*/}
      {/*</div>*/}
      {/*<div className="flex w-full justify-between gap-2">*/}
      {/*  <FormField label="Email" name="email" type="text" placeholder="Email" error={errors?.fieldErrors?.email?.[0]} />*/}

      {/*  <FormField*/}
      {/*    label="Gender"*/}
      {/*    name="gender"*/}
      {/*    type="radio"*/}
      {/*    options={genderSchema.options}*/}
      {/*    error={errors?.fieldErrors?.gender?.[0]}*/}
      {/*  />*/}
      {/*</div>*/}
      {/*<div className="flex w-full justify-between gap-2">*/}
      {/*  <FormField label="Image" name="image" type="file" placeholder="Image" error={errors?.fieldErrors?.image?.[0]} />*/}
      {/*  <FormField*/}
      {/*    label="Country"*/}
      {/*    name="country"*/}
      {/*    type="select"*/}
      {/*    options={countries}*/}
      {/*    error={errors?.fieldErrors?.country?.[0]}*/}
      {/*  />*/}
      {/*</div>*/}
      {/*<FormField*/}
      {/*  customclass="flex text-center"*/}
      {/*  label="By checking this box I accept the Terms and Conditions"*/}
      {/*  name="terms"*/}
      {/*  type="checkbox"*/}
      {/*  error={errors?.fieldErrors?.terms?.[0]}*/}
      {/*/>*/}
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
        {/*<FormField register={register('country')} label="Country" name="country" type="select" options={countries} />*/}
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