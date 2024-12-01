import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import { ContextProvider } from './contexts/ContextProvider';

import { Provider} from "react-redux";

import store from './redux/store';

import { PersistGate } from 'redux-persist/integration/react';

import { persistor } from './redux/store';

import toast, { Toaster } from 'react-hot-toast';

ReactDOM.render(
  <React.StrictMode>

    <Provider store={store}>
      {/* PersistGate delays rendering until persistence is complete */}
      <PersistGate loading={null} persistor={persistor}>
        <ContextProvider>
          <Toaster />
          <App />
        </ContextProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
