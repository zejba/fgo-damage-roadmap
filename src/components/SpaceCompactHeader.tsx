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
        backgroundColor: 'rgba(0, 0, 0, 0.02)',
        ...style
      }}
      {...rest}
    >
      {children}{' '}
    </Button>
  );
}

export default SpaceCompactHeader;
