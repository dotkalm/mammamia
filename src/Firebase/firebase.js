import app from 'firebase/app';
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/functions'


const config = {
    apiKey: ,
    authDomain: "mamma-mia-1.firebaseapp.com",
    databaseURL: "https://mamma-mia-1.firebaseio.com",
    projectId: "mamma-mia-1",
    storageBucket: "mamma-mia-1.appspot.com",
    messagingSenderId: "1027694821428",
    appId: "1:1027694821428:web:0d4c48be7e9b7e8158ca61"
};
class Firebase {
  constructor() {
    app.initializeApp(config)
    this.auth = app.auth()
    this.db = app.firestore()
    this.storage = app.storage()
    this.functions = app.functions()
  }
    doCreateUserWithEmailAndPassword = (email, password) => {
        return  this.auth.createUserWithEmailAndPassword(email, password)
  }
    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password)

    doSignOut = () => this.auth.signOut()

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email)
  
    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password)
        user = uid => this.db.ref(`users/${uid}`)
        users = () => this.db.ref('users')




}
export default Firebase


