import { atom } from 'jotai'
import type { ProcessedTurnResult } from '../utils/calcDamage'

export const damageCalcResultAtom = atom<ProcessedTurnResult[]>([])
