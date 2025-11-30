import { PlusOutlined } from '@ant-design/icons';
import { BaseButtonProps } from './Button.tsx/BaseButton';
import { PrimaryOutlinedButton } from './Button.tsx/PrimaryOutlinedButton';
import { styled } from 'styled-components';

const StyledButton = styled(PrimaryOutlinedButton)`
  background-color: #f3f3f3;
`;

function AddBuffButton(props: BaseButtonProps) {
  return (
    <StyledButton startIcon={<PlusOutlined />} {...props}>
      追加
    </StyledButton>
  );
}

export default AddBuffButton;
