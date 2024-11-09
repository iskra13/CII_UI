import { FC } from "react";
import { Modal } from "../../../../components";
import { UpdateFormLegislation } from "../update-form-legislation/update-form-legislation";
import { z } from "zod";

const updateLegislationSchema = z.object({
  key: z.string(),
  nameChange: z.string().startsWith("asd"),
  description: z.string(),
  effectiveDate: z.string().nullable(),
  sourceLink: z.string(),
  category: z.string(),
});

type Schema = z.infer<typeof updateLegislationSchema>;


type UpdateLegislation = {
  onClose: () => void;
  onUpdateLegislation: (value: Schema) => void;
  isModalOpne: boolean;
};

export const UpdateLegislationModal: FC<UpdateLegislation> = ({
  onClose,
  onUpdateLegislation,
  isModalOpne
}) => {
  
    
  return (
    <Modal open={isModalOpne} onCancel={onClose} footer={null}>
      <UpdateFormLegislation onClose={onClose} onSubmit={onUpdateLegislation} />
    </Modal>
  );
};
