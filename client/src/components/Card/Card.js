import React from "react";
import "./Card.css";

const Card = props => (
  <div className="card">
    <div className="card-header text-center bg-primary text-white">
      <h4>{props.cardTitle}</h4>
    </div>
    <div className="card-body">
      {props.children}
    </div>
  </div>
);

export default Card;