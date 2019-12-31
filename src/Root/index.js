import React from 'react'
import { withFirebase } from '../Firebase'
import { 
    RootStyle, 
    ImageStyle, 
    MainStyle
    } from './style'

const Root = (props) => {
    let column = 0
    const sampleBundles = Object.keys(props.sampleBundles).map((e,i, array) => {
        const user = props.sampleBundles[e]
        if(user.imageURL){
            console.log(props.dims)
            if(column >= 3){
                column = 0;
            }
            column += 1
            return (
            <RootStyle key={e}
                image={`url(${user.imageURL}) no-repeat center `} 
                column={column}
                >
                {user.imageURL ? <ImageStyle 
                    image={`url(${user.imageURL})`} 
                    alt={user.bundles[0].description} /> : ''}
                <br/>
            </RootStyle> 
            )
        }
    })
    console.log(props.sampleBundles) 
    return(
        <MainStyle width={`${props.dims.width}px`}> 
        {sampleBundles}
        </MainStyle>
    )
}
export default withFirebase(Root)
