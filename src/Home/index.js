import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { withFirebase } from '../Firebase'
import { HomeStyle } from './style'

const Home = (props) => {
    const [ truth, setTruth ] = useState(false)
    const [ done, setDone ] = useState(true)
    const [ user, setUser ] = useState({ 
        username: props.user.username,
        email: '',
        uid: props.uid 
    })
    
    if(user.uid !== '' && done){
        const docRef = props.firebase.db.collection("users").doc(user.uid) 
        docRef.get().then(function(doc) {
            if(doc.exists){
                const userData = doc.data()
                setUser({...user, username: userData.username,
                email: userData.email})
                setDone(false)
            }
            else{
                console.log("not here")
            }
        })
    }
    useEffect(() => {
        if(!truth){
            setUser({...props.user})
            setTruth(true)
            console.log(user, " inside use effect")
        }
    }, [props.user, truth])

    return(
        <HomeStyle> 

        { user.username || props.user.username ? `WELCOME ${user.username || props.user.username}` : 'wowow'
        }            
        { props.user.city ? ` Welcome from ${props.user.city}` : 'where r u from?'} 
        PIN GOES HERE
        Search LOCALLY
        SHIP
        <div> CLICK DIS </div>
        </HomeStyle>

    )
}

const HomeForm = withRouter(withFirebase(Home))
export default HomeForm
