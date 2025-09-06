import { PlusOutlined } from '@ant-design/icons'
import { Button, Card, Flex, Form, type FormInstance, Space } from 'antd'
import { memo, useCallback } from 'react'
import { classScores } from '../../data/templateBuffs'
import AddTemplateBuffsButton from './AddTemplateBuffsButton'
import BuffForm from './BuffForm'
import { MoveBuffFormFnContext, RemoveBuffFormFnContext } from './context'
import type { DamageCalculatorInputValue } from './types'

interface PassiveEffectCardProps {
	form: FormInstance<DamageCalculatorInputValue>
}

const AddClassScoresButton = memo((props: PassiveEffectCardProps) => {
	const { form } = props
	const addClassScores = useCallback(() => {
		const prev = form.getFieldValue('passiveEffects')
		form.setFieldsValue({
			passiveEffects: [...(prev ?? []), ...classScores],
		})
	}, [form])
	return <Button onClick={addClassScores}>スコア追加</Button>
})

function PassiveEffectCard(props: PassiveEffectCardProps) {
	const { form } = props
	return (
		<Card title="パッシブ・開始時効果" style={{ width: '100%' }}>
			<Form.List name="passiveEffects">
				{(fields, { add, remove, move }) => {
					return (
						<RemoveBuffFormFnContext.Provider value={remove}>
							<MoveBuffFormFnContext.Provider value={move}>
								<Flex vertical gap={4} align="flex-start">
									<Space>
										<Button onClick={() => add()} icon={<PlusOutlined />}>
											追加
										</Button>
										<AddClassScoresButton form={form} />
										<AddTemplateBuffsButton form={form} />
									</Space>
									{fields.map((field) => (
										<BuffForm key={field.key} fieldName={field.name} />
									))}
								</Flex>
							</MoveBuffFormFnContext.Provider>
						</RemoveBuffFormFnContext.Provider>
					)
				}}
			</Form.List>
		</Card>
	)
}

export default PassiveEffectCard
