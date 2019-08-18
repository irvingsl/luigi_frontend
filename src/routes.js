import React from 'react'
import { Router, Switch, Route } from 'react-router-dom'

import Home from './screens/home';
import Restaurants from './screens/restaurants';
import ShowRestaurant from './screens/show_restaurant';
import ShowExactRestaurant from './screens/show_exact_restaurant';
import CreateOrder from './screens/create_order';
import ShowOrder from './screens/show_order';
import ShowAdmin from './screens/admin';
import ShowOrders from './screens/show_open_orders';
import history from './history';

const Routes = () => (
  <Router history={history}>
    <Switch>
      <Route exact path='/' component={ShowExactRestaurant}  />
      <Route exact path='/restaurants' component={Restaurants} />
      <Route exact path='/restaurants/:id' component={ShowRestaurant} />      
      <Route exact path='/teste' component={Home} />
      <Route exact path='/orders/new' component={CreateOrder} />
      <Route exact path='/orders/:id' component={ShowOrder} />
      <Route exact path='/admin' component={ShowAdmin} />
      <Route exact path='/orders' component={ShowOrders} />
    </Switch>
  </Router>
)

export default Routes;