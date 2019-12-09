import React from 'react'
import { HomeStyle } from './style'
import Mag from './mag'
import Person from './person'
import Pin from './pin'
import Tag from './tag'
import TagSelected from './tagSelected'
import Sack from './sack'

const NavBar = (props) => {
    
        return(
            <HomeStyle> 
                <nav> 
                    <span className="top-left">
                    {Person()}
                    </span>
                    <span className="top">
                        <object className="top_1" name="tag" onClick={props.onClick} >
                            {props.uiButton.tag ? TagSelected() : Tag()}
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

    )
}

export default NavBar