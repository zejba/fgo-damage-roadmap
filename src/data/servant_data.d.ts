import { ServantClass, ServantAttribute, CardColor, BuffType } from './types';

export interface ServantParam {
  id: string;
  aaId: number;
  collectionNo: number;
  anotherVersionName?: string;
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

declare const servantData: ServantParam[];
export default servantData;
