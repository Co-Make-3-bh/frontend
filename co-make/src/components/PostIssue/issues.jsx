import React from "react";
import Issue from "./issue";

const Issues = (props) => {
  return (
    <div>
      {props.issues.map((issue) => (
        <Issue issue={issue} key={issue.id} />
      ))}

    </div>
  );
};

export default Issues;