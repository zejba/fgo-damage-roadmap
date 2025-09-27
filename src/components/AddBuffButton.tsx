import { PlusOutlined } from '@ant-design/icons';
import { Button, type ButtonProps } from 'antd';

function AddBuffButton(props: ButtonProps) {
  return (
    <Button icon={<PlusOutlined />} {...props}>
      追加
    </Button>
  );
}

export default AddBuffButton;
