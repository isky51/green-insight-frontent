import { render } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';

describe('App', () => {
  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });
});
