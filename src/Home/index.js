import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { withFirebase } from '../Firebase'
import { HomeStyle, SelectorStyle, MainContentStyle } from './style'
import Mag from './mag'
import Person from './person'
import Pin from './pin'

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
        }
    }, [props.user, truth])

    const onSubmit = event => {
        event.preventDefault()
    }
        return(
        <div>
            <HomeStyle> 
                <nav> 
                    <span className="top-left">
                    {Person()}
                    </span>
                    <span className="top">
                        <span className="top_1">
                        </span>
                        <span className="top_2">
                            {Mag()}
                        <form onSubmit={onSubmit}>
                            <input id='search1' placeholder='Momma Mia'
                                type="text"
                                name="searchAll"/>
                            <span id="div_btwn">
                                {Pin()}
                            </span>
                            <input id='search2'placeholder='Nearby'
                                type="text"
                                name="searchNearby"/>
                            <button type="submit">
                                Go 
                            </button>
                        </form>
                        </span>
                        <span className="top_3">
                        </span>
                    </span>
                    <span className="top-right">
                        <span id="space-top-right">
                            Santa Monica, CA
                        </span>
                        <span className="menu">
                            <div id="topMenu"></div>
                            <div id="pink"></div>
                            <div id="topMenu"></div>
                            <div id="pink"></div>
                            <div id="topMenu"></div>
                        </span>
                    </span>
                </nav>
            </HomeStyle>
            <div className="clearFix"></div>
            <SelectorStyle>
                    <span className="selector_spacer"></span>
                    <span id="selector_left">All</span>
                    <span className="selector_spacer">|</span>
                    <span id="selector_middle">Pick Up</span>
                    <span className="selector_spacer">|</span>
                    <span id="selector_right">Shipping</span>
                    <span className="selector_spacer"></span>
            </SelectorStyle>
            <MainContentStyle>
                <div id="sorters">
                    <span className="sortsLeft">
                        Newest first ▼ 
                    </span>
                    <span className="sortsSpacer">
                    </span>
                    <span className="sortsRight">
                        Price: Any ▲
                    </span>
                </div> 
            { user.username || props.user.username ? `WELCOME ${user.username || props.user.username}` : ''
            }            
            { props.user.city ? ` Welcome from ${props.user.city}` : ''} 
            </MainContentStyle>
        </div>

    )
}

const HomeForm = withRouter(withFirebase(Home))
export default HomeForm
