import React from 'react';
import News from '../pages';
import { Provider } from 'react-redux';
import { store } from '../strore';

const App: React.FC = () => (
  <Provider store={store}>
    <News />
  </Provider>
);

export default App;