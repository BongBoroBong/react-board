import React, { Component } from "react";
import FullForm from "./components/FullForm";
import WriteForm from "./components/WriteForm";
import InfoItemList from "./components/InfoItemList";
import Popup from "./components/Popup";

class App extends Component {
  id = 2;
  buttonText = "등록하기";
  cancelText = "초기화";
  showPassword=false;

  state = {
    showPopup:false,
    popupMessage:"",
    name: "",
    password: "",
    contents: "",
    infos: [
      {
        id: 0,
        name: "현빈",
        password: "gusqls",
        contents:
          "무엇을 간에 꾸며 인생을 청춘에서만 구할 붙잡아 얼마나 그리하였는가?",
        lastUPD: "2020. 8. 10.",
      },
      {
        id: 1,
        name: "박보검",
        password: "qkrqhrja",
        contents:
          "우리는 몸이 창공에 위하여서. 사람은 끓는 인간의 몸이 봄바람이다.",
        lastUPD: "2020. 8. 10.",
      },
    ],
  };

  //이름 값 변경
  handleNameChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  //비밀번호 값 변경
  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  //내용 값 변경
  handleContentsChange = (e) => {
    this.setState({
      contents: e.target.value,
    });
  };

  //초기화 or 취소
  handleRefresh = (e) => {
    const { id, name, contents, infos } = this.state;
    const index = infos.findIndex((info) => info.id === id);
    const selected = infos[index]; 

    if(this.cancelText==="초기화"){ //초기화
      this.setState({
        name: "",
        password: "",
        contents: "",
      });
    }else{ //취소
        if(selected.name!==name||selected.contents!==contents){
          this.setState({
            showPopup: !this.state.showPopup,
            popupMessage:"변경된 사항이 있습니다. 초기화 하시겠습니까?"
          });
          return;
        }

        this.setState({
          name: "",
          password: "",
          contents: "",
        });

        this.cancelText ="초기화";
        this.buttonText = "등록하기";
    }
  }

  //등록하기 or 수정하기
  handleCreate = () => {
    const { id, name, password, contents, infos } = this.state;
    if (password.length === 0) {
      alert("비밀번호를 입력해주세요");
      return;
    }

    if (this.buttonText === "등록하기") {
      this.setState({
        name: "",
        password: "",
        contents: "",
        infos: infos.concat({
          id: this.id++,
          name: name,
          password: password,
          lastUPD: new Date().toLocaleDateString("ko-KR"),
          contents: contents,
        }),
      });
    } else {
      const index = infos.findIndex((info) => info.id === id);
      const selected = infos[index]; 
      if(selected.password!==password){
        alert('비밀번호가 다릅니다.');
        return;
      }

      this.setState({
        name: "",
        password: "",
        contents: "",
        infos: infos.map((info) =>
          info.id === id
            ? {
                ...infos,
                name: name,
                password: password,
                lastUPD: new Date().toLocaleDateString("ko-KR"),
                contents: contents,
              }
            : info
        ),
      });
      this.buttonText = "등록하기";
    }
  };

  //enterKey
  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.handleCreate();
    }
  };

  //리스트 내 수정버튼 누르기
  handleModify = (id) => {
    this.buttonText = "수정하기";
    this.cancelText = "취소";
    const { infos } = this.state;
    const index = infos.findIndex((info) => info.id === id);
    const selected = infos[index]; 
    this.setState({
      id: id,
      name: selected.name,
      password: '',
      contents: selected.contents,
    });
  };

  //팝업 on / off
  handleShowPopup = (id) => {
    this.setState({
      showPopup: !this.state.showPopup
    });
  };

  //팝업에서 초기화
  handlePopupRefresh = ()=>{
    this.buttonText = "등록하기";
    this.cancelText = "초기화";
    this.setState({
      name: "",
      password: "",
      contents: "",
      showPopup: !this.state.showPopup,
    });
  }

  //삭제 팝업 띄우기
  handleRemovePopup = (id) => {
    const {infos } = this.state;
    const index = infos.findIndex((info) => info.id === id);
    const selected = infos[index]; 
    this.showPassword=true;
    this.setState({
      showPopup: !this.state.showPopup,
      id:selected.id,
      password:''
    });   
  };

  //팝업에서 삭제
  handlePopupRemove = ()=>{
    const {password,id,infos } = this.state;

    const index = infos.findIndex((info) => info.id === id);
    const selected = infos[index]; 
    if(selected.password==password){
      this.setState({
        infos: infos.filter((info) => info.id !== id),
        showPopup: !this.state.showPopup
      });
    }else{
      alert('비밀번호가 다릅니다.')
    }       
  };

  render() {
    const { id, name, password, contents, infos, popupMessage } = this.state;

    const {
      handleRefresh,
      handleNameChange,
      handlePasswordChange,
      handleContentsChange,
      handleCreate,
      handleModify,
      handleRemovePopup,
      handlePopupRemove,
      handleShowPopup,
      handlePopupRefresh
    } = this;

    return (
      <div>
      <FullForm
        form={
          <WriteForm
            buttonText={this.buttonText}
            cancelText={this.cancelText}
            name={name}
            password={password}
            contents={contents}
            onInitilize={handleRefresh}
            onCreate={handleCreate}
            onChangeName={handleNameChange}
            onChangePassword={handlePasswordChange}
            onChangeContents={handleContentsChange}
          />
        }
      >
        <InfoItemList
          infos={infos}
          onModify={handleModify}
          onRemove={handleRemovePopup}
        />
      </FullForm>
      {this.state.showPopup ?
        <Popup 
          showPassword={this.showPassword}
          popupMessage={popupMessage}
          onShowPopup={handleShowPopup}
          onRemove={handlePopupRemove}
          onChangePassword={handlePasswordChange}
          id={id}
          onInitilize={handlePopupRefresh}
          /> : null
      }
      </div>
    );
  }
}

export default App;
