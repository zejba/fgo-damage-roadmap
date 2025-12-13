import styled from 'styled-components';
import { DamageCalcInputSection } from '../features/DamageCalculator/DamageCalcInputSection';
import ResultTable from '../features/DamageCalculator/ResultTable';
import CalcButtonSection from '../features/DamageCalculator/CalcButtonSection';
import AppliedBuffsTable from '../features/DamageCalculator/AppliedBuffsTable';
import { PageTitle } from '../components/PageTitle';
import { Drawer, useMediaQuery } from '@mui/material';
import { useAtomValue } from 'jotai';
import { isDrawerModeAtom } from '../store/jotai';

const Container = styled.div`
  display: flex;
  width: 100%;
  column-gap: 36px;
  row-gap: 8px;
  flex-direction: column;
  @media (min-width: 1480px) {
    flex-direction: row;
    height: calc(100vh - 148px);
  }
`;

const InputSection = styled.div`
  @media (min-width: 1480px) {
    min-width: 580px;
    overflow-y: auto;
    padding-left: 1px;
    padding-right: 8px; /* スクロールバーとの間隔 */
  }
`;

const ResultArea = styled.div`
  flex: 1;
  @media (min-width: 1480px) {
    max-height: 100%;
    overflow-y: auto;
    padding-right: 8px; /* スクロールバーとの間隔 */
    display: flex;
    flex-direction: column;
  }
`;

const CalcButtonContainer = styled.div`
  @media (min-width: 1480px) {
    position: sticky;
    bottom: 0;
    order: 2; /* 横並び時は下部に表示 */
    padding-top: 16px;
  }
`;

const ResultTableContainer = styled.div`
  @media (min-width: 1480px) {
    flex: 1;
    overflow-y: auto;
    order: 1; /* 横並び時は上部に表示 */
  }

  overflow-x: auto;
  padding-bottom: 8px;
`;

const TableWrapper = styled.div`
  min-width: fit-content;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 560px) {
    gap: 12px;
  }
`;

function ResultContent() {
  return (
    <>
      <CalcButtonContainer>
        <CalcButtonSection />
      </CalcButtonContainer>
      <ResultTableContainer>
        <TableWrapper>
          <ResultTable />
          <AppliedBuffsTable />
        </TableWrapper>
      </ResultTableContainer>
    </>
  );
}

function DamageCalculatorPage() {
  const isWide = useMediaQuery('(min-width:1480px)');
  const isDrawerMode = useAtomValue(isDrawerModeAtom);
  return (
    <>
      <PageTitle>ダメージ計算</PageTitle>
      <Container>
        <InputSection>
          <DamageCalcInputSection />
        </InputSection>
        {isWide || !isDrawerMode ? (
          <ResultArea>
            <ResultContent />
          </ResultArea>
        ) : (
          <Drawer
            variant="persistent"
            open
            anchor="bottom"
            sx={{
              height: '40vh',
              '& .MuiDrawer-paper': {
                height: '40vh',
                padding: '2px'
              }
            }}
          >
            <ResultContent />
          </Drawer>
        )}
      </Container>
    </>
  );
}

export default DamageCalculatorPage;
