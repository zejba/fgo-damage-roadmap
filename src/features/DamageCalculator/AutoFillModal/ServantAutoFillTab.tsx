import { Button, Checkbox, message, Select, Space, Typography } from 'antd';
import { useAtom } from 'jotai';
import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { GOLD_ATK_FOU_MAX, GRAND_SERVANT_ATK_BONUS, SILVER_ATK_FOU_MAX } from '../../../data/constants';
import {
  craftEssenceAtkAtom,
  footprintAAtom,
  footprintBAtom,
  footprintQAtom,
  hasFootPrintAtom,
  hasGoldenFouAtkAtom,
  hitCountAAtom,
  hitCountBAtom,
  hitCountEXAtom,
  hitCountNAtom,
  hitCountQAtom,
  isGrandServantAtom,
  isLv120Atom,
  npColorAtom,
  npGainAtom,
  npValueAtom,
  servantAtkAtom,
  servantAttributeAtom,
  servantClassAtom,
  servantIndexAtom,
  starRateAtom
} from '../../../store/servantParams';
import { FormContainer } from '../../../components/FormContainer';
import { startingBuffsAtom } from '../../../store/startingBuffs';
import { v4 } from 'uuid';
import { localizedServantClass } from '../../../data/options';
import servantData from '../../../data/servant_data';

const servantOptions = servantData.map((servant, index) => ({
  value: index,
  label: `${servant.collectionNo}. ${servant.name} (${localizedServantClass[servant.className]})`
}));

export function ServantAutoFillTab() {
  const [servantIndex, setServantIndex] = useAtom(servantIndexAtom);
  const [isLv120, setIsLv120] = useAtom(isLv120Atom);
  const [hasGoldFou, setHasGoldFou] = useAtom(hasGoldenFouAtkAtom);
  const [hasFootprint, setHasFootprint] = useAtom(hasFootPrintAtom);
  const [isGrandServant, setIsGrandServant] = useAtom(isGrandServantAtom);

  const handlePerfection = useCallback(() => {
    setIsLv120(true);
    setHasGoldFou(true);
    setHasFootprint(true);
    setIsGrandServant(true);
  }, [setHasFootprint, setHasGoldFou, setIsLv120, setIsGrandServant]);

  const handleSubmit = useAtomCallback(
    useCallback((get, set) => {
      const servantIndex = get(servantIndexAtom);
      const isLv120 = get(isLv120Atom);
      const hasGoldFou = get(hasGoldenFouAtkAtom);
      const hasFootprint = get(hasFootPrintAtom);
      const isGrandServant = get(isGrandServantAtom);
      const servant = servantData[servantIndex ?? 0];
      if (servantIndex === null || !servant) {
        return;
      }

      const atk =
        SILVER_ATK_FOU_MAX +
        (isLv120 ? Number(servant.atk120) : Number(servant.atkMax)) +
        (hasGoldFou ? GOLD_ATK_FOU_MAX : 0) +
        (isGrandServant ? GRAND_SERVANT_ATK_BONUS : 0);
      const footPrintValue = hasFootprint ? 500 : 0;

      set(servantClassAtom, servant.className);
      set(servantAttributeAtom, servant.attribute);
      set(servantAtkAtom, atk);
      set(craftEssenceAtkAtom, SILVER_ATK_FOU_MAX);
      set(npColorAtom, servant.noblePhantasm.card);
      set(npValueAtom, servant.noblePhantasm.value);
      set(npGainAtom, servant.npGain);
      set(starRateAtom, servant.starGen);
      set(hitCountNAtom, servant.hitCounts.np);
      set(hitCountBAtom, servant.hitCounts.buster);
      set(hitCountAAtom, servant.hitCounts.arts);
      set(hitCountQAtom, servant.hitCounts.quick);
      set(hitCountEXAtom, servant.hitCounts.extra);
      set(footprintBAtom, footPrintValue);
      set(footprintAAtom, footPrintValue);
      set(footprintQAtom, footPrintValue);
      set(
        startingBuffsAtom,
        servant.classPassive.map((buff) => ({
          id: v4(),
          name: 'クラススキル',
          type: buff.type,
          amount: buff.value,
          turn: buff.turn === -1 ? null : buff.turn,
          count: buff.count === -1 ? null : buff.count
        }))
      );

      message.success(`${servant.name}の情報を入力しました`);
    }, [])
  );

  return (
    <FormContainer>
      <Select
        placeholder="サーヴァント名"
        options={servantOptions}
        showSearch
        optionFilterProp="label"
        value={servantIndex}
        onChange={setServantIndex}
        style={{ width: 400, maxWidth: '100%' }}
      />
      <Space>
        <Button onClick={handlePerfection}>完全体</Button>(
        <Checkbox checked={isLv120} onChange={(e) => setIsLv120(e.target.checked)}>
          Lv.120
        </Checkbox>
        <Checkbox checked={hasGoldFou} onChange={(e) => setHasGoldFou(e.target.checked)}>
          金フォウ
        </Checkbox>
        <Checkbox checked={hasFootprint} onChange={(e) => setHasFootprint(e.target.checked)}>
          足跡
        </Checkbox>
        <Checkbox checked={isGrandServant} onChange={(e) => setIsGrandServant(e.target.checked)}>
          グランド
        </Checkbox>
        )
      </Space>
      <Typography.Text>※ ATK銀フォウ込みで入力されます</Typography.Text>
      <Button type="primary" onClick={handleSubmit} disabled={servantIndex === null} style={{ marginTop: 16 }}>
        入力
      </Button>
    </FormContainer>
  );
}
