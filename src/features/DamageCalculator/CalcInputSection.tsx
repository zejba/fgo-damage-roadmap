import { PlusOutlined } from '@ant-design/icons'
import { Button, Flex, Form } from 'antd'
import BaseInfoCard from './BaseInfoCard'
import CalcButtonSection from './CalcButtonSection'
import PassiveEffectCard from './PassiveEffectCard'
import TurnCard from './TurnCard'
import type { DamageCalculatorInputValue } from './types'

function CalcInputSection() {
	const [form] = Form.useForm<DamageCalculatorInputValue>()
	return (
		<>
			<Flex
				vertical
				gap={12}
				style={{
					width: 'fit-content',
					padding: 12,
				}}
			>
				<Form form={form}>
					<Flex vertical gap={12} align="center" style={{ width: 648 }}>
						<BaseInfoCard form={form} />
						<PassiveEffectCard form={form} />
						<Form.List name="turns">
							{(fields, { add, remove }) => (
								<>
									<Flex
										vertical
										gap={12}
										align="flex-start"
										style={{ width: '100%' }}
									>
										{fields.map((field) => (
											<TurnCard
												form={form}
												key={field.key}
												fieldName={field.name}
												remove={remove}
											/>
										))}
									</Flex>
									<Button onClick={() => add()} icon={<PlusOutlined />}>
										ターン追加
									</Button>
								</>
							)}
						</Form.List>
					</Flex>
				</Form>
				<CalcButtonSection form={form} />
			</Flex>
		</>
	)
}

export default CalcInputSection
