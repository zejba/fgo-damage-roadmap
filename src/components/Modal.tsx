import { Modal as AntdModal } from 'antd';
import styled from 'styled-components';

export const Modal = styled(AntdModal)`
  @media (max-width: 604px) {
    max-width: 540px !important;
  }
`;
