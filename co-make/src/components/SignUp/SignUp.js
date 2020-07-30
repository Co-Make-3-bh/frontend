import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import signUpSchema from "./signUpSchema";
import * as yup from "yup";
import { registerUser } from "../../store/actions";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const StyledForm = styled.form`
  width: 25%;
  min-width: 350px;
  height: 580px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 28px;
  background-color: #e5ebed;
  padding: 30px;
  border-radius: 20px;
  font-family: "Quicksand", sans-serif;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  div {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  label {
    text-align: left;
    margin-bottom: 10px;
    font-size: 1.2rem;
  }
  input {
    margin-bottom: 10px;
    height: 40px;
    border: 1px solid lightgrey;
    border-radius: 4px;
    font-size: 1rem;
  }
  h2 {
    text-align: left;
    font-size: 2rem;
  }
  button {
    height: 70px;
    background-color: #2b85a2;
    margin-top: 30px;
    font-size: 1.2rem;
    color: white;
    border: none;
    border-radius: 4px;
  }
`;

function SignUp(props) {
  const { push } = useHistory();
  console.log(push);
  
  const dispatch = useDispatch();
  const initialFormValues = {
    username: "",
    email: "",
    password: "",
    zip: "",
  };

  const initialErrors = {
    username: "",
    password: "",
    zip: "",
  };

  const [userValues, setUserValues] = useState(initialFormValues);
  const [errors, setErrors] = useState(initialErrors);

  const handleChange = (e) => {
    e.persist();

    setUserValues({
      ...userValues,
      [e.target.name]: e.target.value,
    });
    yup
      .reach(signUpSchema, e.target.name)
      //we can then run validate using the value
      .validate(e.target.value)
      // if the validation is successful, we can clear the error message
      .then((valid) => {
        setErrors({ ...errors, [e.target.name]: "" });
      })
      .catch((err) => {
        setErrors({ ...errors, [e.target.name]: err.errors[0] });
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(userValues, push));
    setUserValues(initialFormValues);
  };
  return (
    <div>
      <StyledForm>
        <div>
          <h2>Sign Up</h2>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            onChange={handleChange}
            value={userValues.username}
            required
          />
          {errors.username && <p>{errors.username}</p>}
          <label>Email:</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={userValues.email}
            required
          />
          {errors.email && <p>{errors.email}</p>}

          <label>Password:</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={userValues.password}
          />
          {errors.password && <p>{errors.password}</p>}

          <label>Zip:</label>
          <input
            type="text"
            name="zip"
            onChange={handleChange}
            value={userValues.zip}
          />
          {errors.zip && <p>{errors.zip}</p>}

          <button onClick={handleSubmit}>Sign Up</button>
        </div>
      </StyledForm>

      <p>
        Already have an account?{" "}
        <Link className="link" to="/signin">
          Sign In
        </Link>
      </p>
    </div>
  );
}
export default SignUp;
