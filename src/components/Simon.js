import React from 'react';
import ColorButton from './ColorButton';
import _ from 'underscore';
import { Button } from 'reactstrap';

class Simon extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      answerArr: [],
      playerArr: [],
      playerTurn: false,
      strict: false,
    };
    this.handleClick = this.handleClick.bind(this);
  };

  handleClick(color) {
    let errorAudio = new Audio("http://www.orangefreesounds.com/wp-content/uploads/2015/08/Error.mp3?_=1");
    if (this.state.playerTurn === true) {

      let playerArr = this.state.playerArr;
      playerArr.push(color);
      let answerArr = this.state.answerArr.slice(0, playerArr.length);
      this.setState({ playerArr });

      if ( _.isEqual(playerArr, answerArr)
        && this.state.playerArr.length === this.state.answerArr.length
        && this.state.answerArr.length === 20) {

        this.props.toggleWinner();

      } else if (_.isEqual(playerArr, answerArr)
        && this.state.playerArr.length === this.state.answerArr.length) {

        let playerTurn = false;
        playerArr = [];
        this.setState({ playerArr, playerTurn });
        setTimeout(() => {
          this.addNewColor();
        }, 1000);
      } else if (!_.isEqual(playerArr, answerArr) && !this.state.strict) {
        let playerTurn = false;
        let playerArr = [];
        this.setState({ playerArr, playerTurn });
        setTimeout(() => {
          errorAudio.play();
        }, 700)
        setTimeout( () => {
          this.playArr(this.state.answerArr.length, this.state.answerArr, 750, 0);
        }, 1500);
      } else if (!_.isEqual(playerArr, answerArr) && this.state.strict) {
        let playerTurn = false;
        let playerArr = [];
        let answerArr = [];
        this.setState({ answerArr, playerArr, playerTurn });
        setTimeout(() => {
          errorAudio.play();
        }, 700)
        setTimeout(() => {
          this.addNewColor();
        }, 1500);
      };
    };
  };

  addNewColor() {
    let answerArr;
    answerArr = this.state.answerArr;

    let newColor;
    let colorNum = Math.floor(Math.random() * 4);
    switch(colorNum){
      case 0:
        newColor = "G";
        break;
      case 1:
        newColor = "R";
        break;
      case 2:
        newColor = "Y";
        break;
      case 3:
        newColor = "B";
        break;
      default:
        break;
    };
    answerArr.push(newColor);
    this.setState({ answerArr });
    this.playArr(answerArr.length, answerArr, 750, 0);
  };

  playArr(n, answerArr, delay, index) {
    if (n > 0) {
      document.getElementById(answerArr[index]).click();
      if (n > 1) {
        setTimeout(() => {
        this.playArr(n - 1, answerArr, delay, index + 1);
          }, delay);
      }
    }
    if (n === 1) {
      let playerTurn = true;
      this.setState({ playerTurn });
    }
  };

  start() {
    if(this.state.answerArr.length === 0){
      setTimeout(() => this.addNewColor(), 250);
    } else if (this.state.answerArr.length > 0) {
        if (this.state.playerTurn === true) {
        this.setState({
          answerArr: [],
          playerArr: [],
          playerTurn: false
        });
        setTimeout(() => {
          this.addNewColor();
        }, 500);
      };
    };
  };

  render() {
    return (
      <div id="Simon">
        <div className="flex Simon__child">
          <div>
            <ColorButton handleClick={this.handleClick} color="G"/>
            <ColorButton handleClick={this.handleClick} color="R"/>
          </div>
          <div>
            <ColorButton handleClick={this.handleClick} color="Y"/>
            <ColorButton handleClick={this.handleClick} color="B"/>
          </div>
        </div>
        <h5 className="Simon__child count">Count: {this.state.answerArr.length}</h5>
        <div className="Simon__child">
          <Button color="primary" className="lower-button" onClick={() => {
                this.start();
              }}>{this.state.answerArr.length > 0 ? "Restart" : "Begin"}</Button>
          <Button color="primary" className="lower-button" onClick={() => {
              let strict = !this.state.strict;
              this.setState({ strict });
            }}>Strict: {this.state.strict ? "ON" : "OFF"}</Button>
        </div>
      </div>
    );
  }
};

export default Simon;