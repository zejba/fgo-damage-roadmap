import { Button, Dropdown, type FormInstance } from 'antd'
import { memo, useCallback } from 'react'
import { appendSkills, craftEssences } from '../../data/templateBuffs'
import type { DamageCalculatorInputValue } from './types'

interface Props {
	form: FormInstance<DamageCalculatorInputValue>
}

const templateBuffs = [...appendSkills, ...craftEssences]

const items = [
	...Object.values(templateBuffs).map((skill) => ({
		label: skill.skillName,
		key: skill.skillName,
	})),
]

const AddTemplateBuffsButton = memo((props: Props) => {
	const { form } = props
	const handleSelect = useCallback(
		(e: { key: string }) => {
			const prev = form.getFieldValue('passiveEffects')
			const selectedBuff = templateBuffs.find(
				(option) => option.skillName === e.key,
			)
			if (selectedBuff) {
				form.setFieldsValue({
					passiveEffects: [...(prev ?? []), selectedBuff],
				})
			}
		},
		[form],
	)
	return (
		<>
			<Dropdown menu={{ items, onClick: handleSelect }}>
				<Button>テンプレ追加</Button>
			</Dropdown>
		</>
	)
})

export default AddTemplateBuffsButton
