import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { registerSchema } from "./schema";
import { loginUser } from "../../store/actions";
import styled from "styled-components";

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  text-decoration: none;

  p {
    color: #c6d7dd;
    margin-top: 2%;
    font-size: 1rem;
    font-family: "Quicksand", sans-serif;
  }

  .link {
    text-decoration: none;
    color: white;

    &:hover {
      color: black;
    }
  }

  .errors {
    font-size: 1.5rem;
    font-family: "Quicksand", sans-serif;
  }
`;
const StyledForm = styled.div`
  background-color: #e5ebed;
  width: 25%;
  height: 580px;
  padding: 2%;
  margin-top: 2%;
  border-radius: 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  display: flex;
  flex-direction: column;

  align-items: center;

  @media (max-width: 1000px) {
    width: 45%;
  }

  form {
    width: 95%;
  }
`;

const StyledFormInput = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  h2 {
    text-align: left;
    font-size: 2rem;
    margin-bottom: 8%;
    margin-top: 10%;
    font-family: "Quicksand", sans-serif;
  }

  label {
    width: 95%;
    text-align: left;
    margin: 2%;
    font-size: 1.2rem;
    font-family: "Quicksand", sans-serif;
  }

  input {
    width: 95%;
    padding: 20px 20px;
    margin: 2%;
    margin-bottom: 8%;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }

  button {
    width: 95%;
    background-color: #2b85a2;
    color: white;
    padding: 20px 20px;
    margin: 2%;
    margin-top: 10%;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1.2rem;
    font-family: "Quicksand", sans-serif;
  }
`;

const Form = (props) => {
  const { push } = useHistory();
  const dispatch = useDispatch();
  const initialValues = {
    email: "",
    password: "",
  };

  const [formValues, setFormValues] = useState(initialValues);

  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    registerSchema
      .validate(formValues, { abortEarly: false })
      .then((_) => {
        dispatch(loginUser(formValues, props));
      })
      .catch((err) => {
        setErrors([...err.inner]);
      });
  };

  return (
    <FormContainer>
      <div className="errors">
        {errors.map((err) => (
          <p style={{ color: "red" }}>{err.message}</p>
        ))}
      </div>

      <StyledForm>
        <form>
          <StyledFormInput>
            <h2>Log In to Your Account</h2>
            <label htmlFor="email">Email:&nbsp;</label>
            <input
              id="email"
              name="email"
              type="email"
              data-cy="input-email"
              onChange={handleChange}
              value={formValues.email}
            />

            <label htmlFor="password">Password:&nbsp;</label>
            <input
              id="password"
              name="password"
              type="password"
              data-cy="input-password"
              onChange={handleChange}
              value={formValues.password}
            />

            <button data-cy="submit-button" onClick={handleSubmit}>
              Login
            </button>
          </StyledFormInput>
        </form>
      </StyledForm>
      <p>
        Don't have an account?{" "}
        <Link className="link" to="/signup">
          Register
        </Link>
      </p>
    </FormContainer>
  );
};

export default Form;
