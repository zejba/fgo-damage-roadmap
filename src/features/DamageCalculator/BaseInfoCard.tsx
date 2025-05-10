import {
	Button,
	Card,
	Flex,
	Form,
	type FormInstance,
	Input,
	InputNumber,
	Select,
	Space,
} from 'antd'
import SpaceCompactHeader from '../../components/SpaceCompactHeader'
import {
	cardColors,
	servantAttributes,
	servantClasses,
} from '../../data/options'
import BaseInfoNpStarSection from './BaseInfoNpStarSection'
import SetServantInfoModalSection from './SetServantInfoModalSection'
import type { DamageCalculatorInputValue } from './types'

interface BaseInfoCardProps {
	form: FormInstance<DamageCalculatorInputValue>
}

function BaseInfoCard(props: BaseInfoCardProps) {
	const { form } = props
	return (
		<Card title="基本情報" style={{ width: '100%' }}>
			<Flex vertical gap={12} align="flex-start">
				<SetServantInfoModalSection form={form} />
				<Space.Compact>
					<Form.Item name="title">
						<Input placeholder="タイトル" style={{ width: 340 }} />
					</Form.Item>
					<Form.Item name="servantClass">
						<Select options={servantClasses} style={{ width: 60 }} />
					</Form.Item>
					<Form.Item name="servantAttribute" style={{ width: 60 }}>
						<Select options={servantAttributes} />
					</Form.Item>
				</Space.Compact>
				<Form.Item name="servantAtk">
					<InputNumber addonBefore="ATK" style={{ width: 140 }} type="number" />
				</Form.Item>
				<Space.Compact>
					<Form.Item name="craftEssenceAtk">
						<InputNumber
							addonBefore="礼装ATK"
							style={{ width: 160 }}
							type="number"
						/>
					</Form.Item>
					<Button onClick={() => form.setFieldValue('craftEssenceAtk', 2000)}>
						2000
					</Button>
					<Button onClick={() => form.setFieldValue('craftEssenceAtk', 2400)}>
						2400
					</Button>
					<Button onClick={() => form.setFieldValue('craftEssenceAtk', 1000)}>
						1000
					</Button>
				</Space.Compact>
				<Space.Compact>
					<SpaceCompactHeader>宝具</SpaceCompactHeader>
					<Form.Item name="npColor" initialValue="buster">
						<Select options={cardColors} style={{ width: 60 }} />
					</Form.Item>
					<Form.Item name="npValue">
						<InputNumber type="number" addonAfter="%" style={{ width: 120 }} />
					</Form.Item>
				</Space.Compact>
				<Space.Compact>
					<SpaceCompactHeader>足跡</SpaceCompactHeader>
					<Form.Item name="footprintB">
						<InputNumber
							addonBefore="B"
							type="number"
							style={{ width: 92 }}
							max={500}
							min={0}
						/>
					</Form.Item>
					<Form.Item name="footprintA">
						<InputNumber
							addonBefore="A"
							type="number"
							style={{ width: 92 }}
							max={500}
							min={0}
						/>
					</Form.Item>
					<Form.Item name="footprintQ">
						<InputNumber
							addonBefore="Q"
							type="number"
							style={{ width: 92 }}
							max={500}
							min={0}
						/>
					</Form.Item>
				</Space.Compact>
				<BaseInfoNpStarSection />
			</Flex>
		</Card>
	)
}

export default BaseInfoCard
