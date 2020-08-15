import React from "react";
import "./FullForm.css";

const FullForm = ({ form, children }) => {
  return (
    <main className="board-template">
      <section className="form-wrapper">{form}</section>
      <section className="todos-wrapper">{children}</section>
    </main>
  );
};

export default FullForm;
