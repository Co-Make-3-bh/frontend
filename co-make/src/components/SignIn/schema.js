import * as yup from 'yup';

export const registerSchema = yup.object().shape({
  
    email:    yup
              .string()
              .email()
              .required(),
    password:
             yup
             .string()
             .password()
             .required()
             .min(7),
    
});