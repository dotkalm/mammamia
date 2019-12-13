import React, {useState, useEffect} from 'react'
import { HomeStyle, Overlay } from './style'
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
    return(
        <div>
            <HomeStyle> 
                <nav>
                    <object className="top-left" name="home" onClick={props.onClick} >
                        {props.category === 'home' ? PersonSelected() : Person()}
                    </object>
                    
                    <span className="top">
                        <object className="top_1" name="post" onClick={props.onClick} >
                            {props.category === 'post' ? TagSelected() : Tag()}
                        </object>
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
                <h1 className="signInSignOut" onClick={signInSignOut}>{authState}</h1>
                <h1 className="Browse" >Browse</h1>
                <h1 className="Sack" >Shopping Sack</h1>
            </Overlay>
            : ''}
        </div>
    )
}

export default withRouter(NavBar)
