import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteConcern, editConcern } from "../../store/actions";
import styled from "styled-components";

const FormContainer = styled.div`
  width: 40%;
  margin: 0 auto;
  background-color: #e5ebed;
  border-radius: 20px;
  font-family: "Quicksand", sans-serif;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 20px;
  h2 {
    text-align: left;
    font-size: 2rem;
  }
  input {
    margin-top: 20px;
    margin-bottom: 20px;
    border: 1px solid lightgrey;
    border-radius: 7px;
    height: 50px;
    font-size: 1.1rem;
  }
  button {
    margin-top: 20px;
    height: 50px;
    border-radius: 7px;
    border: none;
    background-color: #2b85a2;
    color: white;
    font-size: 1.3rem;
  }
`;
const StyledDetailsCon = styled.div`
  width: 40%;
  margin: 0 auto;
  padding: 30px;
  background-color: #e5ebed;
  border-radius: 20px;
  font-family: "Quicksand", sans-serif;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  button {
    margin-top: 20px;
    height: 50px;
    border-radius: 7px;
    border: none;
    background-color: #2b85a2;
    color: white;
    font-size: 1.3rem;
    width: 100px;
    margin: 10px;
  }
  .buttonDiv {
    margin-right: 30%;
  }
  p {
    text-align: left;
    margin-left: 15%;
    margin-top: 40px;
    font-size: 1.5rem;
  }
  h2 {
    text-align: left;
    margin-left: 15%;
    margin-top: 30px;
    font-size: 1.5rem;
  }
`;

const Issue = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const { state } = props.location;
  const { user } = useSelector((state) => state);
  console.log(state.id);
  const [form, setForm] = useState({
    title: "",
    description: "",
    zip: "",
    photo: "",
  });
  const { push } = useHistory();

  const dispatch = useDispatch();

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteConcern(user.id, state.id));
    push("/profile");
  };

  const handleChanges = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setIsEditing(true);
    setForm(state);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editConcern(form, state.id));
    setIsEditing(false);
    push("/profile");
  };

  console.log(state);
  // return (
  //   <div>
  //     <p>Title: {state.title}</p>
  //     <p>Description: {state.description}</p>
  //     <p>Created By: {state.username}</p>
  //     <p>Zip Code: {state.zip}</p>
  //     <button onClick={handleDelete}>Delete</button>
  //     <button onClick={isEditing ? handleSubmit : handleEdit}>
  //       {isEditing ? "Submit" : "Edit"}
  //     </button>
  //   </div>
  // );
  return !isEditing ? (
    <StyledDetailsCon>
      <div>
        <h2>Post Details:</h2>

        <p>Title: {state.title}</p>
        <p>Description: {state.description}</p>
        {/* <p>Created By: {state.username}</p> */}
        <p>Zip Code: {state.zip}</p>
        <div className="buttonDiv">
          <button onClick={handleDelete}>Delete</button>
          <button onClick={isEditing ? handleSubmit : handleEdit}>
            {isEditing ? "Submit" : "Edit"}
          </button>
        </div>
      </div>
    </StyledDetailsCon>
  ) : (
    <FormContainer>
      <StyledForm onSubmit={handleSubmit}>
        <h2>Edit Post:</h2>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChanges}
        ></input>
        <input
          type="text"
          name="description"
          value={form.description}
          onChange={handleChanges}
        ></input>
        <input
          type="text"
          name="zip"
          value={form.zip}
          onChange={handleChanges}
        ></input>

        <button>Submit</button>
      </StyledForm>
    </FormContainer>
  );
};

export default Issue;
