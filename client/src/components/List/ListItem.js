import React from "react";

export const ListItem = props => (
  <li className="list-group-item" key="props.key">
    {props.children}
  </li>
);
