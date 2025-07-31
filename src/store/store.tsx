import type { DataItem } from '~types/types';

import { devtools } from 'zustand/middleware';
import { create } from 'zustand/react';

import { specificQueryResponse } from '~/tests/mocks/data';

type StateType = {
  selectedCards: DataItem[];
  addCard: (card: DataItem) => void;
  removeCard: (card: DataItem) => void;
  cleanSelectedCards: () => void;
  downloadSelectedCards: () => void;
};

export const useStore = create<StateType>()(
  devtools((set) => ({
    selectedCards: [...specificQueryResponse.data],

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

    // cleanSelectedCards: () =>
    //   set((state) => ({
    //     ...state,
    //     selectedCards: state.selectedCards.map((card) =>
    //       state.removeCard(card)
    //     ),
    //   })),
  }))
);
