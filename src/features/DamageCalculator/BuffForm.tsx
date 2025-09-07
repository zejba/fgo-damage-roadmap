import { ArrowUpOutlined, CloseOutlined } from '@ant-design/icons'
import { Button, Input, InputNumber, Select, Space } from 'antd'
import { type PrimitiveAtom, useAtom } from 'jotai'
import { memo } from 'react'
import SpaceCompactHeader from '../../components/SpaceCompactHeader'
import { skillTypes, turnOptions } from '../../data/options'
import type { Buff } from '../../data/types'

interface BuffFormProps {
	buffAtom: PrimitiveAtom<Buff>
	remove: (atom: PrimitiveAtom<Buff>) => void
}

export function BuffForm(props: BuffFormProps) {
	const { buffAtom, remove } = props
	const [buff, setBuff] = useAtom(buffAtom)
	return (
		<Space.Compact>
			<Input
				value={buff.name}
				onChange={(e) => setBuff({ ...buff, name: e.target.value })}
				placeholder="スキル・バフ名"
				style={{ width: 120 }}
			/>
			<Select
				value={buff.type}
				onChange={(value) => setBuff({ ...buff, type: value })}
				options={skillTypes}
				style={{ width: 132 }}
			/>
			<InputNumber
				value={buff.amount}
				onChange={(value) => setBuff({ ...buff, amount: value })}
				placeholder="効果量"
				type="number"
				addonAfter="%"
				style={{ width: 112 }}
			/>
			<Select
				value={buff.turn}
				onChange={(value) => setBuff({ ...buff, turn: value })}
				options={turnOptions}
				style={{ width: 60 }}
			/>
			<SpaceCompactHeader>T</SpaceCompactHeader>
			<Select
				value={buff.count}
				onChange={(value) => setBuff({ ...buff, count: value })}
				options={turnOptions}
				style={{ width: 60 }}
			/>
			<SpaceCompactHeader>回</SpaceCompactHeader>
			<Button onClick={() => remove(buffAtom)} style={{ padding: 8 }}>
				<CloseOutlined />
			</Button>
			<Button onClick={() => {}} style={{ padding: 8 }}>
				<ArrowUpOutlined />
			</Button>
		</Space.Compact>
	)
}

export const MemoizedBuffForm = memo(BuffForm)
