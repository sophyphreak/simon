import React from 'react';


class TitleBar extends React.Component {
  render() {
    return(
      <div className="flex-column">
        <h1 className="title">Simon Game</h1>
        <h6 className="title subtitle">Created by Andrew Horn</h6>
      </div>
    );
  }
};

export default TitleBar;