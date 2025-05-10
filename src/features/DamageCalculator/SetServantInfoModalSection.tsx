import { DatabaseOutlined } from '@ant-design/icons'
import { Button, type FormInstance } from 'antd'
import { useBoolean } from '../../hooks/useBoolean'
import SetServantInfoModal from './SetServantInfoModal'
import type { DamageCalculatorInputValue } from './types'

type Props = {
	form: FormInstance<DamageCalculatorInputValue>
}

function SetServantInfoModalSection(props: Props) {
	const { form } = props
	const [isServantModalOpen, openServantModal, closeServantModal] =
		useBoolean(false)
	return (
		<>
			<Button onClick={openServantModal} icon={<DatabaseOutlined />}>
				自動入力
			</Button>
			<SetServantInfoModal
				form={form}
				open={isServantModalOpen}
				closeModal={closeServantModal}
			/>
		</>
	)
}

export default SetServantInfoModalSection
