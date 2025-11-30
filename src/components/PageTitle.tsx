import styled from 'styled-components';

const Title = styled.h2`
  margin-top: 4px;
  margin-left: 8px;
`;

type PageTitleProps = {
  children: React.ReactNode;
};

export function PageTitle({ children }: PageTitleProps) {
  return <Title>{children}</Title>;
}
