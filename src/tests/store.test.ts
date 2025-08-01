import { act } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { specificQueryResponse } from '~/mocks/data';
import { useStore } from '~/store/store';

describe('useStore', () => {
  const card = specificQueryResponse.data[0];
  const card2 = specificQueryResponse.data[1];

  test('should initialize with empty selectedCards', () => {
    expect(useStore.getState().selectedCards).toEqual([]);
  });

  test('should add card to selectedCards', () => {
    act(() => {
      useStore.getState().addCard(card);
    });
    expect(useStore.getState().selectedCards).toEqual([card]);
  });

  test('should remove a card from selectedCards', () => {
    act(() => {
      useStore.getState().addCard(card);
      useStore.getState().addCard(card2);
    });
    act(() => {
      useStore.getState().removeCard(card);
    });
    expect(useStore.getState().selectedCards).toEqual([card2]);
  });

  test('should remove all cards from selectedcards', () => {
    act(() => {
      useStore.getState().addCard(card);
      useStore.getState().addCard(card2);
    });
    act(() => {
      useStore.getState().cleanSelectedCards();
    });
    expect(useStore.getState().selectedCards).toEqual([]);
  });
});
