import type { PrimitiveAtom } from 'jotai';

// jotai/utilsでexportされていないので自前でコピー
export type SplitAtomAction<Item> =
  | {
      type: 'remove';
      atom: PrimitiveAtom<Item>;
    }
  | {
      type: 'insert';
      value: Item;
      before?: PrimitiveAtom<Item>;
    }
  | {
      type: 'move';
      atom: PrimitiveAtom<Item>;
      before?: PrimitiveAtom<Item>;
    };
