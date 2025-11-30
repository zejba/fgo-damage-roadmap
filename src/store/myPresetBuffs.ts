import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { splitAtom } from 'jotai/utils';
import { v4 } from 'uuid';
import type { Buff } from '../data/types';

// 保存済みのプリセットバフ (LocalStorage)
export const savedPresetBuffsAtom = atomWithStorage<Buff[]>('myPresetBuffs', []);

// 編集中の一時的なプリセットバフ (内部状態を持つ)
const tmpPresetBuffsBaseAtom = atom<Buff[]>([]);

export const tmpPresetBuffsAtom = atom(
  (get) => get(tmpPresetBuffsBaseAtom),
  (_get, set, newValue: Buff[]) => {
    set(tmpPresetBuffsBaseAtom, newValue);
  }
);

export const tmpPresetBuffAtomsAtom = splitAtom(tmpPresetBuffsAtom, (buff) => buff.id);

export const addTmpPresetBuffsAtom = atom(null, (get, set, buffs: Omit<Buff, 'id'>[]) => {
  set(tmpPresetBuffsAtom, [...get(tmpPresetBuffsAtom), ...buffs.map((buff) => ({ ...buff, id: v4() }))]);
});

// 保存処理: tmpから保存済みにコピー
export const savePresetBuffsAtom = atom(null, (get, set) => {
  const tmpBuffs = get(tmpPresetBuffsAtom);
  set(savedPresetBuffsAtom, tmpBuffs);
});

// リセット処理: 保存済みからtmpに復元
export const resetPresetBuffsAtom = atom(null, (get, set) => {
  const savedBuffs = get(savedPresetBuffsAtom);
  set(tmpPresetBuffsBaseAtom, savedBuffs);
});

// プリセットバフのオプションを取得する派生atom
export const presetBuffOptionsAtom = atom((get) => {
  const savedBuffs = get(savedPresetBuffsAtom);
  return savedBuffs.map((buff) => ({
    label: buff.name || '(名前なし)',
    value: buff.id
  }));
});
