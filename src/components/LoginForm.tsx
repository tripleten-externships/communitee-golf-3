import React,{useEffect} from "react";
import { validateLoginForm } from "../hooks/validateLoginForm";
import { useAuth } from "../hooks/useAuth";


interface LoginFormProps {
  onLogin: (username: string, password: string) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const {isSubmitted,isLoading,logInError,logInErrorMessage,handleForgotPassword}=useAuth();
  const {values, handleValueChange, errors, isValid, resetForm}=validateLoginForm();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(values.username, values.password);
    
  };

  const onForgotPassword = () => {
    handleForgotPassword();
  };
  useEffect(() => {
    if (!isSubmitted) {
      resetForm();
    }
  }, [isSubmitted]);
  return (
    <form onSubmit={handleSubmit} className="space-y-5   flex flex-col w-full">
      <div >
        <label
      
          className="sr-only"
          htmlFor="username"
        >
          Username
          
        </label>
        <input
          type="text"
          id="username"
          name="username" 
          placeholder="Username"
          value={values.username}
          onChange={handleValueChange}
          className={`w-full rounded-xl border border-solid p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            (errors.username || logInError)? 'border-red-500' : 'border-gray-400'
          }`}
          required
         
        />
         {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
         {logInError && (!errors.username )&& <p className="text-red-500 text-sm">{logInErrorMessage}</p>}
     
      </div>
      <div>
        <label
          htmlFor="password"
          className="sr-only"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleValueChange}
          className={`w-full rounded-xl border border-solid p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            (errors.password || logInError)? 'border-red-500' : 'border-gray-400'
          }`}
          required
          
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        {logInError && (!errors.password)&& <p className="text-red-500 text-sm">{logInErrorMessage}</p>}
      </div>
      <button
        type="submit"
        className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm font-poppins font-semibold text-base leading-6 tracking-normal text-white bg-custom-red cursor-pointer
          ${!isValid ? 'bg-custom-red hover:bg-gray-400 focus:ring-none' : 
      'bg-custom-red hover:bg-red-600 focus:ring-blue-500'}`}
     disabled={!isValid}
     >
      {isLoading ? "Loading..." : "Sign In"}
      </button>
      <button
        type="button"
        onClick={onForgotPassword}  
        className="font-poppins font-medium text-sm leading-6 tracking-normal text-black  block text-center  p-0 hover:text-red-600 "
      >
        Forgot Password? 
      </button>
    </form>
  );
};
