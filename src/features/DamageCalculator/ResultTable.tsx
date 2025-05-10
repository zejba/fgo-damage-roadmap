import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useAtomValue } from 'jotai'
import { useMemo } from 'react'
import type { ProcessedTurnResult } from '../../utils/calcDamage'
import { calcResultAtom } from './jotai'

type RecordType = {
	key: string
	turn: string | null
	first: string
	second: string
	third: string
	ex: string
	total: string
	targetDamage: string | null
	passRate: string | null
}

const columns: ColumnsType<RecordType> = [
	{
		title: 'ターン',
		dataIndex: 'turn',
		key: 'turn',
		onCell: (record) => {
			return {
				rowSpan: record.turn ? 4 : 0,
			}
		},
	},
	{
		title: '1st',
		dataIndex: 'first',
		key: 'first',
		onCell: (record) => {
			return record.turn
				? {
						style: {
							backgroundColor: '#F0F0F0',
						},
					}
				: {}
		},
	},
	{
		title: '2nd',
		dataIndex: 'second',
		key: 'second',
		onCell: (record) => {
			return record.turn
				? {
						style: {
							backgroundColor: '#F0F0F0',
						},
					}
				: {}
		},
	},
	{
		title: '3rd',
		dataIndex: 'third',
		key: 'third',
		onCell: (record) => {
			return record.turn
				? {
						style: {
							backgroundColor: '#F0F0F0',
						},
					}
				: {}
		},
	},
	{
		title: 'EX',
		dataIndex: 'ex',
		key: 'ex',
	},
	{
		title: 'total',
		dataIndex: 'total',
		key: 'total',
	},
	{
		title: '目標ダメ',
		dataIndex: 'targetDamage',
		key: 'targetDamage',
		onCell: (record) => {
			return {
				rowSpan: record.targetDamage === '-' ? 1 : record.targetDamage ? 3 : 0,
			}
		},
	},
	{
		title: '撃破率',
		dataIndex: 'passRate',
		key: 'passRate',
		onCell: (record) => {
			return {
				rowSpan: record.passRate === '-' ? 1 : record.passRate ? 3 : 0,
			}
		},
	},
]

function buildDataSource(result: ProcessedTurnResult[]): RecordType[] {
	return result.flatMap((turnResult, turnIndex) => {
		const {
			selectedCards,
			damage90,
			damage100,
			damage110,
			passRate,
			targetDamage,
		} = turnResult
		return [
			{
				key: `${turnIndex + 1}-1`,
				turn: `${turnIndex + 1}T`,
				first: selectedCards[0].toString(),
				second: selectedCards[1].toString(),
				third: selectedCards[2].toString(),
				ex: '-',
				total: '-',
				targetDamage: '-',
				passRate: '-',
			},
			{
				key: `${turnIndex + 1}-2`,
				turn: null,
				first: damage90[0].toString(),
				second: damage90[1].toString(),
				third: damage90[2].toString(),
				ex: damage90[3].toString(),
				total: damage90[4].toString(),
				targetDamage: targetDamage.toString(),
				passRate: `${passRate}%`,
			},
			{
				key: `${turnIndex + 1}-3`,
				turn: null,
				first: damage100[0].toString(),
				second: damage100[1].toString(),
				third: damage100[2].toString(),
				ex: damage100[3].toString(),
				total: damage100[4].toString(),
				targetDamage: null,
				passRate: null,
			},
			{
				key: `${turnIndex + 1}-4`,
				turn: null,
				first: damage110[0].toString(),
				second: damage110[1].toString(),
				third: damage110[2].toString(),
				ex: damage110[3].toString(),
				total: damage110[4].toString(),
				targetDamage: null,
				passRate: null,
			},
		]
	})
}

function ResultTable() {
	const result = useAtomValue(calcResultAtom)
	const dataSource = useMemo(() => buildDataSource(result), [result])
	return (
		<>
			<Table
				columns={columns}
				dataSource={dataSource}
				pagination={false}
				rowHoverable={false}
				bordered
				style={{ maxWidth: 1500 }}
			/>
		</>
	)
}

export default ResultTable
