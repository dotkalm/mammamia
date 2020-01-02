import React from 'react'
import { DetailStyle } from './style'

const Detail = (props) => {
    if(props.garmetDetail !== null){
        let user = props.bundles[props.garmetDetail]
        console.log(user.bundles[0].description)
        return(
            <DetailStyle 
                image={`url(${user.imageURL}) no-repeat center `} 
            >
                { user.bundles[0].description }
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
