import { PlusOutlined } from '@ant-design/icons'
import { Button, Flex, Form, type FormInstance } from 'antd'
import BaseInfoCard from './BaseInfoCard'
import CalcButtonSection from './CalcButtonSection'
import PassiveEffectCard from './PassiveEffectCard'
import TurnCard from './TurnCard'
import { RemoveTurnCardFnContext } from './context'
import type { DamageCalculatorInputValue } from './types'

interface Props {
	form: FormInstance<DamageCalculatorInputValue>
}

function CalcInputSection(props: Props) {
	const { form } = props
	return (
		<>
			<Form form={form}>
				<Flex
					vertical
					gap={12}
					align="center"
					style={{ width: 648, marginBottom: 12 }}
				>
					<BaseInfoCard form={form} />
					<PassiveEffectCard form={form} />
					<Form.List name="turns">
						{(fields, { add, remove }) => (
							<RemoveTurnCardFnContext.Provider value={remove}>
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
										/>
									))}
								</Flex>
								<Button onClick={() => add()} icon={<PlusOutlined />}>
									ターン追加
								</Button>
							</RemoveTurnCardFnContext.Provider>
						)}
					</Form.List>
				</Flex>
			</Form>
			<CalcButtonSection form={form} />
		</>
	)
}

export default CalcInputSection
