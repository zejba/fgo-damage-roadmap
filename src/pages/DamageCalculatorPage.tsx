import { Typography } from 'antd';
import { DamageCalcInputSection } from '../features/DamageCalculator/DamageCalcInputSection';
import ResultTable from '../features/DamageCalculator/ResultTable';

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
