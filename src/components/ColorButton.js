import React from 'react';
import { Button } from 'reactstrap';

class ColorButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tone: null,
      darker: null,
      lighter: null,
      bg: null,
    }
  }

  componentDidMount(){
    if (this.props.color === "G") {
      let tone = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
      let lighter = "green";
      let darker = "#004d00";
      let bg = lighter;
      this.setState({ tone, darker, lighter, bg });
    };
    if (this.props.color === "R") {
      let tone = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
      let lighter = "red";
      let darker = "#b30000";
      let bg = lighter;
      this.setState({ tone, darker, lighter, bg });
    };
    if (this.props.color === "Y") {
      let tone = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
      let lighter = "yellow";
      let darker = "#cccc00";
      let bg = lighter;
      this.setState({ tone, darker, lighter, bg });
    };
    if (this.props.color === "B") {
      let tone = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
      let lighter = "blue";
      let darker = "#000099";
      let bg = lighter;
      this.setState({ tone, darker, lighter, bg });
    };
  };

  render() {
    let bg = this.state.bg;
    return (
      <div>
        <Button
          color="default"
          className="color-button"
          style={{backgroundColor: bg}}
          onClick={() => {
            this.state.tone.play().catch((e) => {console.log(e);});
            this.setState({ bg: this.state.darker });
            setTimeout(() => {this.setState({ bg: this.state.lighter })}, 250);
            this.props.handleClick(this.props.color);
          }}
          id={this.props.color}></Button>
      </div>
    );
  }
};

export default ColorButton;