import { render, screen } from '@testing-library/react';
import { FormCard } from '~components/form-card';
import { describe, expect } from 'vitest';

import type { Base64String } from '~/store/use-form-store';

import { mockFormData } from '~/tests/mock-data';

const storeImage = mockFormData.image as unknown as Base64String;

const mockForm = { ...mockFormData, createAt: new Date().toISOString(), image: storeImage };

describe('FormCard', () => {
  test('renders all form fields correctly', () => {
    render(<FormCard form={mockForm} />);

    expect(screen.getByTestId(`info-${mockForm.name}`)).toHaveTextContent('John');
    expect(screen.getByTestId(`info-${mockForm.age}`)).toHaveTextContent('30');
    expect(screen.getByTestId(`info-${mockForm.country}`)).toHaveTextContent('Afghanistan');
    expect(screen.getByTestId(`info-${mockForm.gender}`)).toHaveTextContent('male');
    expect(screen.getByTestId(`info-${mockForm.email}`)).toHaveTextContent('qq@qq.qq');
    expect(screen.getByTestId(`info-${mockForm.password}`)).toHaveTextContent('!1Qwerty');
  });

  test('should does not have "border-warning" for older items', () => {
    const oldDate = new Date(Date.now() - 5000).toISOString();

    render(<FormCard form={{ ...mockForm, createAt: oldDate }} />);
    const card = screen.getByTestId(`info-${mockForm.name}`).closest('div');

    expect(card).not.toHaveClass('border-warning');
  });
});