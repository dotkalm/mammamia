import React from 'react'
import { SelectorStyle } from './style'

const Selector = (props) => {

    return(
        <SelectorStyle>
                <span className="selector_spacer"></span>
                <span id="selector_left">All</span>
                <span className="selector_spacer">|</span>
                <span id="selector_middle">Pick Up</span>
                <span className="selector_spacer">|</span>
                <span id="selector_right">Shipping</span>
                <span className="selector_spacer"></span>
        </SelectorStyle>
    
    )
}

export default Selector
