import React, {useState, useEffect} from 'react'
import { OverlayPlusMenu, HomeStyle, Overlay } from './style'
import Mag from './mag'
import PersonSelected from './personSelected'
import Person from './person'
import Pin from './pin'
import Tag from './tag'
import TagSelected from './tagSelected'
import Sack from './sack'
import { withRouter } from 'react-router-dom'

const NavBar = (props) => {
    const [dims, setDim] = useState({width: window.innerWidth, height: window.innerHeight})
    const [isOpen, setIsOpen] = useState(false)
    const [authState, setAuthState] = useState('Sign Out')

    useEffect(() => {
        const handleResize = () => setDim({width: window.innerWidth, height: window.innerHeight});
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    });
    const openMenu = () => {
        setIsOpen(!isOpen)
    }
    const signInSignOut = () => {
        console.log(props.user)
        if(Object.keys(props.user).length === 0){
            setAuthState('Sign In')
        } else {
            setAuthState('Sign Out')
            props.signOut()
            props.history.push(props.ROUTES.ROOT)
        }
    }
    const rootHome = () => {
        props.history.push(props.ROUTES.ROOT)
        setIsOpen(!isOpen)
    }
    return(
        <OverlayPlusMenu>
            <HomeStyle> 
                <nav>
                    <div className="top-left" id="home" onClick={props.onClick} >
                        {props.category === 'home' ? PersonSelected() : Person()}
                    </div>
                    
                    <span className="top">
                        <div className="top_1" id="post" onClick={props.onClick} >
                            {props.category === 'post' ? TagSelected() : Tag()}
                        </div>
                        <span className="top_2">
                            {Mag()}
                        <form onSubmit={props.onSubmit}>
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
                            {Sack()}
                        </span>
                    </span>
                    <span className="top-right">
                        <span id="space-top-right">
                        </span>
                        <span className="menu" onClick={openMenu}>
                            <div id="topMenu"></div>
                            <div id="pink"></div>
                            <div id="topMenu"></div>
                            <div id="pink"></div>
                            <div id="topMenu"></div>
                        </span>
                    </span>
                </nav>
            </HomeStyle>
            {isOpen ? 
            <Overlay height={`${dims.height-40}px`}
                transform={`translateX(${dims.width-200}px)`}> 
                <h1 className="rootHome" onClick={rootHome}>Home</h1>
                <h1 className="signInSignOut" onClick={signInSignOut}>{authState}</h1>
                <h1 className="Browse" >Browse</h1>
                <h1 className="Sack" >Shopping Sack</h1>
            </Overlay>
            : ''}
        </OverlayPlusMenu>
    )
}

export default withRouter(NavBar)
