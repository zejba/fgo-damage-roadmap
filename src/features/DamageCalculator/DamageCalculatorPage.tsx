import { Typography } from 'antd';
import { DamageCalcInputSection } from './DamageCalcInputSection';
import ResultTable from './ResultTable';

function DamageCalculatorPage() {
  return (
    <>
      <Typography.Title level={3} style={{ marginTop: 4 }}>
        ダメージ計算
      </Typography.Title>
      <DamageCalcInputSection />
      <ResultTable />
    </>
  );
}

export default DamageCalculatorPage;
