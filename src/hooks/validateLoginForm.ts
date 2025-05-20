import { useState, useCallback, ChangeEvent } from "react";

type FormFields = Record<string, string>;

interface UseFormAndValidationReturn {
  values: FormFields;
  setValues: React.Dispatch<React.SetStateAction<FormFields>>;
  handleValueChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  errors: FormFields;
  isValid: boolean;
  resetForm: (
    newValues?: FormFields,
    newErrors?: FormFields,
    newIsValid?: boolean
  ) => void;
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>;
}

export const validateForm = (
  initialFieldNames: string[] = []
): UseFormAndValidationReturn => {
  const initializeFields = (fields: string[]): FormFields =>
    fields.reduce((acc, fieldName) => {
      acc[fieldName] = "";
      return acc;
    }, {} as FormFields);
  const initialFieldState = initializeFields(initialFieldNames);

  const [values, setValues] = useState<FormFields>(initialFieldState);
  const [errors, setErrors] = useState<FormFields>(initialFieldState);
  const [isValid, setIsValid] = useState<boolean>(false);

  const handleValueChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: e.target.validationMessage });
    setIsValid(e.target.closest("form")?.checkValidity() ?? false);
  };
  const resetForm = useCallback(
    (
      newValues: FormFields = initialFieldState,
      newErrors: FormFields = initialFieldState,
      newIsValid: boolean = false
    ) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );
  return {
    values,
    handleValueChange,
    errors,
    isValid,
    resetForm,
    setValues,
    setIsValid,
  };
};
