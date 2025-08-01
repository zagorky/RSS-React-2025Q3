import type { DataItem } from '~types/types';

import { create } from 'zustand/react';

export type StateType = {
  selectedCards: DataItem[];
  addCard: (card: DataItem) => void;
  removeCard: (card: DataItem) => void;
  cleanSelectedCards: () => void;
};

export const useStore = create<StateType>()((set) => ({
  selectedCards: [],

  addCard: (card) =>
    set((state) => ({
      ...state,
      selectedCards: [...state.selectedCards, card],
    })),

  removeCard: (card) =>
    set((state) => ({
      ...state,
      selectedCards: state.selectedCards.filter(
        (selectedCard) => card.mal_id !== selectedCard.mal_id
      ),
    })),

  cleanSelectedCards: () => set(() => ({ selectedCards: [] })),
}));
