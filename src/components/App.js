import React from 'react';
import TitleBar from './TitleBar';
import Simon from './Simon';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      winner: false
    };
    this.toggleWinner = this.toggleWinner.bind(this);
  }

  toggleWinner() {
    let winner = !this.state.winner;
    this.setState({ winner });
  }

  renderPlayArea() {
    if (this.state.winner === false) {
      return (
        <Simon toggleWinner={this.toggleWinner}/>
      );
    } else {
      setTimeout(() => {
        let winner = false;
        this.setState({ winner });
      }, 5000);
      return (
        <h2>You Win!!!</h2>
      );
    }
  }

  render() {
    return (
      <div>
        <TitleBar/>
        {this.renderPlayArea()}
      </div>
    );
  }
};

export default App;
