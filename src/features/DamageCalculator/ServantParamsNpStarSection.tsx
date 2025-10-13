import { Space, Switch } from 'antd';
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
      <InputNumber value={hitCountN} onValueChange={setHitCountN} style={{ width: 60 }} />
      <CompactItemText>B</CompactItemText>
      <InputNumber value={hitCountB} onValueChange={setHitCountB} style={{ width: 60 }} />
      <CompactItemText>A</CompactItemText>
      <InputNumber value={hitCountA} onValueChange={setHitCountA} style={{ width: 60 }} />
      <CompactItemText>Q</CompactItemText>
      <InputNumber value={hitCountQ} onValueChange={setHitCountQ} style={{ width: 60 }} />
      <CompactItemText>EX</CompactItemText>
      <InputNumber value={hitCountEX} onValueChange={setHitCountEX} style={{ width: 60 }} />
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
        NP・スター計算
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
