import { Typography } from 'antd';
import styled from 'styled-components';
import { DamageCalcInputSection } from '../features/DamageCalculator/DamageCalcInputSection';
import ResultTable from '../features/DamageCalculator/ResultTable';
import CalcButtonSection from '../features/DamageCalculator/CalcButtonSection';

const Container = styled.div`
  display: flex;
  width: 100%;
  column-gap: 36px;
  row-gap: 8px;
  flex-direction: column;

  @media (min-width: 1480px) {
    flex-direction: row;
    height: calc(100vh - 120px); /* ヘッダーとタイトル分を差し引いた高さ */
  }
`;

const InputSection = styled.div`
  @media (min-width: 1480px) {
    flex: 0 0 auto;
    max-height: 100%;
    overflow-y: auto;
    padding-right: 8px; /* スクロールバーとの間隔 */
  }
`;

const ResultSection = styled.div`
  flex: 1;

  @media (min-width: 1480px) {
    max-height: 100%;
    overflow-y: auto;
    padding-right: 8px; /* スクロールバーとの間隔 */
    display: flex;
    flex-direction: column;
  }
`;

const CalcButtonWrapper = styled.div`
  order: 1; /* 縦並び時は上部に表示 */

  @media (min-width: 1480px) {
    position: sticky;
    bottom: 0;
    margin-top: 16px;
    order: 2; /* 横並び時は下部に表示 */
    background: white;
    z-index: 10;
    padding-top: 16px;
    border-top: 1px solid #f0f0f0;
  }
`;

const ResultTableWrapper = styled.div`
  order: 2; /* 縦並び時は下部に表示 */

  @media (min-width: 1480px) {
    flex: 1;
    overflow-y: auto;
    order: 1; /* 横並び時は上部に表示 */
  }

  @media (max-width: 780px) {
    .ant-table-cell {
      font-size: 12px !important;
    }
  }
`;

function DamageCalculatorPage() {
  return (
    <>
      <Typography.Title level={3} style={{ marginTop: 4 }}>
        ダメージ計算
      </Typography.Title>
      <Container>
        <InputSection>
          <DamageCalcInputSection />
        </InputSection>
        <ResultSection>
          <CalcButtonWrapper>
            <CalcButtonSection />
          </CalcButtonWrapper>
          <ResultTableWrapper>
            <ResultTable />
          </ResultTableWrapper>
        </ResultSection>
      </Container>
    </>
  );
}

export default DamageCalculatorPage;
