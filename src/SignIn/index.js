import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { withFirebase } from '../Firebase'
import { SignInStyle, ImgContainer } from './style.js'
import * as ROUTES from '../constants/routes'

const SignIn = (props) => {
    const [user, setUser] = useState({
    password:'',
    uid: '',    
    email:''});

    const onChange = event => {
        setUser({...user, [event.target.name]: event.target.value})
    }

    const onClick = event => {
        props.history.push(ROUTES.SIGN_UP)
    }
    const onSubmit = async event => {
        const { email, password } = user
        event.preventDefault()
        props.firebase.doSignInWithEmailAndPassword(email, password)
        .then(authUser => {
            return authUser.user.uid
        })
         .then(uid => {
            return props.firebase.db.collection('users').doc(uid).get()
        })
        .then(async function(doc){
            console.log(doc.data())
            props.passUserInfo(doc.data())
            props.history.push(ROUTES.HOME)
            return doc.data()
        })
        .catch(err => console.log(err))
    }
    return(
       <ImgContainer>
            <div id="eek">
                <div id="box">
                    <img src="./61155_BCW.jpg" alt="placeholder box"/>
                </div>
                <span id="title"> Momma Mia </span>
            </div>
            <SignInStyle>
                <form onSubmit={onSubmit}>
                    <input 
                        name='email'
                        value={user.email}
                        onChange={onChange}
                        type='text'
                        placeholder='Email Address'
                    />
                    <input 
                        name="password"
                        value={user.password}
                        onChange={onChange}
                        type="password"
                        placeholder="Password"
                    />

                    <button type='submit'>Sign In</button>
                {user.error && user.error.message}
                </form>
            </SignInStyle>
        <div id='noAccount' onClick={onClick}> No Account? Register Here </div>

        </ImgContainer>
    )
}
const SignInForm = withRouter(withFirebase(SignIn))

export default SignInForm
