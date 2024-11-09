import { FC } from "react";
import { Modal } from "../../../../components";
import { LegislationType } from "../../../../store";
import { CreateFormLegislation } from "../create-form-legislation/create-form-legislation";

type CreateLegislation = {
  onClose: () => void;
  onAddLegislation: (value: LegislationType) => void;
  isModalOpne: boolean;
};

export const CreateLegislationModal: FC<CreateLegislation> = ({
  onClose,
  onAddLegislation,
  isModalOpne
}) => {
    
  return (
    <Modal open={isModalOpne} onCancel={onClose} footer={null}>
      <CreateFormLegislation onClose={onClose} onSubmit={onAddLegislation} />
    </Modal>
  );
};
