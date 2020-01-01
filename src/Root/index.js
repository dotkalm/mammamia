import React,{ useState, useEffect } from 'react'
import { withFirebase } from '../Firebase'
import { 
    RootStyle, 
    ImageStyle, 
    MainStyle
    } from './style'

const Root = (props) => {
    const handleResize = () => {
        const wide = window.innerWidth
        if(wide <= 600){
            return 2
        }else if(wide > 600 && wide < 800){
            return 4
        }else{
            return 5
        }  
    } 
    let column = 0

    const [col, setCol] = useState(handleResize())

    const sampleBundles = Object.keys(props.sampleBundles).map((e,i, array) => {
        const user = props.sampleBundles[e]
        if(user.imageURL){
            if(column >= col){
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
    useEffect(() => {
        window.addEventListener('resize', setCol(handleResize()));
        return () => {
            window.removeEventListener('resize', setCol(handleResize()));
        };
    });
    console.log(props.sampleBundles) 
    return(
        <MainStyle width={`${props.dims.width}px`}> 
        {sampleBundles}
        </MainStyle>
    )
}
export default withFirebase(Root)
