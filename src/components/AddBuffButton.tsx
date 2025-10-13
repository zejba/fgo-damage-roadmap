import { PlusOutlined } from '@ant-design/icons';
import { BaseButtonProps } from './Button.tsx/BaseButton';
import { PrimaryOutlinedButton } from './Button.tsx/PrimaryOutlinedButton';

function AddBuffButton(props: BaseButtonProps) {
  return (
    <PrimaryOutlinedButton startIcon={<PlusOutlined />} {...props}>
      追加
    </PrimaryOutlinedButton>
  );
}

export default AddBuffButton;
