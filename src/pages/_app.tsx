import { AppProps } from 'next/app';
import { store } from '../redux/app/store';
import { Provider } from 'react-redux';
import '@styles/styles.scss';
import { SessionProvider } from 'next-auth/react';
import type { TypeOptions } from 'react-toastify';
import dynamic from 'next/dynamic';
import { WrapperLayout } from 'layouts/WrapperLayout';

const ToastContainer = dynamic(
  () =>
    import('react-toastify').then((comps) => ({
      default: comps.ToastContainer,
    })),
  { suspense: true },
);

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Provider store={store}>
    <SessionProvider session={pageProps.session}>
      <WrapperLayout>
        <Component {...pageProps} />
        <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </WrapperLayout>
    </SessionProvider>
  </Provider>
);

export default MyApp;
