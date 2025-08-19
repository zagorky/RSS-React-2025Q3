import type {z} from 'zod';

import {type formSchema} from '~types/form-types';
import {create} from 'zustand';

type FormType = z.infer<typeof formSchema> & {
  id: string;
  createAt: Date | string;
};

type FormStoreType = {
  forms: FormType[];
  actions: {
    addForm: (form: FormType) => void;
  };
};

const useFormStore = create<FormStoreType>()((set) => ({
  forms: [],
  actions: {
    addForm: (form: FormType) => set((state) => ({ forms: [...state.forms, form] })),
  },
}));

export const useCollectedForms = () => useFormStore((state) => state.forms);
export const useFormStoreActions = () => useFormStore((state) => state.actions);