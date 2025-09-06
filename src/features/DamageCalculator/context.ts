import { createContext } from 'react'

export const RemoveTurnCardFnContext = createContext<
	(index: number | number[]) => void
>(() => {})

export const RemoveBuffFormFnContext = createContext<
	(index: number | number[]) => void
>(() => {})

export const MoveBuffFormFnContext = createContext<
	(from: number, to: number) => void
>(() => {})
