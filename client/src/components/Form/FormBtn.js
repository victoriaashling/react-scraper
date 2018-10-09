import React from "react";

export const FormBtn = props => (
  <div className="text-center">
    <button {...props} style={{ marginBottom: 10, marginTop: 10, width: 200 }} className="btn btn-lg bg-primary text-white">
      {props.children}
    </button>
  </div>
);
