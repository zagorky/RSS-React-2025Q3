import { assertIsNonNullable } from '~utils/utilities';
import { z } from 'zod';

import { useValidationDataStore } from '~/store/use-validation-data-store';

export const MIN_PASSWORD_LENGTH = 8;
export const MAX_PASSWORD_LENGTH = 20;
export const SPEC_CHARACTERS = '!@#$%^&?*';
const MIN_LENGTH = 1;
const MAX_LENGTH = 18;

const nameSchema = z
  .string()
  .min(MIN_LENGTH, { error: 'This field cannot be empty' })
  .max(MAX_LENGTH)
  .refine((value) => /^[A-Z][a-zA-Z]*$/.test(value), {
    error: 'Name must start with a capital letter and contain only Latin letters',
  });

const ageShema = z.number().int().min(1, { error: 'Age must be more than 0' });

const emailSchema = z
  .string()
  .min(1, { error: 'Email cannot be empty' })
  .regex(/^\S+$/, { error: 'Email must not contain any whitespace' })
  .regex(/(?=.*@)/, { error: "Email must contain an '@' symbol separating local part and domain name" })
  .regex(/^[^@]+@[^@]+\.[^@]+$/, { error: 'Email must contain a domain name (e.g., example.com)' })
  .email({ error: 'Email must be properly formatted (e.g., user@example.com)' });

export const passwordSchema = z
  .string()
  .min(MIN_PASSWORD_LENGTH, { error: `Password must be at least ${MIN_PASSWORD_LENGTH.toString()} characters long` })
  .max(MAX_PASSWORD_LENGTH, { error: `Password  must be no more than ${MAX_PASSWORD_LENGTH.toString()} characters` })
  .refine((password) => /[A-Z]/.test(password), {
    error: 'Password must contain at least one uppercase letter (A-Z)',
  })
  .refine((password) => /[a-z]/.test(password), {
    error: 'Password must contain at least one lowercase letter (a-z)',
  })
  .refine((password) => /[0-9]/.test(password), { error: 'Password must contain at least one digit (0-9)' })
  .refine((password) => /[!@#$%^&?*]/.test(password), {
    error: `Password must contain at least one special character (e.g., ${SPEC_CHARACTERS.toString()})`,
  })
  .refine((password) => !/\s/.test(password), {
    error: 'Password must not contain any whitespace characters',
  });

export const genderSchema = z.enum([...useValidationDataStore.getState().genders], {
  error: 'Please select a gender',
});

const imageSchema = z
  .custom<FileList | File>()
  .refine((value) => value !== null, {
    error: 'Image is required',
  })
  .transform((value) => {
    if (value instanceof FileList) {
      const value_ = value.item(0);

      assertIsNonNullable(value_, 'Validation error');

      return value_;
    }
    if (value instanceof File) {
      return value;
    }

    throw new Error('expected file type');
  })
  .refine((file) => file instanceof File, { error: 'Image is required' })
  .refine((file) => file && file.size <= 5 * 1024 * 1024, {
    error: 'Max image size is 5MB',
  })
  .refine((file) => file && ['image/jpeg', 'image/png'].includes(file.type), {
    error: 'Only png and jpeg types are allowed',
  });

const termsSchema = z
  .boolean()
  .refine((value) => value === true, { error: 'You must accept Terms and Conditions agreement' });

const countrySchema = z
  .string()
  .min(1, 'Please select a country')
  .refine((value) => useValidationDataStore.getState().countries.includes(value), {
    error: 'Please select a valid country',
  });

export const formSchema = z
  .object({
    name: nameSchema,
    age: ageShema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
    gender: genderSchema,
    image: imageSchema,
    terms: termsSchema,
    country: countrySchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type FormType = z.infer<typeof formSchema> & {
  createAt: Date | string;
};