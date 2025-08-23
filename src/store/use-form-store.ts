import type { z } from 'zod';

import { type formSchema } from '~types/form-types';
import { create } from 'zustand';

export type Base64String = string & { _base64: true };

export type StoreFormType = Omit<z.infer<typeof formSchema>, 'image'> & {
  createAt: string;
  image: Base64String;
};

type FormStoreType = {
  forms: StoreFormType[];
  actions: {
    addForm: (form: Omit<StoreFormType, 'createAt'>) => void;
  };
};

const useFormStore = create<FormStoreType>()((set) => ({
  forms: [],
  actions: {
    addForm: (form) => {
      const newForm = { ...form, createAt: new Date().toISOString() };

      set((state) => ({
        forms: [...state.forms, newForm],
      }));
    },
  },
}));

export const useCollectedForms = () => useFormStore((state) => state.forms);
export const useFormStoreActions = () => useFormStore((state) => state.actions);