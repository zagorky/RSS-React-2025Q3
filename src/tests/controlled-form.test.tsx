import { render, waitFor } from '@testing-library/react';
import { ControlledForm } from '~components/forms/controlled-form';
import { describe, expect, vi } from 'vitest';

import { ModalContext } from '~/components/modal/hooks/use-modal';
import { useFormStoreActions } from '~/store/use-form-store';
import { useCountries, useGenders } from '~/store/use-validation-data-store';
import { mockFormData } from '~/tests/mock-data';
import { getFormFields, setupUserEvent } from '~/tests/test-utilties';

vi.mock('~utils/utilities', async () => {
  const actual = await vi.importActual('~utils/utilities');

  return {
    ...actual,
    assertIsNonNullable: vi.fn(),
    convertToBase64: vi.fn().mockResolvedValue('mock-base64-string'),
  };
});

vi.mock('~/store/use-form-store', async () => {
  const actual = await vi.importActual('~/store/use-form-store');

  return {
    ...actual,
    useFormStoreActions: vi.fn(),
  };
});

vi.mock('~/store/use-validation-data-store', async () => {
  const actual = await vi.importActual('~/store/use-validation-data-store');

  return {
    ...actual,
    useGenders: vi.fn(),
    useCountries: vi.fn(),
  };
});

const useFormStoreActionsMock = vi.mocked(useFormStoreActions);
const useGendersMock = vi.mocked(useGenders);
const useCountriesMock = vi.mocked(useCountries);

describe('controlled-form', () => {
  const addFormMock = vi.fn();
  const closeMock = vi.fn();

  beforeEach(() => {
    addFormMock.mockClear();
    closeMock.mockClear();
    useFormStoreActionsMock.mockReturnValue({ addForm: addFormMock });
    useGendersMock.mockReturnValue(['male', 'female']);
    useCountriesMock.mockReturnValue(['Germany', 'Afghanistan', 'France', 'Spain']);
  });

  test('should render all fields and buttons', () => {
    render(
      <ModalContext.Provider value={{ current: 'controlled', open: vi.fn(), close: closeMock }}>
        <ControlledForm />
      </ModalContext.Provider>
    );

    const { image, name, age, female, email, terms, male, password, submit, confirmPassword, country } =
      getFormFields();

    expect(name).toBeInTheDocument();
    expect(age).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(confirmPassword).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(male).toBeInTheDocument();
    expect(female).toBeInTheDocument();
    expect(country).toBeInTheDocument();
    expect(terms).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(submit).toBeInTheDocument();
  });

  test('should calls addForm and close on submit when data is valid', async () => {
    const { user } = setupUserEvent(
      <ModalContext.Provider value={{ current: 'controlled', open: vi.fn(), close: closeMock }}>
        <ControlledForm />
      </ModalContext.Provider>
    );
    const { image, name, age, email, terms, male, password, submit, confirmPassword, country } = getFormFields();

    await user.type(name, mockFormData.name);
    await user.clear(age);
    await user.type(age, mockFormData.age.toString());
    await user.type(password, mockFormData.password);
    await user.type(confirmPassword, mockFormData.confirmPassword);
    await user.type(email, mockFormData.email);
    await user.click(male);
    await user.clear(country);
    await user.type(country, mockFormData.country);
    await user.upload(image, [mockFormData.image]);
    await user.click(terms);
    await user.click(submit);
    await waitFor(() => {
      expect(addFormMock).toHaveBeenCalledTimes(1);
      expect(closeMock).toHaveBeenCalledTimes(1);
      expect(addFormMock.mock.calls[0][0]).toMatchObject({
        name: 'John',
        age: 30,
        password: '!1Qwerty',
        confirmPassword: '!1Qwerty',
        email: 'qq@qq.qq',
        gender: 'male',
        country: 'Afghanistan',
        terms: true,
      });
    });
  });
});