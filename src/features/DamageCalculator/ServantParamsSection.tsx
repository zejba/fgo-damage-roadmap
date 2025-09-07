import { DatabaseOutlined } from '@ant-design/icons'
import { Button, Card, Flex, Input, InputNumber, Select, Space } from 'antd'
import { useAtom } from 'jotai'
import SpaceCompactHeader from '../../components/SpaceCompactHeader'
import {
	cardColors,
	servantAttributes,
	servantClasses,
} from '../../data/options'
import { useBoolean } from '../../hooks/useBoolean'
import {
	craftEssenceAtkAtom,
	footprintAAtom,
	footprintBAtom,
	footprintQAtom,
	npColorAtom,
	npValueAtom,
	servantAtkAtom,
	servantAttributeAtom,
	servantClassAtom,
	titleAtom,
} from '../../store/servantParams'
import AutoFillServantParamsModal from './AutoFillServantParamsModal'
import ServantParamsNpStarSection from './ServantParamsNpStarSection'

// タイトル・クラス・属性
function TitleClassAttributeRow() {
	const [title, setTitle] = useAtom(titleAtom)
	const [servantClass, setServantClass] = useAtom(servantClassAtom)
	const [servantAttribute, setServantAttribute] = useAtom(servantAttributeAtom)
	return (
		<Space.Compact>
			<Input
				placeholder="タイトル"
				style={{ width: 340 }}
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<Select
				options={servantClasses}
				style={{ width: 60 }}
				value={servantClass}
				onChange={setServantClass}
			/>
			<Select
				options={servantAttributes}
				style={{ width: 60 }}
				value={servantAttribute}
				onChange={setServantAttribute}
			/>
		</Space.Compact>
	)
}

// ATK
function ServantAtkRow() {
	const [servantAtk, setServantAtk] = useAtom(servantAtkAtom)
	return (
		<InputNumber
			addonBefore="ATK"
			style={{ width: 140 }}
			type="number"
			value={servantAtk}
			onChange={(value) => value != null && setServantAtk(value)}
		/>
	)
}

// 礼装ATK
function CraftEssenceAtkRow() {
	const [craftEssenceAtk, setCraftEssenceAtk] = useAtom(craftEssenceAtkAtom)
	return (
		<Space.Compact>
			<InputNumber
				addonBefore="礼装ATK"
				style={{ width: 160 }}
				type="number"
				value={craftEssenceAtk}
				onChange={(value) => value != null && setCraftEssenceAtk(value)}
			/>
			<Button onClick={() => setCraftEssenceAtk(2000)}>2000</Button>
			<Button onClick={() => setCraftEssenceAtk(2400)}>2400</Button>
			<Button onClick={() => setCraftEssenceAtk(1000)}>1000</Button>
		</Space.Compact>
	)
}

// 宝具
function NoblePhantasmRow() {
	const [npColor, setNpColor] = useAtom(npColorAtom)
	const [npValue, setNpValue] = useAtom(npValueAtom)
	return (
		<Space.Compact>
			<SpaceCompactHeader>宝具</SpaceCompactHeader>
			<Select
				options={cardColors}
				style={{ width: 60 }}
				value={npColor}
				onChange={setNpColor}
			/>
			<InputNumber
				type="number"
				addonAfter="%"
				style={{ width: 120 }}
				value={npValue}
				onChange={(value) => value != null && setNpValue(value)}
			/>
		</Space.Compact>
	)
}

// 足跡
function FootprintRow() {
	const [footprintB, setFootprintB] = useAtom(footprintBAtom)
	const [footprintA, setFootprintA] = useAtom(footprintAAtom)
	const [footprintQ, setFootprintQ] = useAtom(footprintQAtom)
	return (
		<Space.Compact>
			<SpaceCompactHeader>足跡</SpaceCompactHeader>
			<InputNumber
				addonBefore="B"
				type="number"
				style={{ width: 92 }}
				max={500}
				min={0}
				value={footprintB}
				onChange={(value) => value != null && setFootprintB(value)}
			/>
			<InputNumber
				addonBefore="A"
				type="number"
				style={{ width: 92 }}
				max={500}
				min={0}
				value={footprintA}
				onChange={(value) => value != null && setFootprintA(value)}
			/>
			<InputNumber
				addonBefore="Q"
				type="number"
				style={{ width: 92 }}
				max={500}
				min={0}
				value={footprintQ}
				onChange={(value) => value != null && setFootprintQ(value)}
			/>
		</Space.Compact>
	)
}

function AutoFillServantParamsModalSection() {
	const [isServantModalOpen, openServantModal, closeServantModal] =
		useBoolean(false)
	return (
		<>
			<Button onClick={openServantModal} icon={<DatabaseOutlined />}>
				自動入力
			</Button>
			<AutoFillServantParamsModal
				open={isServantModalOpen}
				closeModal={closeServantModal}
			/>
		</>
	)
}

export function ServantParamsSection() {
	return (
		<Card title="基本情報" style={{ width: '100%' }}>
			<Flex vertical gap={12} align="flex-start">
				<AutoFillServantParamsModalSection />
				<TitleClassAttributeRow />
				<ServantAtkRow />
				<CraftEssenceAtkRow />
				<NoblePhantasmRow />
				<FootprintRow />
				<ServantParamsNpStarSection />
			</Flex>
		</Card>
	)
}
