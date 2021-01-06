// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "appkey",
    authDomain: "projectid.firebaseapp.com",
    databaseURL: "database url",
    projectId: "projectid",
    storageBucket: "projectid.appspot.com",
    messagingSenderId: "msgid",
    appId: "appid",
    measurementId: "mesurementid"
  }
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  let db = firebase.database();
  let fdb = firebase.storage()
  
  $('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
  })