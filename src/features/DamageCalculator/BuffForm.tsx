import { ArrowUpOutlined, CloseOutlined } from '@ant-design/icons'
import { Button, Form, Input, InputNumber, Select, Space } from 'antd'
import { memo, useContext } from 'react'
import SpaceCompactHeader from '../../components/SpaceCompactHeader'
import { skillTypes, turnOptions } from '../../data/options'
import { MoveBuffFormFnContext, RemoveBuffFormFnContext } from './context'

interface BuffFormProps {
	fieldName: number
}

function RemoveButton(props: BuffFormProps) {
	const { fieldName } = props
	const remove = useContext(RemoveBuffFormFnContext)
	return (
		<Button onClick={() => remove(fieldName)} style={{ padding: 8 }}>
			<CloseOutlined />
		</Button>
	)
}

function MoveButton(props: BuffFormProps) {
	const { fieldName } = props
	const move = useContext(MoveBuffFormFnContext)
	return (
		<Button
			onClick={() => move(fieldName, Math.max(fieldName - 1, 0))}
			style={{ padding: 8 }}
		>
			<ArrowUpOutlined />
		</Button>
	)
}

const BuffForm = memo((props: BuffFormProps) => {
	const { fieldName } = props
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
			<Form.Item name={[fieldName, 'turns']}>
				<Select options={turnOptions} style={{ width: 60 }} />
			</Form.Item>
			<SpaceCompactHeader>T</SpaceCompactHeader>
			<Form.Item name={[fieldName, 'times']}>
				<Select options={turnOptions} style={{ width: 60 }} />
			</Form.Item>
			<SpaceCompactHeader>回</SpaceCompactHeader>
			<RemoveButton fieldName={fieldName} />
			<MoveButton fieldName={fieldName} />
		</Space.Compact>
	)
})

export default BuffForm
