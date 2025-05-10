import { ConfigProvider, type ThemeConfig } from 'antd'
import DamageCalculatorPage from './features/DamageCalculator/DamageCalculatorPage'
import Layout from './features/Layout'

const theme: ThemeConfig = {
	components: {
		Form: {
			itemMarginBottom: 0,
		},
		Card: {
			colorBorderSecondary: '#BFBFBF',
			extraColor: 'red',
			headerBg: '#F0F0F0',
			bodyPadding: 12,
			padding: 12,
		},
		Input: {
			paddingInline: 8,
		},
		InputNumber: {
			paddingInline: 8,
		},
		Table: {
			borderColor: '#BFBFBF',
		},
	},
	token: {
		colorBorder: '#BFBFBF',
	},
}

function App() {
	return (
		<ConfigProvider theme={theme}>
			<Layout>
				<DamageCalculatorPage />
			</Layout>
		</ConfigProvider>
	)
}

export default App
