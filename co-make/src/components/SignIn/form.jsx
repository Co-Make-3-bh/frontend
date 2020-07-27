import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { registerSchema } from "./schema";
import { loginUser } from "../../store/actions";

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
    console.dir(e.target);

    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });

    console.log(formValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    registerSchema
      .validate(formValues, { abortEarly: false })
      .then((_) => {
        dispatch(loginUser(formValues));
      })
      .catch((err) => {
        console.dir(err);

        setErrors([...err.inner]);
      });
  };

  return (
    <form>
      <label>
        Email:&nbsp;
        <input
          name="email"
          type="email"
          data-cy="input-email"
          onChange={handleChange}
          value={formValues.email}
        />
      </label>
      <label>
        Password:&nbsp;
        <input
          name="password"
          type="password"
          data-cy="input-password"
          onChange={handleChange}
          value={formValues.password}
        />
      </label>

      <button data-cy="submit-button" onClick={handleSubmit}>
        Submit
      </button>

      <div data-cy="error-output">
        {errors.map((err) => (
          <p style={{ color: "red" }}>{err.message}</p>
        ))}
      </div>
    </form>
  );
};

export default Form;
