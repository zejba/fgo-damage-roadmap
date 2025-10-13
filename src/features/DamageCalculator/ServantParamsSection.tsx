import { DatabaseOutlined } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';
import { useAtom } from 'jotai';
import SpaceCompactHeader from '../../components/SpaceCompactHeader';
import { cardColors, servantAttributes, servantClasses } from '../../data/options';
import { useBoolean } from '../../hooks/useBoolean';
import {
  craftEssenceAtkAtom,
  footprintAAtom,
  footprintBAtom,
  footprintQAtom,
  npColorAtom,
  npValueAtom,
  servantAtkAtom,
  servantAttributeAtom,
  servantClassAtom,
  titleAtom
} from '../../store/servantParams';
import AutoFillModal from './AutoFillModal/AutoFillModal';
import ServantParamsNpStarSection from './ServantParamsNpStarSection';
import { Card } from '../../components/Card';
import { FormContainer } from '../../components/FormContainer';
import { SaveLoadButtonSection } from './SaveLoadButtonSection';
import { Select } from '../../components/Select';
import { Compact } from '../../components/Compact';
import { InputNumber } from '../../components/InputNumber';
import { CompactItemText } from '../../components/CompactItemText';

// タイトル・クラス・属性
function TitleClassAttributeRow() {
  const [title, setTitle] = useAtom(titleAtom);
  const [servantClass, setServantClass] = useAtom(servantClassAtom);
  const [servantAttribute, setServantAttribute] = useAtom(servantAttributeAtom);
  return (
    <Compact style={{ width: 400 }}>
      <Input placeholder="タイトル" value={title} onChange={(e) => setTitle(e.target.value)} />
      <Select options={servantClasses} style={{ width: 60 }} value={servantClass} onValueChange={setServantClass} />
      <Select
        options={servantAttributes}
        style={{ width: 60 }}
        value={servantAttribute}
        onValueChange={setServantAttribute}
      />
    </Compact>
  );
}

// ATK
function ServantAtkRow() {
  const [servantAtk, setServantAtk] = useAtom(servantAtkAtom);
  return (
    <Compact>
      <SpaceCompactHeader>ATK</SpaceCompactHeader>
      <InputNumber style={{ width: 140 }} value={servantAtk} onValueChange={setServantAtk} />
    </Compact>
  );
}

// 礼装ATK
function CraftEssenceAtkRow() {
  const [craftEssenceAtk, setCraftEssenceAtk] = useAtom(craftEssenceAtkAtom);
  return (
    <Compact>
      <SpaceCompactHeader>礼装ATK</SpaceCompactHeader>
      <InputNumber style={{ width: 160 }} value={craftEssenceAtk} onValueChange={setCraftEssenceAtk} />
      <Button onClick={() => setCraftEssenceAtk(2000)}>2000</Button>
      <Button onClick={() => setCraftEssenceAtk(2400)}>2400</Button>
      <Button onClick={() => setCraftEssenceAtk(1000)}>1000</Button>
    </Compact>
  );
}

// 宝具
function NoblePhantasmRow() {
  const [npColor, setNpColor] = useAtom(npColorAtom);
  const [npValue, setNpValue] = useAtom(npValueAtom);
  return (
    <Compact>
      <SpaceCompactHeader>宝具</SpaceCompactHeader>
      <Select options={cardColors} style={{ width: 60 }} value={npColor} onValueChange={setNpColor} />
      <InputNumber style={{ width: 120 }} value={npValue} onValueChange={setNpValue} />
      <CompactItemText>%</CompactItemText>
    </Compact>
  );
}

// 足跡
function FootprintRow() {
  const [footprintB, setFootprintB] = useAtom(footprintBAtom);
  const [footprintA, setFootprintA] = useAtom(footprintAAtom);
  const [footprintQ, setFootprintQ] = useAtom(footprintQAtom);
  return (
    <Compact>
      <SpaceCompactHeader>足跡</SpaceCompactHeader>
      <CompactItemText>B</CompactItemText>
      <InputNumber max={500} min={0} value={footprintB} onValueChange={setFootprintB} />
      <CompactItemText>A</CompactItemText>
      <InputNumber style={{ width: 92 }} max={500} min={0} value={footprintA} onValueChange={setFootprintA} />
      <CompactItemText>Q</CompactItemText>
      <InputNumber style={{ width: 92 }} max={500} min={0} value={footprintQ} onValueChange={setFootprintQ} />
    </Compact>
  );
}

function AutoFillServantParamsModalSection() {
  const [isServantModalOpen, openServantModal, closeServantModal] = useBoolean(false);
  return (
    <>
      <Button onClick={openServantModal} icon={<DatabaseOutlined />}>
        自動入力
      </Button>
      <AutoFillModal open={isServantModalOpen} closeModal={closeServantModal} />
    </>
  );
}

export function ServantParamsSection() {
  return (
    <Card title="基本情報" style={{ width: '100%' }}>
      <FormContainer>
        <Space>
          <AutoFillServantParamsModalSection />
          <SaveLoadButtonSection />
        </Space>
        <TitleClassAttributeRow />
        <ServantAtkRow />
        <CraftEssenceAtkRow />
        <NoblePhantasmRow />
        <FootprintRow />
        <ServantParamsNpStarSection />
      </FormContainer>
    </Card>
  );
}
