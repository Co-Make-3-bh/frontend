import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteConcern } from "../../store/actions";

const Issue = (props) => {
  const { push } = useHistory();
  const { state } = props.location;
  const dispatch = useDispatch();

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteConcern(state.id));
    push("/profile");
  };

  console.log(state);
  return (
    <div>
      <p>Title: {state.title}</p>
      <p>Description: {state.description}</p>
      <p>Created By: {state.username}</p>
      <p>Zip Code: {state.zip}</p>
      <button onClick={handleDelete}>Delete</button>
      <button>Edit</button>
    </div>
  );
};

export default Issue;
