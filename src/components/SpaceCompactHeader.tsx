import { Button, type ButtonProps } from 'antd';

function SpaceCompactHeader(props: ButtonProps) {
  const { style, children, ...rest } = props;
  return (
    <Button
      disabled
      style={{
        padding: '0 8px',
        color: 'black',
        cursor: 'text',
        backgroundColor: '#f3f3f3',
        ...style
      }}
      {...rest}
    >
      {children}{' '}
    </Button>
  );
}

export default SpaceCompactHeader;
