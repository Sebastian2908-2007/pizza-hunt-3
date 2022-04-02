// create variable to hold db connection
let db;
// establish a connection to IndexedDb database called pizza_hunt_3 and set it to version 1
const request = indexedDB.open('pizza_hunt_3',1);
// this event will emit if the database version changes (nonexistent to version 1, v1 to v2, etc.)
request.onupgradeneeded = function(event) {
    // save areference to the database
    const db = event.target.result;
    // create an o;bject store (table) called 1new_pizza` , set it to have an auto incrementing primary key of sorts
    db.createObjectStore('new_pizza',{ autoIncrement: true });
};

request.onsuccess = function(event) {
    // when db is succesfully created with its object store (from onupgradeneeded event above) or simply established a connection, save a reference to; db in the global variable
    db = event.target.result;

    // check if app is online. if yes run uploadPizza() funtion to send all local db data to the api
    if(navigator.onLine) {
         //we havent made this yet
          uploadPizza();
    }
};

request.onerror = function(event) {
    // log error here
    console.log(event.target.errorCode);
}

// this function wil be executed if we attempt to submit a new pizza and theres no internet connection
 function saveRecord(record) {
     // open new transaction with the database with read and write permissions
     const transaction = db.transaction(['new_pizza'],'readwrite');

     // acess the object store for 1new_pizza
     const pizzaObjectStore = transaction.objectStore('new_pizza');

     // add record to; your store with add method
     pizzaObjectStore.add(record);
 }

 function uploadPizza() {
     console.log(db);
     // open a transaction on your db
       const transaction = db.transaction(['new_pizza'], 'readwrite');  

     // access your object store
     const pizzaObjectStore = transaction.objectStore('new_pizza');

     // get all records from store and set a to a  variable
     const getAll = pizzaObjectStore.getAll();

     // upon a successfull .getAll() execution run this function
     getAll.onsuccess = function()  {
           if (getAll.result.length > 0) {
               fetch('/api/pizzas', {
                   method: 'POST',
                   body: JSON.stringify(getAll.result),
                   headers: {
                       Accept: 'application/json, text/plain, */*',
                       'Content-Type': 'application/json' 
                   }
               })
               .then(response => response.json())
               .then(serverResponse => {
                   if (serverResponse.message) {
                       throw new Error(serverResponse);
                   }
                   // open one more transaction
                   const transaction = db.transaction(['new_pizza'], 'readwrite');
                   // access the new_pizza object sto;re
                   const pizzaObjectStore = transaction.objectStore('new_pizza');
                   // clear all items in your store
                   pizzaObjectStore.clear();
                   alert('All saved pizzas have beeen submitted!');
               })
               .catch(err => {
                   console,log(err);
               })

           }
     }
 }

 // listen for app coming back online
 window.addEventListener('online',uploadPizza);