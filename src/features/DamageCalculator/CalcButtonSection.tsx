import { CalculatorFilled } from '@ant-design/icons'
import { Button, type FormInstance, Space, Switch, Typography } from 'antd'
import { useAtom, useSetAtom } from 'jotai'
import { useCallback } from 'react'
import { calculateDamages } from '../../utils/calcDamage'
import { calcResultAtom, isColoredAtom } from './jotai'
import type { DamageCalculatorInputValue } from './types'

interface CalcButtonSectionProps {
	form: FormInstance<DamageCalculatorInputValue>
}

function CalcButtonSection(props: CalcButtonSectionProps) {
	const { form } = props
	const [isColored, setIsColored] = useAtom(isColoredAtom)
	const toggleIsColored = useCallback(() => {
		setIsColored((prev) => !prev)
	}, [setIsColored])
	const setResult = useSetAtom(calcResultAtom)
	const handleCalculate = useCallback(() => {
		const values = form.getFieldsValue()
		setResult(calculateDamages(values))
	}, [form, setResult])
	return (
		<Space style={{ marginBottom: 12 }}>
			<Button
				style={{ width: 'fit-content' }}
				type="primary"
				onClick={handleCalculate}
				icon={<CalculatorFilled />}
				iconPosition="end"
			>
				計算
			</Button>
			<Space>
				<Typography.Text>カード選択に色をつける</Typography.Text>
				<Switch value={isColored} onChange={toggleIsColored} />
			</Space>
		</Space>
	)
}

export default CalcButtonSection
