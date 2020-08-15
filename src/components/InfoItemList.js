import React, { Component } from "react";
import InfoItem from "./InfoItem";

class InfoItemList extends Component {
  render() {
    const { infos, onModify, onRemove } = this.props;

    const infoList = infos.reverse().map(({ id, name, password, contents, lastUPD }) => (
      <InfoItem
        id={id}
        name={name}
        password={password}
        contents={contents}
        lastUPD={lastUPD}
        onModify={onModify}
        onRemove={onRemove}
        key={id}
      />
    ));

    return <div>{infoList}</div>;
  }
}

export default InfoItemList;
