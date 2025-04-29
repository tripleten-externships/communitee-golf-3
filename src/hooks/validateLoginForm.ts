type ValidationResult = {
    isValid: boolean;
    errors: {
      username?: string;
      password?: string;
    };
  };
  
  export const validateLoginForm = (values: { username: string; password: string }): ValidationResult => {
    const errors: ValidationResult['errors'] = {};
    let isValid = true;
  
    // Username validation
    if (!values.username.trim()) {
      errors.username = 'Username is required';
      isValid = false;
    } else if (values.username.length < 3) {
      errors.username = 'Minimum 3 characters';
      isValid = false;
    } else if (!/^[a-z0-9_]+$/i.test(values.username)) {
      errors.username = 'Only letters, numbers, and _';
      isValid = false;
    }
  
    // Password validation
    if (!values.password) {
      errors.password = 'Password is required';
      isValid = false;
    } else if (values.password.length < 8) {
      errors.password = 'Minimum 8 characters';
      isValid = false;
    }
  
    return { isValid, errors };
  };