import React from "react";

export default class Canvas extends React.Component {

  getBorder(selection) {
    switch (selection) {
      case "none":
        return(<path/>);
      case "border-fill":
        return(
          <path id="border_fill" d="M300,0C134.31,0,0,134.31,0,300S134.31,600,300,600,600,465.69,600,300,465.69,0,300,0Zm0,550.32C161.75,550.32,49.68,438.25,49.68,300S161.75,49.68,300,49.68,550.32,161.75,550.32,300,438.25,550.32,300,550.32Z"/>
        );
      case "inner-stroke":
        return(
          <circle id="inner_stroke" cx="300" cy="300" r="250.32" style="fill: #fff;stroke: #000;stroke-miterlimit: 10"/>
        );
      case "center-fill":
        return(
          <path id="mid_fill" d="M49.7,134.6a300.07,300.07,0,0,0,0,330.81H550.3a300.07,300.07,0,0,0,0-330.81Z"/>
        );
      case "edge-fill":
        return(
          <g>
            <path id="lower_fill" d="M49.7,465.4C103.4,546.5,195.45,600,300,600s196.6-53.5,250.3-134.6Z"/>
            <path id="upper_fill" d="M550.3,134.6C496.6,53.5,404.55,0,300,0S103.4,53.5,49.7,134.6Z"/>
          </g>
        );
      default:
        return(<path/>);
    }
  }

  render() {
    return (
      <div class="canvas-wrap">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
          <title>sticker_template</title>
          <g id="Layer_2" data-name="Layer 2">
            <g id="Layer_1-2" data-name="Layer 1">
              <circle id="edge" cx="300" cy="300" r="300" style={{fill:this.props.primaryColor}}/>
              {this.getBorder(this.props.border)}
            </g>
          </g>
        </svg>
      </div>
    )
  }
}
