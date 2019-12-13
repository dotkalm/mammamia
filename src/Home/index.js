import React from 'react'
import { withRouter } from 'react-router-dom'
import { withFirebase } from '../Firebase'
import { MainContentStyle } from './style'
import UserBundleWundles from './bundleWundles'

const Home = (props) => {

    if(props.category !== 'home'){
        props.changeCategory('home')
    } 
        return(
        <div>
            <MainContentStyle>
            { props.user.username ? `WELCOME ${props.user.username}` : ''
            }            
            { props.user.city ? ` Welcome from ${props.user.city}` : ''} 
            </MainContentStyle>
            <UserBundleWundles user={props.user} /> 
        </div>

    )
}

const HomeForm = withRouter(withFirebase(Home))
export default HomeForm

