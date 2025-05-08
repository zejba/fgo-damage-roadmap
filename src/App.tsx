import { ConfigProvider, type ThemeConfig } from 'antd'
import DamageCalculatorPage from './features/DamageCalculator/DamageCalculatorPage'

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
	},
	token: {
		colorBorder: '#BFBFBF',
	},
}

function App() {
	return (
		<ConfigProvider theme={theme}>
			<DamageCalculatorPage />
		</ConfigProvider>
	)
}

export default App
