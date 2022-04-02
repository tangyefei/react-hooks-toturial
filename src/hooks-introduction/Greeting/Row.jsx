import React from "react";

export default function Row(props) {
  return (
    <div>
      <div style={{ color: "#ccc", fontSize: "12px" }}>{props.label}</div>
      <div style={{ fontWeight: "bold", fontSize: "16px" }}>
        {props.children}
      </div>
    </div>
  );
}
