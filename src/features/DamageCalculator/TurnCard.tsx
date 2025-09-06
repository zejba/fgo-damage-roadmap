import { CloseOutlined, PlusOutlined } from '@ant-design/icons'
import {
	Button,
	Card,
	Flex,
	Form,
	type FormInstance,
	InputNumber,
	Select,
	Space,
} from 'antd'
import { useAtomValue } from 'jotai'
import { memo, useContext } from 'react'
import CollapseWithOutHeader from '../../components/CollapseWithOutHeader'
import SpaceCompactHeader from '../../components/SpaceCompactHeader'
import { enemyClassOptions } from '../../data/options'
import BuffForm from './BuffForm'
import CardCard from './CardCard'
import {
	MoveBuffFormFnContext,
	RemoveBuffFormFnContext,
	RemoveTurnCardFnContext,
} from './context'
import { isRequiredNpStarCalcAtom } from './jotai'
import type { DamageCalculatorInputValue } from './types'

interface TurnCardProps {
	form: FormInstance<DamageCalculatorInputValue>
	fieldName: number
}

function CloseButton({ fieldName }: { fieldName: number }) {
	const remove = useContext(RemoveTurnCardFnContext)
	return (
		<Button
			onClick={() => remove(fieldName)}
			type="text"
			icon={<CloseOutlined />}
		/>
	)
}

const TurnCard = memo((props: TurnCardProps) => {
	const { form, fieldName } = props
	const isRequiredNpStarCalc = useAtomValue(isRequiredNpStarCalcAtom)
	return (
		<Card
			title={`${fieldName + 1}T目`}
			extra={<CloseButton fieldName={fieldName} />}
			style={{ width: '100%' }}
		>
			<Flex vertical gap={12} align="flex-start">
				<Space.Compact>
					<SpaceCompactHeader>クラス相性</SpaceCompactHeader>
					<Form.Item name={[fieldName, 'classAffinity']} initialValue={2.0}>
						<Select options={enemyClassOptions} style={{ width: 68 }} />
					</Form.Item>
					<SpaceCompactHeader>属性相性</SpaceCompactHeader>
					<Form.Item name={[fieldName, 'attributeAffinity']} initialValue={1.0}>
						<Select options={enemyClassOptions} style={{ width: 68 }} />
					</Form.Item>
					<Form.Item name={[fieldName, 'targetDamage']}>
						<InputNumber
							type="number"
							addonBefore="目標ダメージ"
							style={{ width: 240 }}
						/>
					</Form.Item>
				</Space.Compact>
				<CollapseWithOutHeader isActive={isRequiredNpStarCalc}>
					<Space.Compact>
						<Form.Item name={[fieldName, 'dtdr']} initialValue={100}>
							<InputNumber
								type="number"
								addonBefore="DTDR（敵NP補正）"
								addonAfter="%"
								style={{ width: 240 }}
							/>
						</Form.Item>
						<Form.Item name={[fieldName, 'dsr']}>
							<InputNumber
								type="number"
								addonBefore="DSR（敵スター補正）"
								addonAfter="%"
								style={{ width: 252 }}
							/>
						</Form.Item>
					</Space.Compact>
				</CollapseWithOutHeader>
				<Form.List name={[fieldName, 'turnEffects']}>
					{(fields, { add, remove, move }) => (
						<RemoveBuffFormFnContext.Provider value={remove}>
							<MoveBuffFormFnContext.Provider value={move}>
								<Flex vertical gap={4} align="flex-start">
									<Button onClick={() => add()} icon={<PlusOutlined />}>
										追加
									</Button>
									{fields.map((field) => (
										<BuffForm key={field.key} fieldName={field.name} />
									))}
								</Flex>
							</MoveBuffFormFnContext.Provider>
						</RemoveBuffFormFnContext.Provider>
					)}
				</Form.List>
				<CardCard form={form} turnIndex={fieldName} title="1st" index={0} />
				<CardCard form={form} turnIndex={fieldName} title="2nd" index={1} />
				<CardCard form={form} turnIndex={fieldName} title="3rd" index={2} />
				<CardCard form={form} turnIndex={fieldName} title="4th" index={3} />
			</Flex>
		</Card>
	)
})

export default TurnCard
