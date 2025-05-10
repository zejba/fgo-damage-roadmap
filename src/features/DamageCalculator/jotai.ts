import { atom } from 'jotai'
import type { ProcessedTurnResult } from '../../utils/calcDamage'

export const isColoredAtom = atom(false)
export const isRequiredNpStarCalcAtom = atom(false)
export const calcResultAtom = atom<ProcessedTurnResult[]>([])
