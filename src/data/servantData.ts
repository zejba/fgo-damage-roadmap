import { BuffType, CardColor, ServantAttribute, ServantClass } from './types';

interface ServantParam {
  id: number;
  collectionNo: number;
  name: string;
  rarity: number;
  className: ServantClass;
  attribute: ServantAttribute;
  atkMax: number;
  atk120: number;
  starGen: number;
  npGain: number;
  hitCounts: {
    buster: number;
    arts: number;
    quick: number;
    extra: number;
    np: number;
  };
  noblePhantasm: {
    card: CardColor;
    value: number;
  };
  classPassive: {
    type: BuffType;
    value: number;
    turn: number;
    count: number;
  }[];
}

export const servantData: ServantParam[] = [
  {
    id: 800100,
    collectionNo: 1,
    name: 'マシュ・キリエライト',
    rarity: 4,
    className: 'shielder',
    attribute: 'earth',
    atkMax: 7815,
    atk120: 9653,
    starGen: 9.9,
    npGain: 0.84,
    hitCounts: { buster: 1, arts: 2, quick: 2, extra: 3, np: 0 },
    noblePhantasm: { card: 'arts', value: 0 },
    classPassive: [{ type: 'quickBuff', value: 6, turn: -1, count: -1 }]
  }
];
