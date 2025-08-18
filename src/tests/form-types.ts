import { z } from 'zod';

export const MIN_PASSWORD_LENGTH = 8;
export const MAX_PASSWORD_LENGTH = 20;
export const SPEC_CHARACTERS = '!@#$%^&?*';
const MIN_LENGTH = 1;
const MAX_LENGTH = 18;

const nameSchema = z
  .string()
  .min(MIN_LENGTH, 'This field cannot be empty')
  .max(MAX_LENGTH)
  .refine((value) => /^[A-Za-z]*$/.test(value), {
    message: 'Please use only letters from the Latin alphabet.',
  })
  .refine((value) => value.startsWith(value.charAt(0).toUpperCase()), {
    message: 'Name must start with a capital letter',
  });

const ageShema = z.number().int().min(0, { message: 'Age must not be negative' });

const emailSchema = z
  .email('Email must be properly formatted (e.g., user@example.com)')
  .min(1, 'Email cannot be empty')
  .regex(/^\S+$/, 'Email must not contain any whitespace')
  .regex(/(?=.*@)/, "Email must contain an '@' symbol separating local part and domain name")
  .regex(/^[^@]+@[^@]+\.[^@]+$/, 'Email must contain a domain name (e.g., example.com)');

const passwordSchema = z
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

const genderSchema = z.enum(['male', 'female', 'prefer not to say'], {
  message: 'Please select a gender',
});

const imageSchema = z
  .instanceof(File)
  .refine((file) => ['image/jpeg', 'image/png'].includes(file.type), { message: 'Only png and jpeg types are allowed' })
  .refine((file) => file.size <= 5 * 1024 * 1024, { message: 'Max image size is 5MB' });

const termsSchema = z
  .boolean()
  .refine((value) => value === true, { message: 'You must accept Terms and Conditions agreement' });

const countrySchema = z.string().min(1, 'Please select a country');

export const formSchema = z.object({
  name: nameSchema,
  age: ageShema,
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string(),
  gender: genderSchema,
  image: imageSchema,
  terms: termsSchema,
  country: countrySchema,
});

export type FormType = z.infer<typeof formSchema>;