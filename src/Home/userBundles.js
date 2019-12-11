import React, { useState } from 'react'
import { withFirebase } from '../Firebase'

let done = true
const UserBundles = (props) => {
    const [userInfo, setUserInfo] = useState('')
    


    props.firebase.auth.onAuthStateChanged((user) => {
        if (user && done) {
        console.log('user is logged');
        setUserInfo(user.uid)
        done = false
        }
    })


    
    return(
    <div> {userInfo} </div>
    )
    
}

export default withFirebase(UserBundles)
