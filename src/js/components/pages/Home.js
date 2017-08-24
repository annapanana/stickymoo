import React from "react";
import { Button, ControlLabel, FormControl } from 'react-bootstrap';
import '../../../sass/components/pages/home.sass'

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: "penguins",
      icons: []
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

  displayIcons(icons) {
    return icons.map((icon, key) => {
      return (
        <div key={key}>
          <img src={icon.preview_url_84} alt={icon.attribution}/>
        </div>
      )
    });
  }

  render() {
    return (
      <div>
        <div class="home-wrap">
          <form>
             <ControlLabel>Input Search Term</ControlLabel>
               <FormControl
              type="text"
              value={this.state.value}
              placeholder="Enter text"
              onChange={this.handleChange}
            />
          <Button bsStyle="default" onClick={this.triggerIconSearch.bind(this)}>Submit</Button>
          </form>
          {
            this.state.icons.length > 0 &&
              this.displayIcons(this.state.icons)
          }
        </div>
      </div>
    );
  }
}
