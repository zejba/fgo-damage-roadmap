import { Form, Typography } from 'antd'
import CalcInputSection from './CalcInputSection'
import ResultTable from './ResultTable'
import type { DamageCalculatorInputValue } from './types'

function DamageCalculatorPage() {
	const [form] = Form.useForm<DamageCalculatorInputValue>()
	return (
		<>
			<Typography.Title level={3}>ダメージ計算</Typography.Title>
			<CalcInputSection form={form} />
			<ResultTable />
		</>
	)
}

export default DamageCalculatorPage
