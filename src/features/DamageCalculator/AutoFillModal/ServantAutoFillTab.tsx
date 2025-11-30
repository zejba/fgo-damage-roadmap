import { useAtom } from 'jotai';
import { useSnackbar } from '../../../hooks/useSnackbarContext';
import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { GOLD_ATK_FOU_MAX, GRAND_SERVANT_ATK_BONUS, SILVER_ATK_FOU_MAX } from '../../../data/constants';
import {
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
import { PrimaryOutlinedButton } from '../../../components/Button.tsx/PrimaryOutlinedButton';
import { Autocomplete, TextField } from '@mui/material';
import { styled } from 'styled-components';

const servantOptions = servantData.map((servant) => ({
  value: servant.id,
  label: `${servant.collectionNo}. ${servant.name}${servant.anotherVersionName ? ` [${servant.anotherVersionName}]` : ''} (${localizedServantClass[servant.className]})`
}));

const CheckBoxWrapper = styled.label`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  * {
    cursor: pointer;
  }
`;

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

  const snackbar = useSnackbar();

  const handleSubmit = useAtomCallback(
    useCallback(
      (get, set) => {
        const servantIndex = get(servantIndexAtom);
        const isLv120 = get(isLv120Atom);
        const hasGoldFou = get(hasGoldenFouAtkAtom);
        const hasFootprint = get(hasFootPrintAtom);
        const isGrandServant = get(isGrandServantAtom);
        const servant = servantData.find((s) => s.id === servantIndex);
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
            turn: buff.turn,
            count: buff.count
          }))
        );

        snackbar.success(`${servant.name}の情報を入力しました`);
      },
      [snackbar]
    )
  );

  return (
    <FormContainer>
      <Autocomplete
        options={servantOptions}
        getOptionLabel={(option) => option.label}
        renderInput={(params) => <TextField {...params} size="small" style={{ width: 300 }} label="サーヴァント選択" />}
        value={servantIndex ? servantOptions.find((option) => option.value === servantIndex) || null : null}
        onChange={(_event, newValue) => {
          setServantIndex(newValue ? newValue.value : null);
        }}
      />
      <CheckBoxWrapper>
        <input type="checkbox" checked={isLv120} onChange={(e) => setIsLv120(e.target.checked)} />
        Lv.120
      </CheckBoxWrapper>
      <CheckBoxWrapper>
        <input type="checkbox" checked={hasGoldFou} onChange={(e) => setHasGoldFou(e.target.checked)} />
        金フォウ
      </CheckBoxWrapper>
      <CheckBoxWrapper>
        <input type="checkbox" checked={hasFootprint} onChange={(e) => setHasFootprint(e.target.checked)} />
        足跡
      </CheckBoxWrapper>
      <CheckBoxWrapper>
        <input type="checkbox" checked={isGrandServant} onChange={(e) => setIsGrandServant(e.target.checked)} />
        グランド
      </CheckBoxWrapper>
      <PrimaryOutlinedButton onClick={handlePerfection}>すべて選択</PrimaryOutlinedButton>※
      ATK銀フォウ込みで入力されます
      <PrimaryOutlinedButton onClick={handleSubmit} disabled={servantIndex === null}>
        入力
      </PrimaryOutlinedButton>
    </FormContainer>
  );
}
