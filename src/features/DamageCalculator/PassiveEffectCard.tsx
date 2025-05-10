import { PlusOutlined } from '@ant-design/icons'
import { Button, Card, Flex, Form, type FormInstance, Space } from 'antd'
import { useCallback } from 'react'
import BuffForm from './BuffForm'
import type { DamageCalculatorInputValue } from './types'

interface PassiveEffectCardProps {
	form: FormInstance<DamageCalculatorInputValue>
}

function PassiveEffectCard(props: PassiveEffectCardProps) {
	const { form } = props
	const x = useCallback(() => {
		const prev = form.getFieldValue('passiveEffects')
		form.setFieldsValue({
			passiveEffects: [
				...(prev ?? []),
				{
					skillName: 'test',
					skillType: 'atkBuff',
					amount: 10,
					turns: 1,
					times: 1,
				},
			],
		})
	}, [form])
	return (
		<Card title="パッシブ・開始時効果" style={{ width: '100%' }}>
			<Form.List name="passiveEffects">
				{(fields, { add, remove, move }) => {
					return (
						<Flex vertical gap={4} align="flex-start">
							<Space>
								<Button onClick={() => add()} icon={<PlusOutlined />}>
									追加
								</Button>
								<Button onClick={x}>テンプレ追加</Button>
							</Space>
							{fields.map((field) => (
								<BuffForm
									key={field.key}
									fieldName={field.name}
									remove={remove}
									move={move}
								/>
							))}
						</Flex>
					)
				}}
			</Form.List>
		</Card>
	)
}

export default PassiveEffectCard
