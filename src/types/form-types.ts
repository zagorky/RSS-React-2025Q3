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
  .min(MIN_LENGTH, 'This field cannot be empty')
  .max(MAX_LENGTH)
  .refine((value) => /^[A-Z][a-zA-Z]*$/.test(value), {
    message: 'Name must start with a capital letter and contain only Latin letters',
  });

const ageShema = z.number().int().min(0, { message: 'Age must not be negative' });

const emailSchema = z
  .string()
  .min(1, 'Email cannot be empty')
  .regex(/^\S+$/, 'Email must not contain any whitespace')
  .regex(/(?=.*@)/, "Email must contain an '@' symbol separating local part and domain name")
  .regex(/^[^@]+@[^@]+\.[^@]+$/, 'Email must contain a domain name (e.g., example.com)')
  .email('Email must be properly formatted (e.g., user@example.com)');

export const passwordSchema = z
  .string()
  .min(MIN_PASSWORD_LENGTH, { message: `Password must be at least ${MIN_PASSWORD_LENGTH.toString()} characters long` })
  .max(MAX_PASSWORD_LENGTH, { message: `Password  must be no more than ${MAX_PASSWORD_LENGTH.toString()} characters` })
  .refine((password) => /[A-Z]/.test(password), {
    message: 'Password must contain at least one uppercase letter (A-Z)',
  })
  .refine((password) => /[a-z]/.test(password), {
    message: 'Password must contain at least one lowercase letter (a-z)',
  })
  .refine((password) => /[0-9]/.test(password), { message: 'Password must contain at least one digit (0-9)' })
  .refine((password) => /[!@#$%^&?*]/.test(password), {
    message: `Password must contain at least one special character (e.g., ${SPEC_CHARACTERS.toString()})`,
  })
  .refine((password) => !/\s/.test(password), {
    message: 'Password must not contain any whitespace characters',
  });

export const genderSchema = z.enum([...useValidationDataStore.getState().genders], {
  message: 'Please select a gender',
});

const imageSchema = z
  .custom<FileList | File>()
  .refine((value) => value !== null, {
    message: 'Image is required',
  })
  .transform((value) => {
    if (value instanceof FileList) {
      const value_ = value.item(0);

      assertIsNonNullable(value_);

      return value_;
    }
    if (value instanceof File) {
      return value;
    }

    throw new Error('expected file type');
  })
  .refine((file) => file instanceof File, { message: 'Image is required' })
  .refine((file) => file && file.size <= 5 * 1024 * 1024, {
    message: 'Max image size is 5MB',
  })
  .refine((file) => file && ['image/jpeg', 'image/png'].includes(file.type), {
    message: 'Only png and jpeg types are allowed',
  });

const termsSchema = z
  .boolean()
  .refine((value) => value === true, { message: 'You must accept Terms and Conditions agreement' });

const countrySchema = z
  .string()
  .min(1, 'Please select a country')
  .refine((value) => useValidationDataStore.getState().countries.includes(value), {
    message: 'Please select a valid country',
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
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type FormType = z.infer<typeof formSchema> & {
  id: string;
  createAt: Date | string;
};