import {
	Collapse,
	Flex,
	Form,
	InputNumber,
	Space,
	Switch,
	Typography,
} from 'antd'
import { useAtom } from 'jotai'
import { useCallback } from 'react'
import styled from 'styled-components'
import SpaceCompactHeader from '../../components/SpaceCompactHeader'
import { isRequiredNpStarCalcAtom } from './jotai'

const StyledCollapse = styled(Collapse)`
  .ant-collapse-header {
    display: none !important;
  }
  .ant-collapse-content-box {
    padding: 0 !important;
  }
`

function BaseInfoNpStarSection() {
	const [isRequiredNpStarCalc, setIsRequiredNpStarCalc] = useAtom(
		isRequiredNpStarCalcAtom,
	)
	const toggleIsRequiredNpStarCalc = useCallback(() => {
		setIsRequiredNpStarCalc((prev) => !prev)
	}, [setIsRequiredNpStarCalc])
	return (
		<>
			<Space>
				<Typography.Text>NP・スター計算</Typography.Text>
				<Switch
					value={isRequiredNpStarCalc}
					onChange={toggleIsRequiredNpStarCalc}
				/>
			</Space>
			<StyledCollapse
				ghost
				activeKey={isRequiredNpStarCalc ? ['npStar'] : []}
				items={[
					{
						key: 'npStar',
						children: (
							<Flex vertical gap={12} align="flex-start">
								<Form.Item name="npGain">
									<InputNumber
										addonBefore="NP獲得量"
										addonAfter="%"
										type="number"
										style={{ width: 180 }}
									/>
								</Form.Item>
								<Form.Item name="starRate">
									<InputNumber
										addonBefore="スター発生率"
										addonAfter="%"
										type="number"
										style={{ width: 200 }}
									/>
								</Form.Item>
								<Space.Compact>
									<SpaceCompactHeader>Hit数</SpaceCompactHeader>
									<Form.Item name="hitCountN">
										<InputNumber
											type="number"
											addonBefore="N"
											style={{ width: 80 }}
										/>
									</Form.Item>
									<Form.Item name="hitCountB">
										<InputNumber
											type="number"
											addonBefore="B"
											style={{ width: 80 }}
										/>
									</Form.Item>
									<Form.Item name="hitCountA">
										<InputNumber
											type="number"
											addonBefore="A"
											style={{ width: 80 }}
										/>
									</Form.Item>
									<Form.Item name="hitCountQ">
										<InputNumber
											type="number"
											addonBefore="Q"
											style={{ width: 80 }}
										/>
									</Form.Item>
									<Form.Item name="hitCountEX">
										<InputNumber
											type="number"
											addonBefore="EX"
											style={{ width: 80 }}
										/>
									</Form.Item>
								</Space.Compact>
							</Flex>
						),
					},
				]}
			/>
		</>
	)
}

export default BaseInfoNpStarSection
