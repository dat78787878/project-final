import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './main.css';

import App from './app/app';
import { store } from './redux/store';

import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ChakraProvider>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <ToastContainer
          position="bottom-left"
          hideProgressBar
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
        />
      </BrowserRouter>
    </Provider>
  </ChakraProvider>
);
