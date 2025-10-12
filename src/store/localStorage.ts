import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { DamageCalcFormValue } from '../data/types';
import { v4 } from 'uuid';

export interface SavedFormData {
  id: string;
  name: string;
  data: DamageCalcFormValue;
  createdAt: string;
  updatedAt: string;
}

export const savedFormsAtom = atomWithStorage<Record<string, SavedFormData>>('fgo_damage_roadmap_saves', {});

export const saveFormDataAtom = atom(null, (get, set, { name, data }: { name: string; data: DamageCalcFormValue }) => {
  const existingSaves = get(savedFormsAtom);
  const now = new Date().toISOString();
  const newId = v4();
  const newSave: SavedFormData = {
    id: newId,
    name,
    data,
    createdAt: now,
    updatedAt: now
  };
  set(savedFormsAtom, { ...existingSaves, [newId]: newSave });
  return newSave;
});

export const overwriteFormDataAtom = atom(null, (get, set, { id, data }: { id: string; data: DamageCalcFormValue }) => {
  const existingSaves = get(savedFormsAtom);
  const now = new Date().toISOString();
  const existingSave = existingSaves[id];
  if (!existingSave) {
    throw new Error('指定されたデータが見つかりません');
  }
  const updatedSave: SavedFormData = {
    ...existingSave,
    data,
    updatedAt: now
  };

  set(savedFormsAtom, { ...existingSaves, [id]: updatedSave });
  return updatedSave;
});

export const deleteFormDataAtom = atom(null, (get, set, id: string) => {
  const existingSaves = get(savedFormsAtom);
  const deletedData = existingSaves[id];
  if (!deletedData) {
    return null;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { [id]: _, ...remainingSaves } = existingSaves;
  set(savedFormsAtom, remainingSaves);

  return deletedData;
});

export const getFormDataByIdAtom = atom((get) => (id: string) => {
  const saves = get(savedFormsAtom);
  return saves[id] || null;
});

export const savedFormsArrayAtom = atom((get) => {
  const saves = get(savedFormsAtom);
  return Object.values(saves).sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
});
