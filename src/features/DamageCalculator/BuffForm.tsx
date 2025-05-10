import { ArrowUpOutlined, CloseOutlined } from '@ant-design/icons'
import { Button, Form, Input, InputNumber, Select, Space } from 'antd'
import { memo } from 'react'
import SpaceCompactHeader from '../../components/SpaceCompactHeader'
import { skillTypes, turnOptions } from '../../data/options'

interface BuffFormProps {
	fieldName: number
	remove: (index: number | number[]) => void
	move: (from: number, to: number) => void
}

const BuffForm = memo((props: BuffFormProps) => {
	const { fieldName, remove, move } = props
	return (
		<Space.Compact>
			<Form.Item name={[fieldName, 'skillName']}>
				<Input placeholder="スキル・バフ名" style={{ width: 120 }} />
			</Form.Item>
			<Form.Item name={[fieldName, 'skillType']} initialValue="atkBuff">
				<Select options={skillTypes} style={{ width: 132 }} />
			</Form.Item>
			<Form.Item name={[fieldName, 'amount']}>
				<InputNumber
					placeholder="効果量"
					type="number"
					addonAfter="%"
					style={{ width: 112 }}
				/>
			</Form.Item>
			<Form.Item name={[fieldName, 'turn']}>
				<Select options={turnOptions} style={{ width: 60 }} />
			</Form.Item>
			<SpaceCompactHeader>T</SpaceCompactHeader>
			<Form.Item name={[fieldName, 'count']}>
				<Select options={turnOptions} style={{ width: 60 }} />
			</Form.Item>
			<SpaceCompactHeader>回</SpaceCompactHeader>
			<Button onClick={() => remove(fieldName)} style={{ padding: 8 }}>
				<CloseOutlined />
			</Button>
			<Button
				onClick={() => move(fieldName, Math.max(fieldName - 1, 0))}
				style={{ padding: 8 }}
			>
				<ArrowUpOutlined />
			</Button>
		</Space.Compact>
	)
})

export default BuffForm
