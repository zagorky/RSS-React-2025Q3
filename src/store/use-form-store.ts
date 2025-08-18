import { create } from 'zustand';

import type { FormType } from '~/tests/form-types';

type FormStoreType = {
  forms: FormType[];
  actions: {
    addForm: (form: FormType) => void;
  };
};

export const useFormStore = () =>
  create<FormStoreType>()((set) => ({
    forms: [],
    actions: {
      addForm: (form: FormType) => set((state) => ({ forms: [...state.forms, form] })),
    },
  }));