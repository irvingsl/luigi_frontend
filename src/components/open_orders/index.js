import React, { Fragment, Component } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box } from "rbx";

import "../../styles/categories.scss";
import api from "../../services/api";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadRestaurants } from '../../actions/restaurant';
import { loadOrders } from '../../actions/open_orders';


import slickSettings from "./slick_settings";




class ListOrders extends Component {
  state = {
    openOrders: []
  }


  componentWillMount() {
    this.props.loadOrders();
  }

  render(){
    return (
      <Fragment>
        <h3 className="title is-size-4">Orders</h3>
        <Box>

          
          <Slider {...slickSettings}>
            {this.state.openOrders.map((openOrders, i) => {
              return (
                <a href="#" onClick={() => { this.filterByCategory(openOrders) } }>
                  <div className="slider-item" key={i}>
                    <span>{openOrders.title}</span>
                  </div>
                </a>
              )
            })}
          </Slider>



          
        </Box>
      </Fragment>
    )
  }
}

const mapStateToProps = store => ({
  address: store.addressState.address
});

const mapDispatchToProps = dispatch => bindActionCreators({ loadOrders }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ListOrders);