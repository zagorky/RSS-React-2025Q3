import { render } from '@testing-library/react';
import { UncontrolledForm } from '~components/forms/uncontrolled-form';
import { describe, expect, vi } from 'vitest';

import { ModalContext } from '~/components/modal/hooks/use-modal';
import { useFormStoreActions } from '~/store/use-form-store';
import { useCountries, useGenders } from '~/store/use-validation-data-store';
import { getFormFields } from '~/tests/test-utilties';

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

describe('uncontrolled-form', () => {
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
        <UncontrolledForm />
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
});