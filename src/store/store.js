import { createStore } from 'redux';
import reducer from './reducers';

const storage = createStore(reducer);

export default storage;