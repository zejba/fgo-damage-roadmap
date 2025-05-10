import {
	Button,
	Checkbox,
	Flex,
	Form,
	type FormInstance,
	Modal,
	type ModalProps,
	Select,
	Space,
	Typography,
} from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useCallback } from 'react'
import ServantData from '../../data/servant_data.json'
import type {
	CardColor,
	DamageCalculatorInputValue,
	SkillData,
	SkillType,
} from './types'

const servantOptions = ServantData.map((servant, index) => ({
	value: index,
	label: servant.name,
}))

interface SetServantInfoModalProps extends ModalProps {
	form: FormInstance<DamageCalculatorInputValue>
	closeModal: () => void
}

interface SetServantInfoModalValues {
	servantIndex: number
	isLv120: boolean
	hasGoldFou: boolean
	hasFootprint: boolean
}

function SetServantInfoModal(props: SetServantInfoModalProps) {
	const { form: parentForm, closeModal, ...rest } = props
	const [form] = useForm<SetServantInfoModalValues>()
	const handlePerfection = useCallback(() => {
		form.setFieldsValue({
			isLv120: true,
			hasGoldFou: true,
			hasFootprint: true,
		})
	}, [form])

	const handleSubmit = useCallback(() => {
		const values = form.getFieldsValue()
		const servant = ServantData[values.servantIndex]
		if (!servant) {
			closeModal()
			return
		}
		const prevPassiveEffects: SkillData[] = (
			parentForm.getFieldValue('passiveEffects') ?? []
		).filter((effect: SkillData) => effect.skillName !== 'クラススキル')
		const atk =
			1000 +
			(values.isLv120 ? Number(servant.atk120) : Number(servant.atkMax)) +
			(values.hasGoldFou ? 2000 : 0)
		const footPrintValue = values.hasFootprint ? 500 : 0
		parentForm.setFieldsValue({
			title: servant.name,
			servantClass: servant.className,
			servantAttribute: servant.attribute,
			servantAtk: atk,
			npColor: servant.npColor as CardColor,
			npValue: Number(servant.npValue),
			npGain: Number(servant.npGain),
			starRate: Number(servant.starRate),
			hitCountN: Number(servant.npHit),
			hitCountB: Number(servant.bHit),
			hitCountA: Number(servant.aHit),
			hitCountQ: Number(servant.qHit),
			hitCountEX: Number(servant.exHit),
			passiveEffects: [
				...servant.classPassive.map((effect) => ({
					skillName: 'クラススキル',
					skillType: effect.type as SkillType,
					amount: Number(effect.value),
					turns: -1,
					times: -1,
				})),
				...prevPassiveEffects,
			],
			footprintB: footPrintValue,
			footprintA: footPrintValue,
			footprintQ: footPrintValue,
		})
		closeModal()
	}, [form, parentForm, closeModal])

	return (
		<Modal
			title="サーヴァント情報自動入力"
			onOk={handleSubmit}
			onCancel={closeModal}
			okText="入力"
			cancelText="キャンセル"
			{...rest}
		>
			<Form form={form}>
				<Flex vertical gap={4}>
					<Form.Item name="servantIndex">
						<Select
							placeholder="サーヴァント名"
							options={servantOptions}
							showSearch
							optionFilterProp="label"
						/>
					</Form.Item>
					<Space>
						<Button onClick={handlePerfection}>完全体</Button>(
						<Form.Item name="isLv120" valuePropName="checked">
							<Checkbox>Lv.120</Checkbox>
						</Form.Item>
						<Form.Item name="hasGoldFou" valuePropName="checked">
							<Checkbox>金フォウ</Checkbox>
						</Form.Item>
						<Form.Item name="hasFootprint" valuePropName="checked">
							<Checkbox>足跡</Checkbox>
						</Form.Item>
						)
					</Space>
					<Typography.Text>※ATK銀フォウ込みで入力されます</Typography.Text>
				</Flex>
			</Form>
		</Modal>
	)
}

export default SetServantInfoModal
