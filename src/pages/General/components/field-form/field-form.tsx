
import { Controller, useFormContext } from "react-hook-form";
import { Form as AntdForm, Input } from "antd";
import { FC } from "react";

type FieldInputFormProps = {
  name: string;
}

export const FieldInputForm: FC<FieldInputFormProps> = ({name}) => {
  const {control, register} = useFormContext();
  console.log(control)

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <AntdForm.Item className="form-field" label={"nameChange"}>
          <Input {...register(`${name}`)} {...field} />
        </AntdForm.Item>
      )}
    />
  );
};
