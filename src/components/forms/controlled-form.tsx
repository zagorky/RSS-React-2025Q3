import {zodResolver} from '@hookform/resolvers/zod';
import {Button} from '~components/button';
import {Autocomplete} from '~components/form-field/autocomplete';
import {FormField} from '~components/form-field/form-field';
import {Input} from '~components/form-field/input';
import {RadioButton} from '~components/form-field/radio-button';
import {defaultFormConfig} from '~components/forms/default-form-config';
import {useModal} from '~components/modal/hooks/use-modal';
import {PasswordStrength} from '~components/password-strength/password-strength';
import {formSchema, type FormType} from '~types/form-types';
import {convertToBase64} from '~utils/utilities';
import {useForm} from 'react-hook-form';

import {useFormStoreActions} from '~/store/use-form-store';
import {useGenders} from '~/store/use-validation-data-store';

export const ControlledForm = () => {
  const { addForm } = useFormStoreActions();
  const { close } = useModal();
  const genders = useGenders();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isValid },
    watch,
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues: defaultFormConfig,
  });

  const onSubmit = async (data: Omit<FormType, 'createAt'>) => {
    const image = await convertToBase64(data.image);

    addForm({ ...data, image });
    close();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex max-w-xl flex-col flex-wrap rounded-lg">
      <header className="h2">Controlled form</header>
      <div className="flex w-full justify-between gap-2">
        <FormField errorMessage={errors.name?.message}>
          <Input register={register('name')} type="text" name="name" placeholder="Name" label="Name" />
        </FormField>
        <FormField errorMessage={errors.age?.message}>
          <Input
            register={register('age', { valueAsNumber: true })}
            label="Age"
            name="age"
            type="number"
            placeholder="Age"
          />
        </FormField>
      </div>
      <div>
        <div className="flex w-full justify-between gap-2">
          <FormField errorMessage={errors.password?.message}>
            <Input
              register={register('password')}
              label="Password"
              name="password"
              type="text"
              placeholder="Password"
            />
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
        <PasswordStrength password={watch('password')} />
      </div>
      <div className="flex w-full justify-between gap-2">
        <FormField errorMessage={errors.email?.message}>
          <Input register={register('email')} label="Email" name="email" type="text" placeholder="Email" />
        </FormField>

        <FormField errorMessage={errors.gender?.message}>
          <RadioButton register={register('gender')} label="Gender" name="gender" type="radio" options={genders} />
        </FormField>
      </div>
      <div className="flex w-full justify-between gap-2">
        <FormField errorMessage={errors.image?.message}>
          <Input register={register('image')} label="Image" name="image" type="file" placeholder="Image" />
        </FormField>
        <FormField errorMessage={errors.country?.message}>
          <Autocomplete id="controlled" register={register('country')} label="Country" name="country" type="text" />
        </FormField>
      </div>
      <FormField errorMessage={errors.terms?.message}>
        <Input
          register={register('terms')}
          variant="inline"
          label="By checking this box I accept the Terms and Conditions"
          name="terms"
          type="checkbox"
        />
      </FormField>
      <Button disabled={!isValid || isSubmitting} variant="secondary" customClassName="w-full" type="submit">
        Submit
      </Button>
    </form>
  );
};