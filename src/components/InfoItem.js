import React, { Component } from "react";
import "./InfoItem.css";

class InfoItem extends Component {
  render() {
    const {
      id,
      name,
      password,
      contents,
      lastUPD,
      onModify,
      onRemove,
      key,
    } = this.props;

    return (
      <div className="item-form">
        <div>{contents}</div>
        <div className="item-info-form">
          <div className="info-margin">{name}</div>
          <div className="info-margin">{lastUPD}</div>
          <div className="blue-button" onClick={() => onModify(id)}>
            수정
          </div>
          <div
            className="blue-button"
            onClick={(e) => {
              e.stopPropagation();
              onRemove(id);
            }}
          >
          삭제
          </div>
        </div>
      </div>
    );
  }
}

export default InfoItem;
