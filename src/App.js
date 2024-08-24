import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import { Provider } from 'react-redux';
import MainContent from './components/Content/MainContent';
import Footer from './components/Footer/Footer';
import "./assets/index.scss";
import LoadingPage from './components/Loading/LoadingPage';
import { loadUserAuth } from './actions/auth'; // Подставьте правильные импорты ваших экшенов
import { connect } from 'react-redux';
import { store } from './store';
import Login from './components/Auth/Login';
import { loadCategories } from './actions/categories';
import LoginPage from './components/pages/LoginPage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    this.props.loadUserAuth(); // Вызываем экшен для загрузки авторизации
    this.props.loadCategories();
  }

  render() {
    const { auth } = this.props;
    return (

          auth.loading ? (
            <LoadingPage effload={true} />
          ) : (
            <div className="App">
              <Header show={auth.auth}/>
              {
                auth.auth ? <MainContent /> : <LoginPage />
              }
              {/* <MainContent /> */}
              
              <Footer />
            </div>
          )

    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth 
});

const mapDispatchToProps = {
  loadUserAuth,
  loadCategories
};

export default connect(mapStateToProps, mapDispatchToProps)(App);