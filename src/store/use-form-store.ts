import type { z } from 'zod';

import { type formSchema } from '~types/form-types';
import { create } from 'zustand';

type FormType = z.infer<typeof formSchema> & { id: string; createAt: string };

type FormStoreType = {
  forms: FormType[];
  actions: {
    addForm: (form: Omit<FormType, 'id' | 'createAt'>) => void;
  };
};

const useFormStore = create<FormStoreType>()((set) => ({
  forms: [],
  actions: {
    addForm: (form) => {
      const newForm = { ...form, id: crypto.randomUUID(), createAt: new Date().toISOString() };

      set((state) => ({
        forms: [...state.forms, newForm],
      }));
    },
  },
}));

export const useCollectedForms = () => useFormStore((state) => state.forms);
export const useFormStoreActions = () => useFormStore((state) => state.actions);