import React from "react";

type FormValues = Record<string, string>;

export function useForm() {
  const [values, setValues] = React.useState<FormValues>({});

  const handleValueChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;

    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return { values, setValues, handleValueChange };
}
