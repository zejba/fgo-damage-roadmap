import styled from 'styled-components';

const CardContainer = styled.div`
  border: 1px solid #303030;
  border-radius: 8px;
  box-sizing: border-box;
`;

const CardHeader = styled.div`
  font-size: 1em;
  padding: 8px 12px;
  border-bottom: 1px solid #303030;
`;

const CardBody = styled.div`
  padding: 12px;
  @media (max-width: 560px) {
    padding: 8px 4px;
  }
`;

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  header?: React.ReactNode;
}

export function Card(props: CardProps) {
  const { header, children, ...rest } = props;
  return (
    <CardContainer {...rest}>
      {header && <CardHeader>{header}</CardHeader>}
      <CardBody>{children}</CardBody>
    </CardContainer>
  );
}
