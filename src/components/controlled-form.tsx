import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '~components/button';
import { Autocomplete } from '~components/form-field/autocomplete';
import { FormField } from '~components/form-field/form-field';
import { Input } from '~components/form-field/input';
import { RadioButton } from '~components/form-field/radio-button';
import { formSchema, genderSchema } from '~types/form-types';
import { useForm } from 'react-hook-form';

export const ControlledForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isValid },
    watch,
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
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
      country: '',
    },
  });

  const onSubmit = () => {
    console.log(watch);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex max-w-xl flex-col flex-wrap rounded-lg p-4">
      <header className="h2">Controlled form</header>
      <div className="flex w-full justify-between gap-2">
        <FormField errorMessage={errors.name?.message}>
          <Input register={register('name')} type="text" name="name" placeholder="Name" label="Name" />
        </FormField>
        <FormField errorMessage={errors.age?.message}>
          <Input register={register('age')} label="Age" name="age" type="number" placeholder="Age" />
        </FormField>
      </div>
      <div className="flex w-full justify-between gap-2">
        <FormField errorMessage={errors.password?.message}>
          <Input register={register('password')} label="Password" name="password" type="text" placeholder="Password" />
        </FormField>
        <FormField errorMessage={errors.confirmPassword?.message}>
          <Input
            register={register('confirmPassword')}
            label="Confirm password"
            name="confirmPassword"
            type="text"
            placeholder="Confirm password"
          />
        </FormField>
      </div>
      <div className="flex w-full justify-between gap-2">
        <FormField errorMessage={errors.email?.message}>
          <Input register={register('email')} label="Email" name="email" type="text" placeholder="Email" />
        </FormField>

        <FormField errorMessage={errors.gender?.message}>
          <RadioButton
            register={register('gender')}
            label="Gender"
            name="gender"
            type="radio"
            options={genderSchema.options}
          />
        </FormField>
      </div>
      <div className="flex w-full justify-between gap-2">
        <FormField errorMessage={errors.image?.message}>
          <Input register={register('image')} label="Image" name="image" type="file" placeholder="Image" />
        </FormField>
        <FormField errorMessage={errors.country?.message}>
          <Autocomplete register={register('country')} label="Counrty" name="country" type="text" />
        </FormField>
      </div>
      <FormField errorMessage={errors.terms?.message}>
        <Input
          register={register('terms')}
          className="flex items-center space-x-2"
          label="By checking this box I accept the Terms and Conditions"
          name="terms"
          type="checkbox"
        />
      </FormField>
      <Button disabled={!isValid || isSubmitting} variant="secondary" classNames="w-full" type="submit">
        Submit
      </Button>
    </form>
  );
};