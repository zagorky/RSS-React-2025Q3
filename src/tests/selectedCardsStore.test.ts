import { act } from '@testing-library/react';
import { afterEach, describe, expect, test } from 'vitest';

import { specificQueryResponse } from '~/mocks/data';
import { useSelectedCardsStore } from '~/store/selected-cards-store';

describe('useStore', () => {
  const card = specificQueryResponse.data[0];
  const card2 = specificQueryResponse.data[1];

  afterEach(() => {
    act(() => {
      useSelectedCardsStore.getState().actions.cleanSelectedCards();
    });
  });

  test('should initialize with empty selectedCards', () => {
    expect(useSelectedCardsStore.getState().selectedCards).toStrictEqual([]);
  });

  test('should add card to selectedCards', () => {
    act(() => {
      useSelectedCardsStore.getState().actions.toggleSelectedCard(card);
    });
    expect(useSelectedCardsStore.getState().selectedCards).toStrictEqual([
      card,
    ]);
  });

  test('should remove a card from selectedCards', () => {
    act(() => {
      useSelectedCardsStore.getState().actions.toggleSelectedCard(card);
      useSelectedCardsStore.getState().actions.toggleSelectedCard(card2);
    });
    act(() => {
      useSelectedCardsStore.getState().actions.toggleSelectedCard(card);
    });
    expect(useSelectedCardsStore.getState().selectedCards).toStrictEqual([
      card2,
    ]);
  });

  test('should remove all cards from selectedcards', () => {
    act(() => {
      useSelectedCardsStore.getState().actions.toggleSelectedCard(card);
      useSelectedCardsStore.getState().actions.toggleSelectedCard(card2);
    });
    act(() => {
      useSelectedCardsStore.getState().actions.cleanSelectedCards();
    });
    expect(useSelectedCardsStore.getState().selectedCards).toStrictEqual([]);
  });
});