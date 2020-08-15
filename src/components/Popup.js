import React, { Component } from "react";
import "./Popup.css";

class Popup extends React.Component {
    render() {
        const {
            showPassword,
            id,
            popupMessage,
            onShowPopup,
            onRemove,
            password,
            onChangePassword,
            onInitilize
        } = this.props;

      return (
        <div className='popup'>
          <div className='popup_inner'>
          <div className="popup_form">
          <p>{popupMessage}</p>
            {
                showPassword ?
                <div>
                    <label className="label-class">
                    비밀번호
                    <input type="password" value={password} onChange={onChangePassword}/>
                    </label>
                    <div className="button_form">
                    <button onClick={onShowPopup}>취소</button>
                    <button onClick={onRemove}>삭제</button>
                </div>
                </div>  
                :<div className="button_form">
                    <button onClick={onShowPopup}>취소</button>
                    <button onClick={onInitilize}>확인</button>
                </div>
            }   
            </div>    
          </div>
        </div>
      );
    }
  }

  export default Popup;
