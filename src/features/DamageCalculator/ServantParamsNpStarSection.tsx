import { useAtom } from 'jotai';
import { useCallback } from 'react';

import { isRequiredNpStarCalcAtom } from '../../store/jotai';
import {
  hitCountAAtom,
  hitCountBAtom,
  hitCountEXAtom,
  hitCountNAtom,
  hitCountQAtom,
  npGainAtom,
  starRateAtom
} from '../../store/servantParams';
import { FormContainer } from '../../components/FormContainer';
import { Compact } from '../../components/Compact';
import { CompactItemText } from '../../components/CompactItemText';
import { InputNumber } from '../../components/InputNumber';
import styled from 'styled-components';
import { Collapse, Switch } from '@mui/material';

function NpGainRow() {
  const [npGain, setNpGain] = useAtom(npGainAtom);
  return (
    <Compact>
      <CompactItemText>NP獲得量</CompactItemText>
      <InputNumber value={npGain} onValueChange={setNpGain} style={{ width: 80 }} />
      <CompactItemText>%</CompactItemText>
    </Compact>
  );
}

function StarRateRow() {
  const [starRate, setStarRate] = useAtom(starRateAtom);
  return (
    <Compact style={{ width: 300 }}>
      <CompactItemText>スター発生率</CompactItemText>
      <InputNumber value={starRate} onValueChange={setStarRate} style={{ width: 80 }} />
      <CompactItemText>%</CompactItemText>
    </Compact>
  );
}

function HitCountRow() {
  const [hitCountN, setHitCountN] = useAtom(hitCountNAtom);
  const [hitCountB, setHitCountB] = useAtom(hitCountBAtom);
  const [hitCountA, setHitCountA] = useAtom(hitCountAAtom);
  const [hitCountQ, setHitCountQ] = useAtom(hitCountQAtom);
  const [hitCountEX, setHitCountEX] = useAtom(hitCountEXAtom);
  return (
    <Compact>
      <CompactItemText>Hit数</CompactItemText>
      <CompactItemText>N</CompactItemText>
      <InputNumber value={hitCountN} onValueChange={setHitCountN} style={{ width: 40 }} />
      <CompactItemText>B</CompactItemText>
      <InputNumber value={hitCountB} onValueChange={setHitCountB} style={{ width: 40 }} />
      <CompactItemText>A</CompactItemText>
      <InputNumber value={hitCountA} onValueChange={setHitCountA} style={{ width: 40 }} />
      <CompactItemText>Q</CompactItemText>
      <InputNumber value={hitCountQ} onValueChange={setHitCountQ} style={{ width: 40 }} />
      <CompactItemText>EX</CompactItemText>
      <InputNumber value={hitCountEX} onValueChange={setHitCountEX} style={{ width: 40 }} />
    </Compact>
  );
}

const ToggleWrapper = styled.label`
  width: fit-content;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-left: 8px;
  @media (max-width: 560px) {
    font-size: 0.75em;
  }
`;

function ServantParamsNpStarSection() {
  const [isRequiredNpStarCalc, setIsRequiredNpStarCalc] = useAtom(isRequiredNpStarCalcAtom);
  const toggleIsRequiredNpStarCalc = useCallback(() => {
    setIsRequiredNpStarCalc((prev) => !prev);
  }, [setIsRequiredNpStarCalc]);
  return (
    <>
      <ToggleWrapper>
        NP・スター計算
        <Switch checked={isRequiredNpStarCalc} onChange={toggleIsRequiredNpStarCalc} />
      </ToggleWrapper>
      <Collapse in={isRequiredNpStarCalc}>
        <FormContainer style={{ marginTop: 8 }}>
          <NpGainRow />
          <StarRateRow />
          <HitCountRow />
        </FormContainer>
      </Collapse>
    </>
  );
}

export default ServantParamsNpStarSection;
