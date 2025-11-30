import styled from 'styled-components';

const StyledButton = styled.button`
  height: 32px;
  border: none;
  border-radius: 6px;
  padding: 0 12px;
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    background-color: #b1b1b1ff;
  }

  @media (max-width: 560px) {
    font-size: 0.75em;
    height: 28px;
  }
`;

export interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export function BaseButton(props: BaseButtonProps) {
  const { startIcon, endIcon, children, ...rest } = props;
  return (
    <StyledButton {...rest}>
      {startIcon && <span style={{ marginRight: 4 }}>{startIcon}</span>}
      {children}
      {endIcon && <span style={{ marginLeft: 4 }}>{endIcon}</span>}
    </StyledButton>
  );
}
