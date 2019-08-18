import React, { Component, Fragment } from 'react';
import { Title, Box, Column, Image, Icon } from "rbx";
import { FaStar } from "react-icons/fa";

import api from "../../services/api";

import CategoryProducts from "../../components/category_products";

import FacebookAuth from 'react-facebook-auth';
import "../../styles/restaurant.scss";

class ShowAdmin extends Component {
  state = {
    restaurant: {}
  }

  componentWillMount() {
    api.getRestaurant(1).then(response => {
      this.setState({ restaurant: response.data.restaurant })
    });
  }

 


MyFacebookButton = ({ onClick, styles }) => 

(
  <button onClick={onClick} style={styles}>
    Login with facebook
  </button>
);

authenticate = response => {
  console.log(response);
};

  render() {
    return  <Fragment>
              <Box>
                <Column.Group>
                  <Column size={3}>
                    <Image src={this.state.restaurant.image_url} />
                  </Column>
                  <Column size={7}>
                    <p>{this.state.restaurant.description}</p>
                    <footer>
                      <span className="dashed_box">Entrega ${this.state.restaurant.delivery_tax}</span>
                      <span>
                        <Icon size="medium" color="warning">
                          <FaStar />
                        </Icon>
                        <FacebookAuth
      appId="2358315551153635"
      callback={this.authenticate}
      component={this.MyFacebookButton}
      
    />
                        <span className="has-text-warning has-text-weight-bold">{this.state.restaurant.review || 4.7}</span>
                      </span>
                    </footer>
                  </Column>
                </Column.Group>
              </Box>
            </Fragment>
  }
}

export default ShowAdmin;