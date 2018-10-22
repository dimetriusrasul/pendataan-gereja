import './polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import firebase from "firebase";

var config = {
  apiKey: "AIzaSyBrhSWp3nQa7CX3pIpQp3npJfswvw4LkIg",
  authDomain: "pendataan-jemaat-gkkd.firebaseapp.com",
  databaseURL: "https://pendataan-jemaat-gkkd.firebaseio.com",
  projectId: "pendataan-jemaat-gkkd",
  storageBucket: "pendataan-jemaat-gkkd.appspot.com",
  messagingSenderId: "35353163463"
};
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
