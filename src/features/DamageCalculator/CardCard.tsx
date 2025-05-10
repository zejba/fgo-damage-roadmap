import { PlusOutlined } from '@ant-design/icons'
import {
	Button,
	Card,
	Checkbox,
	Flex,
	Form,
	type FormInstance,
	InputNumber,
	Select,
	Space,
} from 'antd'
import { useAtomValue } from 'jotai'
import { useCallback, useEffect, useState } from 'react'
import SpaceCompactHeader from '../../components/SpaceCompactHeader'
import { cardTypeOptions, damageJudgmentOptions } from '../../data/options'
import BuffForm from './BuffForm'
import { isColoredAtom } from './jotai'
import type { DamageCalculatorInputValue } from './types'

interface CardCardProps {
	form: FormInstance<DamageCalculatorInputValue>
	turnIndex: number
	index: number
	title: string
}

const colors = {
	buster: 'tomato',
	arts: 'cornflowerblue',
	quick: 'lightgreen',
	extra: '#F0F0F0',
} as const

function CardCard(props: CardCardProps) {
	const { turnIndex, title, index, form } = props
	const [titleBgColor, setTitleBgColor] = useState('#F0F0F0')
	const isColored = useAtomValue(isColoredAtom)
	const handleTypeChange = useCallback(() => {
		if (index === 3) return
		const values = form.getFieldsValue()
		const cardType =
			values?.turns?.[turnIndex]?.[
				`card${index + 1}Type` as 'card1Type' | 'card2Type' | 'card3Type'
			]
		if (!cardType) {
			setTitleBgColor('#F0F0F0')
			return
		}
		if (cardType === 'noblePhantasm') {
			const npColor = values.npColor
			if (!npColor) {
				setTitleBgColor('#F0F0F0')
				return
			}
			setTitleBgColor(colors[npColor])
		} else {
			setTitleBgColor(colors[cardType])
		}
	}, [form, turnIndex, index])
	useEffect(() => {
		if (isColored) {
			handleTypeChange()
		} else {
			setTitleBgColor('#F0F0F0')
		}
	}, [isColored, handleTypeChange])
	return (
		<Card
			title={title}
			style={{ width: '100%' }}
			styles={{ header: { backgroundColor: titleBgColor } }}
		>
			<Flex vertical gap={12} align="flex-start">
				<Space.Compact>
					{index === 3 ? (
						<SpaceCompactHeader>EX</SpaceCompactHeader>
					) : (
						<Form.Item
							name={[turnIndex, `card${index + 1}Type`]}
							initialValue={index === 0 ? 'noblePhantasm' : 'buster'}
						>
							<Select
								options={cardTypeOptions}
								style={{ width: 60 }}
								onChange={handleTypeChange}
							/>
						</Form.Item>
					)}
					<Flex
						style={{
							outline: '1px solid #BFBFBF',
							outlineOffset: '-1px',
							paddingLeft: 8,
							paddingRight: 8,
						}}
					>
						{index !== 3 && (
							<Form.Item
								name={[turnIndex, `card${index + 1}IsCritical`]}
								valuePropName="checked"
								initialValue={true}
							>
								<Checkbox>クリティカル</Checkbox>
							</Form.Item>
						)}
					</Flex>
					<Form.Item
						name={[turnIndex, `card${index + 1}DamageJudgement`]}
						initialValue="default"
					>
						<Select options={damageJudgmentOptions} style={{ width: 132 }} />
					</Form.Item>
					<Form.Item name={[turnIndex, `card${index + 1}OverKillCount`]}>
						<InputNumber
							type="number"
							addonBefore="OverKill"
							style={{ width: 140 }}
						/>
					</Form.Item>
				</Space.Compact>
				<Form.List name={[turnIndex, `card${index + 1}Effects`]}>
					{(fields, { add, remove, move }) => (
						<Flex vertical gap={4} align="flex-start">
							<Button onClick={() => add()} icon={<PlusOutlined />}>
								追加
							</Button>
							{fields.map((field) => (
								<BuffForm
									key={field.key}
									fieldName={field.name}
									remove={remove}
									move={move}
								/>
							))}
						</Flex>
					)}
				</Form.List>
			</Flex>
		</Card>
	)
}

export default CardCard
