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
        }
    } catch(error){
        response.send(error)
    }
})

exports.addItem = functions.https.onRequest((req, res) => {
    return cors(req, res, () => {
        if(req.method !== 'POST'){
            return res.status(401).json({
                message: 'not allowed'
            })
        }
        console.log(req.body)
        const item = req.body.item
        database.push({ item });
        let items = [];

        return database.on('value', (snapshot) => {
            snapshot.forEach((item) => {
                items.push({
                    id: item.key,
                    items: item.val().item
                });
            });
        res.status(200).json(items)
        }, (error) => {
            res.status(error.code).json({
                message: `Something went wrongo. ${error.message}`
            })
        })
    })
})
