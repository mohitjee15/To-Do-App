Approach
============================
Based on the requirements given, visualized the design for the app.
Created HTML structure for the application.
Applied CSS to the HTML using SASS. (This app is responsive)
Before writing the JS code, went through the whole user flow in my mind.
Based on the user flow, started finishing each user story one by one.


Design
============================
The app is designed using the modular pattern. There are three js files for the app: app.js, main.js and config.js.

app.js is the heart of the application it contains all the logic for the application. It returns an object which exposes methods that can be called from other js files.

config.js contains the binding between various classes and ids, to their variable format. So basically config.js return an object where each property is mapped to a html selector. The reason for using this approach is that we will have a file which contains all the bindings and we wont have to look into the functions for the mappings, plus all the functions would be more generic this way.

main.js is the bootstrapping file for the application. It calls functions of app.js which are required to start the application. The values passed in these functions are properties of config object.

TODO
============================
Implementing drag drop to prioritize the task list.(Need to implement functionality same as jqueryui sortable using vanilla JS)
Writing test cases.
Implementing localStorage.
