import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './app';
import { BrowserRouter } from "react-router-dom";

import * as serviceWorker from "./serviceWorkerRegistration"

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

serviceWorker.register();