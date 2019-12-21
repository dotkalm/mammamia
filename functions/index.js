const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase I SEE U!");
});

exports.ping = functions.https.onRequest((request, response) => {
    try{
        console.log(request)
        response.send("ping")
    } catch(error){
        response.send(error)
    }
})
