import {
	CalculatorFilled,
	CloseOutlined,
	DatabaseOutlined,
	PlusOutlined,
} from '@ant-design/icons'
import {
	Button,
	Card,
	Checkbox,
	Flex,
	Form,
	type FormListFieldData,
	Input,
	InputNumber,
	Modal,
	type ModalProps,
	Select,
	Space,
	Switch,
	Typography,
} from 'antd'
import { type FormInstance, useForm } from 'antd/es/form/Form'
import { useCallback, useMemo, useState } from 'react'
import SpaceCompactHeader from '../../components/SpaceCompactHeader'
import {
	cardColors,
	cardTypeOptions,
	damageJudgmentOptions,
	enemyClassOptions,
	servantAttributes,
	servantClasses,
	skillTypes,
	turnOptions,
} from '../../data/options'
import ServantData from '../../data/servant_data.json'
import { useBoolean } from '../../hooks/useBoolean'

interface SkillData {
	skillName?: string
	skillType?: string
	amount?: number
	turns?: number
	times?: number
}

interface TurnData {
	classAffinity?: number
	attributeAffinity?: number
	targetDamage?: number
	turnEffects?: SkillData[]
	card1Effects?: SkillData[]
	card2Effects?: SkillData[]
	card3Effects?: SkillData[]
	card4Effects?: SkillData[]
	card1Type?: string
	card2Type?: string
	card3Type?: string
	card1IsCritical?: boolean
	card2IsCritical?: boolean
	card3IsCritical?: boolean
	card1DamageJudgement?: string
	card2DamageJudgement?: string
	card3DamageJudgement?: string
	card4DamageJudgement?: string
	card1OverKillCount?: number
	card2OverKillCount?: number
	card3OverKillCount?: number
	card4OverKillCount?: number
}

interface DamageCalculatorInputValue {
	title?: string
	servantClass?: string
	servantAttribute?: string
	servantAtk?: number
	craftEssenceAtk?: number
	npColor?: string
	npValue?: number
	footprintB?: number
	footprintA?: number
	footprintQ?: number
	npGain?: number
	starRate?: number
	hitCountN?: number
	hitCountB?: number
	hitCountA?: number
	hitCountQ?: number
	hitCountEX?: number
	passiveEffects?: SkillData[]
	turns?: TurnData[]
}

interface BaseInfoCardProps {
	form: FormInstance<DamageCalculatorInputValue>
	openServantModal: () => void
	isRequiredNpStarCalc: boolean
	toggleIsRequiredNpStarCalc: () => void
}

function BaseInfoCard(props: BaseInfoCardProps) {
	const {
		openServantModal,
		isRequiredNpStarCalc,
		toggleIsRequiredNpStarCalc,
		form,
	} = props
	return (
		<Card title="基本情報" style={{ width: '100%' }}>
			<Flex vertical gap={12} align="flex-start">
				<Button onClick={openServantModal} icon={<DatabaseOutlined />}>
					自動入力
				</Button>
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
					<Form.Item name="npColor">
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
				<Space>
					<Typography.Text>NP・スター計算</Typography.Text>
					<Switch
						value={isRequiredNpStarCalc}
						onChange={toggleIsRequiredNpStarCalc}
					/>
				</Space>
				{isRequiredNpStarCalc && (
					<>
						<Form.Item name="npGain">
							<InputNumber
								addonBefore="NP獲得量"
								addonAfter="%"
								type="number"
								style={{ width: 180 }}
							/>
						</Form.Item>
						<Form.Item name="starRate">
							<InputNumber
								addonBefore="スター発生率"
								addonAfter="%"
								type="number"
								style={{ width: 200 }}
							/>
						</Form.Item>
						<Space.Compact>
							<SpaceCompactHeader>Hit数</SpaceCompactHeader>
							<Form.Item name="hitCountN">
								<InputNumber
									type="number"
									addonBefore="N"
									style={{ width: 80 }}
								/>
							</Form.Item>
							<Form.Item name="hitCountB">
								<InputNumber
									type="number"
									addonBefore="B"
									style={{ width: 80 }}
								/>
							</Form.Item>
							<Form.Item name="hitCountA">
								<InputNumber
									type="number"
									addonBefore="A"
									style={{ width: 80 }}
								/>
							</Form.Item>
							<Form.Item name="hitCountQ">
								<InputNumber
									type="number"
									addonBefore="Q"
									style={{ width: 80 }}
								/>
							</Form.Item>
							<Form.Item name="hitCountEX">
								<InputNumber
									type="number"
									addonBefore="EX"
									style={{ width: 80 }}
								/>
							</Form.Item>
						</Space.Compact>
					</>
				)}
			</Flex>
		</Card>
	)
}

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
				{(fields, { add, remove, move }) => (
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
								field={field}
								remove={remove}
								move={move}
							/>
						))}
					</Flex>
				)}
			</Form.List>
		</Card>
	)
}

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
			npColor: servant.npColor,
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
					skillType: effect.type,
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

