import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import { Provider } from 'react-redux';
import MainContent from './components/Content/MainContent';
import Footer from './components/Footer/Footer';
import './assets/index.scss';
import LoadingPage from './components/Loading/LoadingPage';
import { loadUserAuth } from './actions/auth';
import { connect } from 'react-redux';
import { store } from './store';
import Login from './components/Auth/Login';
import { loadCategories } from './actions/categories';
import LoginPage from './components/pages/LoginPage';
import MobileNavigation from './components/MobileNavigation/MobileNavigation';
import ScrollToTop from './assets/components/ScrollTop/ScrollTop';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      isMobile: false, // Додаємо стан для перевірки мобільного пристрою
    };
  }

  componentDidMount() {
    this.props.loadUserAuth(); // Викликаємо екшен для завантаження авторизації
    this.props.loadCategories();

    // Перевірка на мобільний пристрій
    this.setState({ isMobile: window.innerWidth <= 768 }); // Визначаємо, чи пристрій мобільний за шириною екрану
  }

  render() {
    const { auth } = this.props;
    const { isMobile } = this.state; // Отримуємо значення isMobile зі стану
    return (
      auth.loading ? (
        <LoadingPage effload={true} />
      ) : (
        <div className="App">
          <ScrollToTop />
          <Header show={auth.auth} />
          {auth.auth ? <MainContent /> : <LoginPage />}
          <Footer />
          {isMobile && <MobileNavigation />} {/* Відображаємо MobileNavigation тільки на мобільних пристроях */}
        </div>
      )
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  loadUserAuth,
  loadCategories,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
