import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '~components/button';
import { FormField } from '~components/form-field';
import { formSchema, genderSchema } from '~types/form-types';
import { useForm } from 'react-hook-form';

import { useCountryStore } from '~/store/use-country-store';

// Implement validation according to the inputs description
// Show errors either above each component, or below
// Block submitting the form before all the errors are fixed
// Good UX assumes that there are no "jumps" when showing errors.
// Approach with React Hook Form should implement live validation

export const ControlledForm = () => {
  const countries = useCountryStore((state) => state.countries);
  const { register, formState } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      age: 1,
      email: '',
      password: '',
      confirmPassword: '',
      gender: 'prefer not to say',
      image: undefined,
      terms: false,
      country: 'Serbia',
    },
  });

  // const onSubmit = (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   console.log(event.currentTarget);
  // };

  return (
    <form className="flex max-w-xl flex-col flex-wrap rounded-lg p-4">
      <header className="h2">Controlled form</header>
      <div className="flex w-full justify-between gap-2">
        <FormField
          error={formState.errors.name?.message}
          register={register('name')}
          label="Name"
          name="name"
          type="text"
          placeholder="Name"
        />
        <FormField
          error={formState.errors.age?.message}
          register={register('age')}
          label="Age"
          name="age"
          type="number"
          placeholder="Age"
        />
      </div>
      <div className="flex w-full justify-between gap-2">
        <FormField
          error={formState.errors.password?.message}
          register={register('password')}
          label="Password"
          name="password"
          type="text"
          placeholder="Password"
        />
        <FormField
          error={formState.errors.confirmPassword?.message}
          register={register('confirmPassword')}
          label="Confirm password"
          name="confirmPassword"
          type="text"
          placeholder="Confirm password"
        />
      </div>
      <div className="flex w-full justify-between gap-2">
        <FormField
          error={formState.errors.email?.message}
          register={register('email')}
          label="Email"
          name="email"
          type="text"
          placeholder="Email"
        />

        <FormField
          error={formState.errors.gender?.message}
          register={register('gender')}
          label="Gender"
          name="gender"
          type="radio"
          options={genderSchema.options}
        />
      </div>
      <div className="flex w-full justify-between gap-2">
        <FormField
          error={formState.errors.image?.message}
          register={register('image')}
          label="Image"
          name="image"
          type="file"
          placeholder="Image"
        />
        <FormField register={register('country')} label="Country" name="country" type="select" options={countries} />
      </div>
      <FormField
        error={formState.errors.terms?.message}
        register={register('terms')}
        customclass="flex text-center"
        label="By checking this box I accept the Terms and Conditions"
        name="terms"
        type="checkbox"
      />
      <Button variant="secondary" classNames="w-full" type="submit">
        Submit
      </Button>
    </form>
  );
};