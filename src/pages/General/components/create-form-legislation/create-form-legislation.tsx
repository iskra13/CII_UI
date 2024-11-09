import { FC } from "react";
import { Form as AntdForm } from "antd";
import { z } from "zod";
import { Button, DatePicker, Input, Select } from "antd";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";

import "./styles/form-create-body.css";

const { Option } = Select;

const createLegislationSchema = z.object({
  key: z.string(),
  nameChange: z.string().min(10),
  description: z.string().min(10),
  effectiveDate: z.string().min(1).nullable(),
  sourceLink: z.string().startsWith("https://"),
  category: z.string(),
});

type Schema = z.infer<typeof createLegislationSchema>;

type CreateFormLegislationProps = {
  onSubmit: (value: Schema) => void;
  onClose: () => void;
};

export const CreateFormLegislation: FC<CreateFormLegislationProps> = ({
  onSubmit,
  onClose,
}) => {
  const defaultValues = {
    key: uuidv4(),
    nameChange: "",
    description: "",
    effectiveDate: null,
    sourceLink: "",
    category: "Конституционное право",
  };

  const methods = useForm({
    defaultValues: defaultValues,
    resolver: zodResolver(createLegislationSchema),
    mode: "all",
  });

  const submit = (value: Schema) => {
    onSubmit(value);
    onClose();
  };

  return (
    <AntdForm layout="vertical" onSubmitCapture={methods.handleSubmit(submit)}>
      <div>Добавление изменения в законадательства</div>
      <div className="form-body">
        <Controller
          name="nameChange"
          control={methods.control}
          render={({ field }) => (
            <AntdForm.Item className="form-field" label={"Название изменения"}>
              <Input {...field} />
              <div className="error">
                {methods.formState.errors.nameChange?.message}
              </div>
            </AntdForm.Item>
          )}
        />
        <Controller
          name="effectiveDate"
          control={methods.control}
          render={({ field }) => (
            <AntdForm.Item
              className="form-field"
              label={"Дата вступления в силу"}
            >
              <DatePicker
                className="form-field"
                showTime={{ format: "HH:mm" }}
                format="YYYY-MM-DD HH:mm"
                onChange={(date) => {
                  field.onChange(date ? dayjs(date).toString() : null);
                }}
              />
              <div className="error">
                {methods.formState.errors.effectiveDate?.message}
              </div>
            </AntdForm.Item>
          )}
        />
        <Controller
          name="sourceLink"
          control={methods.control}
          render={({ field }) => (
            <AntdForm.Item className="form-field" label={"Ссылка на источник"}>
              <Input {...field} />
              <div className="error">
                {methods.formState.errors.sourceLink?.message}
              </div>
            </AntdForm.Item>
          )}
        />
        <Controller
          name="category"
          control={methods.control}
          render={({ field }) => (
            <AntdForm.Item className="form-field" label={"Категория"}>
              <Select {...field}>
                <Option value="Конституционное право">Конституционное право</Option>
                <Option value="Гражданское право">Гражданское право</Option>
                <Option value="Уголовное право">Уголовное право</Option>
                <Option value="Административное право">Административное право</Option>
                <Option value="Трудовое право">Трудовое право</Option>
                <Option value="Семейное право">Семейное право</Option>
                <Option value="Экологическое право">Экологическое право</Option>
                <Option value="Финансовое право">Финансовое право</Option>
                <Option value="Международное право">Международное право</Option>
              </Select>
              <div className="error">
                {methods.formState.errors.category?.message}
              </div>
            </AntdForm.Item>
          )}
        />
        <Controller
          name="description"
          control={methods.control}
          render={({ field }) => (
            <AntdForm.Item className="double form-field" label={"Описание"}>
              <Input.TextArea {...field} />
              <div className="error">
                {methods.formState.errors.description?.message}
              </div>
            </AntdForm.Item>
          )}
        />
      </div>
      <div className="form-footer">
        <Button htmlType="submit" key={"add"}>
          Добавить
        </Button>
        <Button htmlType="button" onClick={onClose} key={"cancel"}>
          Отменить
        </Button>
      </div>
    </AntdForm>
  );
};
