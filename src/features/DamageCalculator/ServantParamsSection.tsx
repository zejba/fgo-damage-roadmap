import { DatabaseOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import { useAtom } from 'jotai';
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
import { Input } from '../../components/Input';
import { PrimaryOutlinedButton } from '../../components/Button.tsx/PrimaryOutlinedButton';

// タイトル・クラス・属性
function TitleClassAttributeRow() {
  const [title, setTitle] = useAtom(titleAtom);
  const [servantClass, setServantClass] = useAtom(servantClassAtom);
  const [servantAttribute, setServantAttribute] = useAtom(servantAttributeAtom);
  return (
    <Compact>
      <Input placeholder="タイトル" style={{ width: 300 }} value={title} onChange={(e) => setTitle(e.target.value)} />
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
      <CompactItemText>ATK</CompactItemText>
      <InputNumber style={{ width: 100 }} value={servantAtk} onValueChange={setServantAtk} />
    </Compact>
  );
}

// 礼装ATK
function CraftEssenceAtkRow() {
  const [craftEssenceAtk, setCraftEssenceAtk] = useAtom(craftEssenceAtkAtom);
  return (
    <Compact>
      <CompactItemText>礼装ATK</CompactItemText>
      <InputNumber style={{ width: 100 }} value={craftEssenceAtk} onValueChange={setCraftEssenceAtk} />
      <PrimaryOutlinedButton style={{ borderRadius: '0', borderLeft: 'none' }} onClick={() => setCraftEssenceAtk(2000)}>
        2000
      </PrimaryOutlinedButton>
      <PrimaryOutlinedButton style={{ borderRadius: '0', borderLeft: 'none' }} onClick={() => setCraftEssenceAtk(2400)}>
        2400
      </PrimaryOutlinedButton>
      <PrimaryOutlinedButton
        style={{ borderRadius: 0, borderLeft: 'none', borderTopRightRadius: 4, borderBottomRightRadius: 4 }}
        onClick={() => setCraftEssenceAtk(1000)}
      >
        1000
      </PrimaryOutlinedButton>
    </Compact>
  );
}

// 宝具
function NoblePhantasmRow() {
  const [npColor, setNpColor] = useAtom(npColorAtom);
  const [npValue, setNpValue] = useAtom(npValueAtom);
  return (
    <Compact>
      <CompactItemText>宝具</CompactItemText>
      <Select options={cardColors} style={{ width: 60 }} value={npColor} onValueChange={setNpColor} />
      <InputNumber style={{ width: 80 }} value={npValue} onValueChange={setNpValue} />
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
      <CompactItemText>足跡</CompactItemText>
      <CompactItemText>B</CompactItemText>
      <InputNumber max={500} min={0} value={footprintB} onValueChange={setFootprintB} style={{ width: 60 }} />
      <CompactItemText>A</CompactItemText>
      <InputNumber max={500} min={0} value={footprintA} onValueChange={setFootprintA} style={{ width: 60 }} />
      <CompactItemText>Q</CompactItemText>
      <InputNumber max={500} min={0} value={footprintQ} onValueChange={setFootprintQ} style={{ width: 60 }} />
    </Compact>
  );
}

function AutoFillServantParamsModalSection() {
  const [isServantModalOpen, openServantModal, closeServantModal] = useBoolean(false);
  return (
    <>
      <PrimaryOutlinedButton onClick={openServantModal} startIcon={<DatabaseOutlined />}>
        自動入力
      </PrimaryOutlinedButton>
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
