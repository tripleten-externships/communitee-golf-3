import { useState ,useCallback} from "react";


const initializeFields = (fields: string[]): Record<string, string> => 
  fields.reduce((acc, fieldName) => {
    acc[fieldName] = ''; 
    return acc;
  }, {} as Record<string, string>);


const initialFieldState = initializeFields(['username', 'password']);
type ValidationResult = {
    isValid: boolean;
    errors: Record<string, string>;
    values: Record<string, string>;
    handleValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    resetForm:()=>void
    
  };
  
  export const validateLoginForm = (): ValidationResult => {
  
    const [values, setValues] = useState(initialFieldState);
  const [ errors, setErrors ] = useState(initialFieldState);
    const [ isValid, setIsValid ] = useState<boolean>(false);

    const handleValueChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
      const {name, value} = e.target
      setValues({...values, [ name]: value });
      setErrors({...errors, [ name]: e.target.validationMessage});
      setIsValid(e.target.closest('form')?.checkValidity() ?? false);

      
  }
    const resetForm = useCallback(() => {
      setValues({username:'',password:''});
      setErrors({});
      setIsValid(false);
    }, [setValues, setErrors, setIsValid]);
    return {values, handleValueChange, errors, isValid, resetForm };
  };