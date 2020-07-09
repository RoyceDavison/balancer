import * as firebase from "firebase";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBPx5bj2c9Vv5hWBYlDeeohAjJ5QPfHD4c",
  authDomain: "expensify-50c62.firebaseapp.com",
  databaseURL: "https://expensify-50c62.firebaseio.com",
  projectId: "expensify-50c62",
  storageBucket: "expensify-50c62.appspot.com",
  messagingSenderId: "982909049919",
  appId: "1:982909049919:web:d047166c08b608d4f6ac8a",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

//if the data is removed, the event will be triggered
database.ref("expenses").on("child_removed", (snapshot) => {
  console.log(snapshot.key, snapshot.val());
});

//if the data is changed, the event will be fired
database.ref("expenses").on("child_changed", (snapshot) => {
  console.log(snapshot.key, snapshot.val());
});

database.ref("expenses").on(
  "value",
  (snapshot) => {
    const expenses = [];

    snapshot.forEach((childSnapshot) => {
      expenses.push({
        id: childSnapshot.key,
        ...childSnapshot.val(),
      });
    });
  },
  (err) => {
    console.log(err);
  }
);

// database
//   .ref("expenses")
//   .once("value")
//   .then((snapshot) => {
//     const expenses = [];

//     snapshot.forEach((childSnapshot) => {
//       expenses.push({
//         id: childSnapshot.key, //这个key就是"-MBXpPDC4uveJPS3r7CP"
//         ...childSnapshot.val(),
//       });
//     });
//     console.log(expenses);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

/*************************************/
/********** PUSH() for array *********/
/*************************************/
// database.ref("expenses").push({
//   description: "expense1",
//   note: "buy coffee",
//   amount: 4,
//   createdAt: 1,
// });

// database.ref("expenses").push({
//   description: "expense2",
//   note: "buy house",
//   amount: 666666,
//   createdAt: 5,
// });

// database.ref("expenses").push({
//   description: "expense3",
//   note: "phone bill",
//   amount: 40,
//   createdAt: 10,
// });

// const firebaseNotes = {
//   notes: {
//     asdfjio: {
//       title: "First Note",
//       body: "hello my world!",
//     },
//     sadqwe: {
//       title: "Second Note",
//       body: "!Yoooo!",
//     },
//   },
// };

// //这种array是不行的，得用push存上述的firebaseNote格式
// const notes = [
//   {
//     id: "asdfjio",
//     title: "First Note",
//     body: "hello my world!",
//   },
//   {
//     id: "sadqwe",
//     title: "Second Note",
//     body: "!Yoooo!",
//   },
// ];

/*******************************/
/********** ONCE() **************/
/** Fetch data from the database **/
// database
//   .ref()
//   .once("value")
//   .then((snapshot) => {
//     const val = snapshot.val();
//     console.log(val);
//   })
//   .catch((err) => console.log(err));

/************** One() **************/
/** Fetch data from the database **/
// const onValueChanged = database.ref().on(
//   "value",
//   (snapshot) => {
//     const val = snapshot.val();
//     console.log(val);
//   },
//   (e) => console.log(e)
// );

// setTimeout(() => {
//   database.ref("age").set(40);
// }, 2000);

// setTimeout(() => {
//   database.ref().off("value", onValueChanged);
// }, 3000);

// setTimeout(() => {
//   database.ref("age").set(41);
// }, 5000);
/*******************************/
/********** SET() **************/
/*******************************/
// database
//   .ref()
//   .set({
//     name: "Michael",
//     age: 31,
//     isSingled: true,
//     location: {
//       city: "Philadelphia",
//       country: "USA",
//     },
//   })
//   .then(() => {
//     console.log("Data is saved.");
//   })
//   .catch((err) => console.log(err));

// database.ref("age").set(35);
// database.ref("location/city").set("New York");
// database.ref("attributes").set({
//   height: 180,
//   weight: 70,
// });

/*******************************/
/********** REMOVE() **************/
/*******************************/
// database
//   .ref("isSingled")
//   .remove()
//   .then(() => {
//     console.log("The data is removed");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

//equivalently to the remove()
//database.ref("isSingled").set(null);

/*******************************/
/********** UPDATE() ***********/
/*******************************/
//must pass object, update is differerent from set in that it can change multiple properties
// database.ref().update({
//   name: "Johnson",
//   age: 29,
//   job: "software developer",
//   isSingled: null, //remove it
// });

// database.ref().update({
//   job: "Manager",
//   "location/city": "Boston",
// });
