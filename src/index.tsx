import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import store from "./store/redux-store";
import {ChakraProvider} from '@chakra-ui/react';


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <ChakraProvider><App/></ChakraProvider>
        </BrowserRouter>
    </Provider>
);

