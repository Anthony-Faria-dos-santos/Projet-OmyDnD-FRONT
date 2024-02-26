import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store'
import App from './Components/App/App.jsx'
import '../src/styles/index.scss'
import 'semantic-ui-css/semantic.min.css'
import 'jquery'; // Import jQuery
import 'semantic-ui-css/semantic.min.js'; // Import Semantic UI JavaScript

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
