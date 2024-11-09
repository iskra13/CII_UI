import { ReactNode, FC } from "react";
import { Modal as AntdModal, ModalProps } from "antd";

type AntdModalProps = ModalProps & {
  children: ReactNode;
};

export const Modal: FC<AntdModalProps> = ({ children, ...rest }) => {
  return (
    <AntdModal {...rest}>
      {children}
    </AntdModal>
  );
};
