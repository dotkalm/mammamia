import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { withFirebase } from '../Firebase'
import { MainContentStyle } from './style'
import Post from '../Post'
import NavBar from '../NavBar'
import Selector from './Selector'
//import Sorters from './Sorters'

const Home = (props) => {
    const [ uiButton, setUIButton] = useState({
        tag: false,
    })
    const [ truth, setTruth ] = useState(false)
    const [ done, setDone ] = useState(true)
    const [ user, setUser ] = useState({ 
        username: props.user.username,
        email: '',
        uid: props.uid,
        lat: '',
        lng: '',
        city: '',
        state: '',
        ip: '',
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
        }
    }, [props.user, truth])

    const onSubmit = event => {
        event.preventDefault()
    }
    const onClick = event => {
        const booleanState = uiButton[event.currentTarget.name]
        setUIButton({...uiButton, [event.currentTarget.name]: !booleanState})
    }
        return(
        <div>
            <NavBar onSubmit={onSubmit} onClick={onClick} uiButton={uiButton}/>
            {!uiButton.tag ? <Selector/> : ''}
            <MainContentStyle>
           {!uiButton.tag ? '' : ''}
            { user.username || props.user.username ? `WELCOME ${user.username || props.user.username}` : ''
            }            
            { props.user.city ? ` Welcome from ${props.user.city}` : ''} 
            {uiButton.tag ? <Post dims={props.dims}/> : ''}
            </MainContentStyle>
        </div>

    )
}

const HomeForm = withRouter(withFirebase(Home))
export default HomeForm

