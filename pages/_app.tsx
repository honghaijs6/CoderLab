// STYLES
import 'styles/globals.scss';
import 'styles/textTyping.scss';
import "styles/playground.scss";

// LIBS
import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { AppProps } from 'next/app';

// IMPLEMENT CONCRETE
const App = ({ Component, pageProps }: AppProps) => (
  <SessionProvider session={pageProps.session}>
    <Component {...pageProps} />
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
  </SessionProvider>
);

export default App;