import { Typography } from 'antd';
import styled from 'styled-components';
import { DamageCalcInputSection } from '../features/DamageCalculator/DamageCalcInputSection';
import ResultTable from '../features/DamageCalculator/ResultTable';
import CalcButtonSection from '../features/DamageCalculator/CalcButtonSection';
import AppliedBuffsTable from '../features/DamageCalculator/AppliedBuffsTable';

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
    min-width: 580px;
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
    order: 2; /* 横並び時は下部に表示 */
    padding-top: 16px;
  }
`;

const ResultTablesWrapper = styled.div`
  order: 2; /* 縦並び時は下部に表示 */

  @media (min-width: 1480px) {
    flex: 1;
    overflow-y: auto;
    order: 1; /* 横並び時は上部に表示 */
  }

  overflow-x: auto;
  margin-bottom: 16px;
`;

const TableWrapper = styled.div`
  min-width: fit-content;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: fit-content;

  @media (max-width: 780px) {
    gap: 12px;
    .ant-table-cell {
      font-size: 0.55rem !important;
      font-weight: bold;
      padding: 8px 4px !important;
    }
    .ant-table-footer {
      padding: 8px !important;
    }
  }
`;
function DamageCalculatorPage() {
  return (
    <>
      <Typography.Title level={3} style={{ marginTop: 4, marginLeft: 8 }}>
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
          <ResultTablesWrapper>
            <TableWrapper>
              <ResultTable />
              <AppliedBuffsTable />
            </TableWrapper>
          </ResultTablesWrapper>
        </ResultSection>
      </Container>
    </>
  );
}

export default DamageCalculatorPage;
