import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Landing } from '../views/Landing';
import { ContactUs } from '../views/ContactUs';
import Login from '../components/users/Login';
import Register from '../components/users/Register';
import PrivateRoute from '../private-routes/PrivateRoute';
import { Dashboard } from '../views/Dashboard';

import ListService from '../components/services/ListService';
import ListUser from '../components/users/ListUser';
import ListProduct from '../components/products/ListProduct';
import ListQuestion from '../components/faq/ListQuestion';
import ListPage from '../components/pages/ListPage';

import Profile from '../components/profile';
import Page from '../components/pages';

import AddPage from '../components/pages/AddPage';

import { QuestionAnswer } from '../views/QuestionAnswer';
import { PegGameBoard } from '../components/board';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Profile} />
        <Route path="/pegjump" component={PegGameBoard} />
        <Route path="/login" component={Login} />
        <Route path="/faq" component={QuestionAnswer} />
        <Route path="/3xcel" component={Landing} />
        <Route path="/page/:code" component={Page} />
        <Route path="/contact" component={ContactUs} />

        <PrivateRoute path="/add-user" component={Register} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/services" component={ListService} />
        <PrivateRoute path="/list-users" component={ListUser} /> 
        <PrivateRoute path="/products" component={ListProduct} />
        <PrivateRoute path="/faqs" component={ListQuestion} />
        <PrivateRoute path="/list-pages" component={ListPage} />

        <PrivateRoute path="/add-page" component={AddPage} />

      </Switch>
    </Router>
  );
};

export default Routes;
