import React from "react";
import Graph from "./Graph";
function InformationPage({ title, information, id }) {
  return (
    <div style={{ marginBottom: 20, width: "100%" }}>
      <div style={{ fontSize: 24, marginLeft: 5 }}>{title}</div>
      <div
        style={{ fontFamily: "MontserratLight", fontSize: 12, marginLeft: 5 }}
      >
        {information}
      </div>
      <div style={{ marginTop: 10 }}>
        <Graph maxValue={50} id={id}></Graph>
      </div>
    </div>
  );
}

export default InformationPage;
