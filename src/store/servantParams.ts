import { atom } from 'jotai'
import type { CardColor, ServantAttribute, ServantClass } from '../data/types'

export const titleAtom = atom('')
export const servantClassAtom = atom<ServantClass>('saber')
export const servantAttributeAtom = atom<ServantAttribute>('human')
export const servantAtkAtom = atom<number | null>(null)
export const craftEssenceAtkAtom = atom<number | null>(null)
export const npColorAtom = atom<CardColor>('buster')
export const npValueAtom = atom<number | null>(null)
export const footprintBAtom = atom<number | null>(null)
export const footprintAAtom = atom<number | null>(null)
export const footprintQAtom = atom<number | null>(null)

export const npGainAtom = atom<number | null>(null)
export const starRateAtom = atom<number | null>(null)
export const hitCountNAtom = atom<number | null>(null)
export const hitCountBAtom = atom<number | null>(null)
export const hitCountAAtom = atom<number | null>(null)
export const hitCountQAtom = atom<number | null>(null)
export const hitCountEXAtom = atom<number | null>(null)

export const servantIndexAtom = atom<number | null>(null)
export const isLv120Atom = atom(false)
export const hasGoldenFouAtkAtom = atom(false)
export const hasFootPrintAtom = atom(false)
export const isGrandServantAtom = atom(false)
