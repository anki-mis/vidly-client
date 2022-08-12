//import logo from './logo.svg';
import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import NavBar from "./components/navBar";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/common/loginForm";
import RegisterForm from "./components/registerForm";
import Logout from "./components/common/logout";
import ProtectedRoute from "./components/common/protectedRoute";
import auth from "./services/authService";
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";


class App extends Component {

  state={};

  componentDidMount() {
     const user = auth.getCurrentUser();
     this.setState({ user });   
  }

  render() {
  return (
    //<main className="container">
    <React.Fragment>
      <ToastContainer />
      <BrowserRouter>
        <NavBar user={this.state.user}/>
        <div className="content">
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <ProtectedRoute path="/movies/:id" component={MovieForm} />
            <Route path="/movies" render={props => <Movies {...props} user={this.state.user} />} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Redirect exact from="/" to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </BrowserRouter>
    </React.Fragment>
    //</main>
  );
  }
}

export default App;