function DamageCalculatorPage() {
	const [form] = useForm<DamageCalculatorInputValue>()
	const [isServantModalOpen, openServantModal, closeServantModal] =
		useBoolean(false)
	const [isRequiredNpStarCalc, , , toggleIsRequiredNpStarCalc] =
		useBoolean(false)
	return (
		<Flex
			vertical
			gap={12}
			style={{
				width: 'fit-content',
				border: '1px solid',
				padding: 12,
			}}
		>
			<Typography.Title>ダメージ計算</Typography.Title>
			<Form form={form}>
				<Flex vertical gap={12} align="center" style={{ width: 648 }}>
					<BaseInfoCard
						openServantModal={openServantModal}
						isRequiredNpStarCalc={isRequiredNpStarCalc}
						toggleIsRequiredNpStarCalc={toggleIsRequiredNpStarCalc}
						form={form}
					/>
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
											field={field}
											remove={remove}
											isRequiredNpStarCalc={isRequiredNpStarCalc}
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
			<Button
				style={{ width: 'fit-content' }}
				type="primary"
				onClick={() => console.log(form.getFieldsValue())}
				icon={<CalculatorFilled />}
				iconPosition="end"
			>
				計算
			</Button>
			<SetServantInfoModal
				form={form}
				open={isServantModalOpen}
				closeModal={closeServantModal}
			/>
		</Flex>
	)
}

interface BuffFormProps {
	field: FormListFieldData
	remove: (index: number | number[]) => void
	move: (from: number, to: number) => void
}

function BuffForm(props: BuffFormProps) {
	const {
		field: { name },
		remove,
		move,
	} = props
	return (
		<Space.Compact>
			<Form.Item name={[name, 'skillName']}>
				<Input placeholder="スキル・バフ名" style={{ width: 120 }} />
			</Form.Item>
			<Form.Item name={[name, 'skillType']} initialValue="atkBuff">
				<Select options={skillTypes} style={{ width: 132 }} />
			</Form.Item>
			<Form.Item name={[name, 'amount']}>
				<InputNumber
					placeholder="効果量"
					type="number"
					addonAfter="%"
					style={{ width: 112 }}
				/>
			</Form.Item>
			<Form.Item name={[name, 'turn']}>
				<Select options={turnOptions} style={{ width: 60 }} />
			</Form.Item>
			<SpaceCompactHeader>T</SpaceCompactHeader>
			<Form.Item name={[name, 'count']}>
				<Select options={turnOptions} style={{ width: 60 }} />
			</Form.Item>
			<SpaceCompactHeader>回</SpaceCompactHeader>
			<Button onClick={() => remove(name)} style={{ padding: 8 }}>
				✖
			</Button>
			<Button
				onClick={() => move(name, Math.max(name - 1, 0))}
				style={{ padding: 8 }}
			>
				▲
			</Button>
		</Space.Compact>
	)
}

interface TurnCardProps {
	form: FormInstance<DamageCalculatorInputValue>
	field: FormListFieldData
	remove: (index: number | number[]) => void
	isRequiredNpStarCalc: boolean
}

