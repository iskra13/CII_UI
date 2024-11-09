import { Dispatch, FC } from "react";
import { Modal } from "../../../../components";
import { Button } from "antd";

import styles from "./styles/role-modal.module.css"

type RoleModalProps = {
  onChagneRole: Dispatch<'expert' | 'user'>;
};

export const RoleModal: FC<RoleModalProps> = ({onChagneRole}) => {
  return (
    <Modal style={{width: '300px'}} open={true} footer={null}>
      <div className={styles.head}>Выберите вашу роль в системе</div>
      <div className={styles.body}>
        <Button
          key={"user"}
          onClick={() => {
            onChagneRole("user");
          }}
        >
          Пользователь
        </Button>
        <Button
          key={"expert"}
          onClick={() => {
            onChagneRole("expert");
          }}
        >
          Эксперт
        </Button>
      </div>
    </Modal>
  );
};
