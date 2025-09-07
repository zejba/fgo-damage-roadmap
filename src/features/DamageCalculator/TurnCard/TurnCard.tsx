import { CloseOutlined } from '@ant-design/icons'
import { Button, Card, Flex } from 'antd'
import type { PrimitiveAtom } from 'jotai'
import { focusAtom } from 'jotai-optics'
import { splitAtom, useAtomCallback } from 'jotai/utils'
import { memo, useCallback, useMemo } from 'react'
import { v4 } from 'uuid'
import AddBuffButton from '../../../components/AddBuffButton'
import type { TurnFormValue } from '../../../data/types'
import { defaultBuff } from '../../../store/startingBuffs'
import { CardCard } from '../CardCard/CardCard'
import { TurnParamsSection } from './TurnParamsSection'
import { TurnStartingBuffForms } from './TurnStartingBuffForms'

interface TurnCardInnerProps {
	turnAtom: PrimitiveAtom<TurnFormValue>
}

const TurnCardInner = memo((props: TurnCardInnerProps) => {
	const { turnAtom } = props
	const turnParamsAtom = useMemo(
		() => focusAtom(turnAtom, (optic) => optic.prop('params')),
		[turnAtom],
	)
	const turnBuffsAtom = useMemo(
		() => focusAtom(turnAtom, (optic) => optic.prop('buffs')),
		[turnAtom],
	)
	const turnBuffAtomsAtom = useMemo(
		() => splitAtom(turnBuffsAtom, (effect) => effect.id),
		[turnBuffsAtom],
	)
	const card1Atom = useMemo(
		() => focusAtom(turnAtom, (optic) => optic.prop('card1')),
		[turnAtom],
	)
	const card2Atom = useMemo(
		() => focusAtom(turnAtom, (optic) => optic.prop('card2')),
		[turnAtom],
	)
	const card3Atom = useMemo(
		() => focusAtom(turnAtom, (optic) => optic.prop('card3')),
		[turnAtom],
	)
	const card4Atom = useMemo(
		() => focusAtom(turnAtom, (optic) => optic.prop('card4')),
		[turnAtom],
	)

	const addTurnBuff = useAtomCallback(
		useCallback(
			(get, set) => {
				set(turnBuffsAtom, [
					...get(turnBuffsAtom),
					{ ...defaultBuff, id: v4() },
				])
			},
			[turnBuffsAtom],
		),
	)
	return (
		<Flex vertical gap={12} align="flex-start">
			<TurnParamsSection turnParamsAtom={turnParamsAtom} />
			<Flex vertical gap={4} align="flex-start">
				<AddBuffButton onClick={addTurnBuff} />
				<TurnStartingBuffForms turnBuffAtomsAtom={turnBuffAtomsAtom} />
			</Flex>
			<CardCard title="1st" cardAtom={card1Atom} />
			<CardCard title="2nd" cardAtom={card2Atom} />
			<CardCard title="3rd" cardAtom={card3Atom} />
			<CardCard title="4th" cardAtom={card4Atom} />
		</Flex>
	)
})

interface TurnCardProps {
	turnAtom: PrimitiveAtom<TurnFormValue>
	turnNumber: number
	remove: (turnAtom: PrimitiveAtom<TurnFormValue>) => void
}

export const TurnCard = memo((props: TurnCardProps) => {
	const { turnAtom, turnNumber, remove } = props
	const handleRemoveTurn = useCallback(() => {
		remove(turnAtom)
	}, [remove, turnAtom])
	return (
		<Card
			title={`${turnNumber}T目`}
			extra={
				<Button
					onClick={handleRemoveTurn}
					type="text"
					icon={<CloseOutlined />}
				/>
			}
			style={{ width: '100%' }}
		>
			<TurnCardInner turnAtom={turnAtom} />
		</Card>
	)
})
