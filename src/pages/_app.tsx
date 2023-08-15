import { AppProps } from 'next/app';
import { store } from '../../redux/app/store';
import { Provider } from 'react-redux';
import '@styles/styles.scss';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Provider store={store}>
    <Component {...pageProps} />
  </Provider>
);

export default MyApp;
