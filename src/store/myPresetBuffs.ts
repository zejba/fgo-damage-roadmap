import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { splitAtom } from 'jotai/utils';
import { v4 } from 'uuid';
import type { BuffSet } from '../data/types';

// 保存済みのバフセット (LocalStorage)
export const savedPresetBuffSetsAtom = atomWithStorage<BuffSet[]>('myBuffSets', []);

// 編集中の一時的なバフセット (内部状態を持つ)
const tmpPresetBuffSetsBaseAtom = atom<BuffSet[]>([]);

export const tmpPresetBuffSetsAtom = atom(
  (get) => get(tmpPresetBuffSetsBaseAtom),
  (_get, set, newValue: BuffSet[]) => {
    set(tmpPresetBuffSetsBaseAtom, newValue);
  }
);

export const tmpPresetBuffSetAtomsAtom = splitAtom(tmpPresetBuffSetsAtom, (buffSet) => buffSet.id);

export const addTmpPresetBuffSetAtom = atom(null, (get, set, buffSets: Omit<BuffSet, 'id'>[]) => {
  set(tmpPresetBuffSetsAtom, [
    ...get(tmpPresetBuffSetsAtom),
    ...buffSets.map((buffSet) => ({
      ...buffSet,
      id: v4(),
      buffs: buffSet.buffs.map((buff) => ({ ...buff, id: v4() }))
    }))
  ]);
});

// 保存処理: tmpから保存済みにコピー
export const savePresetBuffSetsAtom = atom(null, (get, set) => {
  const tmpBuffSets = get(tmpPresetBuffSetsAtom);
  set(savedPresetBuffSetsAtom, tmpBuffSets);
});

// リセット処理: 保存済みからtmpに復元
export const resetPresetBuffSetsAtom = atom(null, (get, set) => {
  const savedBuffSets = get(savedPresetBuffSetsAtom);
  set(tmpPresetBuffSetsBaseAtom, savedBuffSets);
});

// バフセットのオプションを取得する派生atom
export const presetBuffSetOptionsAtom = atom((get) => {
  const savedBuffSets = get(savedPresetBuffSetsAtom);
  return savedBuffSets.map((buffSet) => ({
    label: buffSet.name || '(名前なし)',
    value: buffSet.id
  }));
});
