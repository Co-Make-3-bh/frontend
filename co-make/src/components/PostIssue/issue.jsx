import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteConcern, editConcern } from "../../store/actions";

const Issue = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const { state } = props.location;
  console.log(state.id);
  const [form, setForm] = useState({
    title: "",
    description: "",
    zip: "",
    photo:"",
  });
  const { push } = useHistory();

  const dispatch = useDispatch();

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteConcern(state.id));
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
    <div>
      <img>{state.photo}</img>
      <p>Title: {state.title}</p>
      <p>Description: {state.description}</p>
      <p>Created By: {state.username}</p>
      <p>Zip Code: {state.zip}</p>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={isEditing ? handleSubmit : handleEdit}>
        {isEditing ? "Submit" : "Edit"}
      </button>
    </div>
  ) : (
    <form onSubmit={handleSubmit}>
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
    </form>
  );
};

export default Issue;
