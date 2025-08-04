import { act } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { specificQueryResponse } from '~/mocks/data';
import { useSelectedCardsStore } from '~/store/selected-cards-store';

describe('useStore', () => {
  const card = specificQueryResponse.data[0];
  const card2 = specificQueryResponse.data[1];

  test('should initialize with empty selectedCards', () => {
    expect(useSelectedCardsStore.getState().selectedCards).toEqual([]);
  });

  test('should add card to selectedCards', () => {
    act(() => {
      useSelectedCardsStore.getState().actions.addCard(card);
    });
    expect(useSelectedCardsStore.getState().selectedCards).toEqual([card]);
  });

  test('should remove a card from selectedCards', () => {
    act(() => {
      useSelectedCardsStore.getState().actions.addCard(card);
      useSelectedCardsStore.getState().actions.addCard(card2);
    });
    act(() => {
      useSelectedCardsStore.getState().actions.removeCard(card);
    });
    expect(useSelectedCardsStore.getState().selectedCards).toEqual([card2]);
  });

  test('should remove all cards from selectedcards', () => {
    act(() => {
      useSelectedCardsStore.getState().actions.addCard(card);
      useSelectedCardsStore.getState().actions.addCard(card2);
    });
    act(() => {
      useSelectedCardsStore.getState().actions.cleanSelectedCards();
    });
    expect(useSelectedCardsStore.getState().selectedCards).toEqual([]);
  });
});
