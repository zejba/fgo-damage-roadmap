import { Space, Switch, Typography } from 'antd';
import { useAtom } from 'jotai';
import { useCallback } from 'react';
import CollapseWithOutHeader from '../../components/CollapseWithOutHeader';

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

function NpGainRow() {
  const [npGain, setNpGain] = useAtom(npGainAtom);
  return (
    <Compact style={{ width: 200 }}>
      <CompactItemText>NP獲得量</CompactItemText>
      <InputNumber value={npGain} onValueChange={setNpGain} />
      <CompactItemText>%</CompactItemText>
    </Compact>
  );
}

function StarRateRow() {
  const [starRate, setStarRate] = useAtom(starRateAtom);
  return (
    <Compact style={{ width: 200 }}>
      <CompactItemText>スター発生率</CompactItemText>
      <InputNumber value={starRate} onValueChange={setStarRate} />
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
    <Compact style={{ width: 520 }}>
      <CompactItemText>Hit数</CompactItemText>
      <CompactItemText>N</CompactItemText>
      <InputNumber value={hitCountN} onValueChange={setHitCountN} />
      <CompactItemText>B</CompactItemText>
      <InputNumber value={hitCountB} onValueChange={setHitCountB} />
      <CompactItemText>A</CompactItemText>
      <InputNumber value={hitCountA} onValueChange={setHitCountA} />
      <CompactItemText>Q</CompactItemText>
      <InputNumber value={hitCountQ} onValueChange={setHitCountQ} />
      <CompactItemText>EX</CompactItemText>
      <InputNumber value={hitCountEX} onValueChange={setHitCountEX} />
    </Compact>
  );
}

function ServantParamsNpStarSection() {
  const [isRequiredNpStarCalc, setIsRequiredNpStarCalc] = useAtom(isRequiredNpStarCalcAtom);
  const toggleIsRequiredNpStarCalc = useCallback(() => {
    setIsRequiredNpStarCalc((prev) => !prev);
  }, [setIsRequiredNpStarCalc]);
  return (
    <div>
      <Space>
        <Typography.Text>NP・スター計算</Typography.Text>
        <Switch value={isRequiredNpStarCalc} onChange={toggleIsRequiredNpStarCalc} />
      </Space>
      <CollapseWithOutHeader isActive={isRequiredNpStarCalc}>
        <FormContainer style={{ marginTop: 8 }}>
          <NpGainRow />
          <StarRateRow />
          <HitCountRow />
        </FormContainer>
      </CollapseWithOutHeader>
    </div>
  );
}

export default ServantParamsNpStarSection;
