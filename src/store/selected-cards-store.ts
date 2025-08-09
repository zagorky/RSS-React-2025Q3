import type { DataItem } from '~types/types';

import { create } from 'zustand/react';

export type StateType = {
  selectedCards: DataItem[];

  actions: {
    isSelected: (id: number) => boolean;
    toggleSelectedCard: (card: DataItem) => void;
    cleanSelectedCards: VoidFunction;
  };
};

export const useSelectedCardsStore = create<StateType>()((set, get) => ({
  selectedCards: [],

  actions: {
    isSelected: (id) => get().selectedCards.some((item) => item.mal_id === id),

    toggleSelectedCard: (card) => {
      const selectedCards = get().selectedCards;
      const isSelected = get().actions.isSelected(card.mal_id);
      const newSelectedCards = isSelected
        ? selectedCards.filter((item) => item.mal_id !== card.mal_id)
        : [...selectedCards, card];

      set((state) => ({
        ...state,
        selectedCards: newSelectedCards,
      }));
    },

    cleanSelectedCards: () => set(() => ({ selectedCards: [] })),
  },
}));

export const useSelectedCards = () =>
  useSelectedCardsStore((state) => state.selectedCards);

export const useStoreActions = () =>
  useSelectedCardsStore((state) => state.actions);