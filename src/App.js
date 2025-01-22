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
import { loadFields } from './actions/fields';
import Menu from './components/newDesign/Menu/Menu';
import HorisontalMenu from './components/newDesign/Menu/HorisontalMenu';

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
    

    // Перевірка на мобільний пристрій
    this.setState({ isMobile: window.innerWidth <= 768 }); // Визначаємо, чи пристрій мобільний за шириною екрану
  }

  componentDidUpdate(prewProps, prewState){
    if (prewProps.auth.auth !== this.props.auth.auth) {
      this.props.loadCategories();
      this.props.loadFields();
    }
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
          {/* <Header show={auth.auth} /> */}
          <div className='App-content'>
            {auth.auth ? <Menu /> : <div></div>}
            <div className='App-content-right'>
              {auth.auth && <div className='App-control'>
                <HorisontalMenu isMobile={isMobile}/>
              </div>}
            {auth.auth ? <MainContent /> : <LoginPage />}
            {auth.auth && <Footer />}
            </div>
            
          </div>
          
          
          {isMobile && false && <MobileNavigation />} {/* Відображаємо MobileNavigation тільки на мобільних пристроях */}
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
  loadFields
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
