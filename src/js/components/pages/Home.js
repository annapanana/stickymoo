import React from "react";
import { Button, ControlLabel, FormControl } from 'react-bootstrap';
import '../../../sass/components/pages/home.sass'
import Canvas from "./Canvas.js"

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: "cheese",
      icons: [],
      composition: {
        selectedIcon: "",
        primaryColor: "#000",
        secondaryColor: "#fff",
        border: "border-fill"
      }
    }
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  triggerIconSearch() {
    const self = this;
    $.ajax({
      url: `http://localhost:8000/api/icons/${this.state.value}`,
      method: 'GET',
      dataType: 'json',
      data: {}
    }).done((data) => {
      self.setState({icons:data})
    }).fail((xhr, textStatus, errorThrown) => {
      console.error(errorThrown);
    });
  }

  selectIcon(iconURl) {
    let composition = this.state.composition;
    composition.selectedIcon = iconURl;
    this.setState({composition:composition});
  }

  displayIcons(icons) {
    return icons.map((icon, key) => {
      return (
        <div key={key} onClick={this.selectIcon.bind(this, icon.preview_url_84)}>
          <img class={"display-icon" + (this.state.composition.selectedIcon === icon.preview_url_84?" selected":"")} src={icon.preview_url_84} alt={icon.attribution}/>
        </div>
      )
    });
  }

  render() {
    return (
      <div>
        <div class=" container home-wrap">
          <form>
             <ControlLabel>Input Search Term</ControlLabel>
               <FormControl
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
          <Button bsStyle="default" onClick={this.triggerIconSearch.bind(this)}>Submit</Button>
          </form>
          {
            this.state.icons.length > 0 &&
              <div class="customizer">
                <h4>Select Icon</h4>
                <div class="icon-selection">
                  {this.displayIcons(this.state.icons)}
                </div>
              </div>
          }
          <Canvas {...this.state.composition}/>
        </div>
      </div>
    );
  }
}
