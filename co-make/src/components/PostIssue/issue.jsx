import React from "react";


const Issue = (props) => {
  return (
    <div data-cy={`issue-component-${props.issue.id}`}>
      <p>Title: {props.issue.title}</p>
      <p>Description: {props.issue.description}</p>
      <p>Created By: {props.issue.createdBy}</p>
      <p>Zip Code: {props.issue.zipCode}</p>
    </div>
  );
};

export default Issue;
