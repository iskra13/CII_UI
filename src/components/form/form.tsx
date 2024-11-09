import { FC, ReactNode } from "react";
import { Form as AntdForm } from "antd";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type FormProps = {
  children: ReactNode;
  defaultValues?: any;
  schema: any;
  onSubmit: (value: any) => void;
};

export const Form: FC<FormProps> = ({
  children,
  schema,
  defaultValues,
  onSubmit,
}) => {
  const methods = useForm({
    defaultValues: defaultValues,
    resolver: zodResolver(schema),
    mode: 'all', 
  });

  return (
    <FormProvider {...methods}>
      <AntdForm
        onSubmitCapture={()=>{
          methods.handleSubmit(onSubmit)
        }}
        layout="vertical"
      >
        {children}
      </AntdForm>
    </FormProvider>
  );
};
