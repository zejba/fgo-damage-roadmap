import { CalculatorFilled } from '@ant-design/icons'
import { Button, type FormInstance, Space, Switch, Typography } from 'antd'
import { useAtom, useSetAtom } from 'jotai'
import { useCallback } from 'react'
import type { DamageCalculatorInputValue } from '../../data/types'
import { calcResultAtom, isColoredAtom } from '../../store/jotai'
import { calculateDamages } from '../../utils/calcDamage'

function CalcButtonSection() {
	const [isColored, setIsColored] = useAtom(isColoredAtom)
	const toggleIsColored = useCallback(() => {
		setIsColored((prev) => !prev)
	}, [setIsColored])
	const setResult = useSetAtom(calcResultAtom)
	const handleCalculate = useCallback(() => {
		// setResult(calculateDamages())
	}, [])
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
