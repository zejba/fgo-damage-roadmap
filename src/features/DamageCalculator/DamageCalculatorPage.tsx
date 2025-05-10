import { Typography } from 'antd'
import CalcInputSection from './CalcInputSection'
import ResultTable from './ResultTable'

function DamageCalculatorPage() {
	return (
		<>
			<Typography.Title>ダメージ計算</Typography.Title>
			<CalcInputSection />
			<ResultTable />
		</>
	)
}

export default DamageCalculatorPage
