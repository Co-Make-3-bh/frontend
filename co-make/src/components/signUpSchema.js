import * as yup from "yup";

const signUpSchema = yup.object().shape({
  username: yup
    .string()
    .min(8)
    .required("username is required"),
  email: yup
    .string()
    .required("Email is required"),  
  password: yup
    .string()
    .required()
    .min(7, 'password must be 7 charaters long'),
  zip: yup 
    .string()
    .required()
    .min(5, "Must be 5 Char long")  
});
export default signUpSchema