import React from "react";
import "./WriteForm.css";

const WriteForm = ({
  buttonText,
  cancelText,
  name,
  password,
  contents,
  onInitilize,
  onChangeName,
  onChangePassword,
  onChangeContents,
  onCreate,
}) => {
  return (
    <div className="form">
      <div className="label-form">
        <label className="label-class">
          이름
          <input type="text" value={name} onChange={onChangeName} />
        </label>
        <label className="label-class">
          비밀번호
          <input type="password" value={password} onChange={onChangePassword} />
        </label>
      </div>
      <textarea value={contents} onChange={onChangeContents} className="textarea-class"/>
      <div className="button-form">
      <div className="create-button" onClick={onInitilize}>
        <span>{cancelText}</span>
      </div>
      <div className="create-button" onClick={onCreate}>
        <span>{buttonText}</span>
      </div>
      </div>
    </div>
  );
};

export default WriteForm;
