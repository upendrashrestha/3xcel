import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Landing } from '../views/Landing';
import { Page } from '../components/pages';
import { ContactUs } from '../views/ContactUs';
import Login from '../components/users/Login';
import Register from '../components/users/Register';
import PrivateRoute from '../private-routes/PrivateRoute';
import { Dashboard } from '../views/Dashboard';
import ListService from '../components/services/ListService';
import ListUser from '../components/users/ListUser';
import AddProduct from '../components/products/AddProduct';
import ListProduct from '../components/products/ListProduct';
import AddQuestion from '../components/faq/AddQuestion';
import ListQuestion from '../components/faq/ListQuestion';
import { QuestionAnswer } from '../views/QuestionAnswer';

import { PegGameBoard } from '../components/board';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={PegGameBoard} />
        <Route path="/page" component={Page} />
        <Route path="/pegboard" component={PegGameBoard} />
        <Route path="/login" component={Login} />
        <Route path="/faq" component={QuestionAnswer} />
        <Route path="/3xcel" component={Landing} />
        <Route path="/contact" component={ContactUs} />

        <PrivateRoute path="/add-user" component={Register} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/add-service" component={ListService} /> 
        <PrivateRoute path="/list-services" component={ListService} />
        <PrivateRoute path="/list-users" component={ListUser} />
        <PrivateRoute path="/add-product" component={AddProduct} /> 
        <PrivateRoute path="/list-products" component={ListProduct} />
        <PrivateRoute path="/add-question" component={AddQuestion} /> 
        <PrivateRoute path="/list-faq" component={ListQuestion} />

      </Switch>
    </Router>
  );
};

export default Routes;
