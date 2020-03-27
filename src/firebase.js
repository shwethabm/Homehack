import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyBbJrhBSj3QC924fQkbRY-L2FYuPutsanA',
  authDomain: 'intcom-a33ee.firebaseapp.com',
  databaseURL: 'https://intcom-a33ee.firebaseio.com',
  storageBucket: 'intcom-a33ee.appspot.com'
};

firebase.initializeApp(config);

const database = firebase.database();

export {
  database,
};