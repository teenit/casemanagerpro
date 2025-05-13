import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
import { store } from './store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import 'moment/locale/uk'; // або 'moment/locale/ru'

moment.locale('uk');
const rootElem = document.getElementById('root');
const root = ReactDOM.createRoot(rootElem);


root.render(
    <BrowserRouter>
    <Provider store={store}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <App />
        </LocalizationProvider>
    </Provider>
    </BrowserRouter>
);

reportWebVitals();
