import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Landing } from '../views/Landing';
import { Page } from '../components/pages';
import { ContactUs } from '../views/ContactUs';
import Login from '../components/users/Login';
import Register from '../components/users/Register';
import PrivateRoute from '../private-routes/PrivateRoute';
import { Dashboard } from '../views/Dashboard';
import AddService from '../components/services/AddService';
import ListService from '../components/services/ListService';
import ListUser from '../components/users/ListUser';
import EditService from '../components/services/EditService';
import AddProduct from '../components/products/AddProduct';
import ListProduct from '../components/products/ListProduct';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/page" component={Page} />
        <Route path="/login" component={Login} />
        
        <Route exact path="/contact" component={ContactUs} />
        <PrivateRoute path="/add-user" component={Register} />
        <PrivateRoute path="/dashboard" component={Dashboard} />

        <PrivateRoute path="/add-service" component={ListService} /> 
        <PrivateRoute path="/list-services" component={ListService} />

        <PrivateRoute path="/list-users" component={ListUser} />

        <PrivateRoute path="/add-product" component={AddProduct} /> 
        <PrivateRoute path="/list-products" component={ListProduct} />
      </Switch>
    </Router>
  );
};

export default Routes;
