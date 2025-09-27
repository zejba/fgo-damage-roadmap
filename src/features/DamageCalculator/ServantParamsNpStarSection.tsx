import { Flex, InputNumber, Space, Switch, Typography } from 'antd';
import { useAtom } from 'jotai';
import { useCallback } from 'react';
import CollapseWithOutHeader from '../../components/CollapseWithOutHeader';
import SpaceCompactHeader from '../../components/SpaceCompactHeader';

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

function NpGainRow() {
  const [npGain, setNpGain] = useAtom(npGainAtom);
  return (
    <InputNumber
      addonBefore="NP獲得量"
      addonAfter="%"
      type="number"
      style={{ width: 180 }}
      value={npGain}
      onChange={setNpGain}
    />
  );
}

function StarRateRow() {
  const [starRate, setStarRate] = useAtom(starRateAtom);
  return (
    <InputNumber
      addonBefore="スター発生率"
      addonAfter="%"
      type="number"
      style={{ width: 200 }}
      value={starRate}
      onChange={setStarRate}
    />
  );
}

function HitCountRow() {
  const [hitCountN, setHitCountN] = useAtom(hitCountNAtom);
  const [hitCountB, setHitCountB] = useAtom(hitCountBAtom);
  const [hitCountA, setHitCountA] = useAtom(hitCountAAtom);
  const [hitCountQ, setHitCountQ] = useAtom(hitCountQAtom);
  const [hitCountEX, setHitCountEX] = useAtom(hitCountEXAtom);
  return (
    <Space.Compact>
      <SpaceCompactHeader>Hit数</SpaceCompactHeader>
      <InputNumber type="number" addonBefore="N" style={{ width: 80 }} value={hitCountN} onChange={setHitCountN} />
      <InputNumber type="number" addonBefore="B" style={{ width: 80 }} value={hitCountB} onChange={setHitCountB} />
      <InputNumber type="number" addonBefore="A" style={{ width: 80 }} value={hitCountA} onChange={setHitCountA} />
      <InputNumber type="number" addonBefore="Q" style={{ width: 80 }} value={hitCountQ} onChange={setHitCountQ} />
      <InputNumber type="number" addonBefore="EX" style={{ width: 80 }} value={hitCountEX} onChange={setHitCountEX} />
    </Space.Compact>
  );
}

function ServantParamsNpStarSection() {
  const [isRequiredNpStarCalc, setIsRequiredNpStarCalc] = useAtom(isRequiredNpStarCalcAtom);
  const toggleIsRequiredNpStarCalc = useCallback(() => {
    setIsRequiredNpStarCalc((prev) => !prev);
  }, [setIsRequiredNpStarCalc]);
  return (
    <>
      <Space>
        <Typography.Text>NP・スター計算</Typography.Text>
        <Switch value={isRequiredNpStarCalc} onChange={toggleIsRequiredNpStarCalc} />
      </Space>
      <CollapseWithOutHeader isActive={isRequiredNpStarCalc}>
        <Flex vertical gap={12} align="flex-start">
          <NpGainRow />
          <StarRateRow />
          <HitCountRow />
        </Flex>
      </CollapseWithOutHeader>
    </>
  );
}

export default ServantParamsNpStarSection;