function TurnCard(props: TurnCardProps) {
	const {
		form,
		field: { name },
		remove,
		isRequiredNpStarCalc,
	} = props
	const CloseButton = useMemo(() => {
		return (
			<Button
				onClick={() => remove(name)}
				type="text"
				icon={<CloseOutlined />}
			/>
		)
	}, [remove, name])
	return (
		<Card
			title={`${name + 1}T目`}
			extra={CloseButton}
			style={{ width: '100%' }}
		>
			<Flex vertical gap={12} align="flex-start">
				<Space.Compact>
					<SpaceCompactHeader>クラス相性</SpaceCompactHeader>
					<Form.Item name={[name, 'classAffinity']} initialValue={2.0}>
						<Select options={enemyClassOptions} style={{ width: 68 }} />
					</Form.Item>
					<SpaceCompactHeader>属性相性</SpaceCompactHeader>
					<Form.Item name={[name, 'attributeAffinity']} initialValue={1.0}>
						<Select options={enemyClassOptions} style={{ width: 68 }} />
					</Form.Item>
					<Form.Item name={[name, 'targetDamage']}>
						<InputNumber
							type="number"
							addonBefore="目標ダメージ"
							style={{ width: 240 }}
						/>
					</Form.Item>
				</Space.Compact>
				{isRequiredNpStarCalc && (
					<Space.Compact>
						<Form.Item name={[name, 'dtdr']} initialValue={100}>
							<InputNumber
								type="number"
								addonBefore="DTDR（敵NP補正）"
								addonAfter="%"
								style={{ width: 240 }}
							/>
						</Form.Item>
						<Form.Item name={[name, 'dsr']}>
							<InputNumber
								type="number"
								addonBefore="DSR（敵スター補正）"
								addonAfter="%"
								style={{ width: 252 }}
							/>
						</Form.Item>
					</Space.Compact>
				)}
				<Form.List name={[name, 'turnEffects']}>
					{(fields, { add, remove, move }) => (
						<Flex vertical gap={4} align="flex-start">
							<Button onClick={() => add()} icon={<PlusOutlined />}>
								追加
							</Button>
							{fields.map((field) => (
								<BuffForm
									key={field.key}
									field={field}
									remove={remove}
									move={move}
								/>
							))}
						</Flex>
					)}
				</Form.List>
				<CardCard form={form} turnIndex={name} title="1st" index={0} />
				<CardCard form={form} turnIndex={name} title="2nd" index={1} />
				<CardCard form={form} turnIndex={name} title="3rd" index={2} />
				<CardCard form={form} turnIndex={name} title="4th" index={3} />
			</Flex>
		</Card>
	)
}

interface CardCardProps {
	form: FormInstance<DamageCalculatorInputValue>
	turnIndex: number
	index: number
	title: string
}

const colors = {
	buster: '#FF0000',
	arts: '#0000FF',
	quick: '#00FF00',
}

type CardColor = 'buster' | 'arts' | 'quick'

function CardCard(props: CardCardProps) {
	const { turnIndex, title, index, form } = props
	const [titleBgColor, setTitleBgColor] = useState('#F0F0F0')
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
			setTitleBgColor(colors[npColor as CardColor])
		} else {
			setTitleBgColor(colors[cardType as CardColor])
		}
	}, [form, turnIndex, index])

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
								name={[turnIndex, `card${index + 1}Critical`]}
								valuePropName="checked"
								initialValue={true}
							>
								<Checkbox>クリティカル</Checkbox>
							</Form.Item>
						)}
					</Flex>
					<Form.Item
						name={[turnIndex, `card${index + 1}DamageJudgment`]}
						initialValue="default"
					>
						<Select options={damageJudgmentOptions} style={{ width: 132 }} />
					</Form.Item>
					<Form.Item name={[turnIndex, `card${index + 1}OverKill`]}>
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
									field={field}
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

export default DamageCalculatorPage
