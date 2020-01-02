import React from 'react'
import { DetailStyle } from './style'

const Detail = (props) => {
    if(props.garmetDetail !== null){
        console.log(props) 
        return(
            <DetailStyle>
                Hello
            </DetailStyle>
        )
    } else {
        return(
            <DetailStyle>
                HI 
            </DetailStyle>
        )
    }
}

export default Detail
