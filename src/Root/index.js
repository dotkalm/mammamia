import React,{ useState, useEffect } from 'react'
import { withFirebase } from '../Firebase'
import { 
    RootStyle, 
    ImageStyle, 
    MainStyle
    } from './style'
import Detail from './detail'

const Root = (props) => {
    const handleResize = () => {
        const wide = window.innerWidth
        if(wide <= 600){
            return 3 
        }else if(wide > 600 && wide < 800){
            return 4
        }else if(wide >= 800 && wide < 1000){
            return 5
        }else{
            return 6
        }  
    } 
    let column = 0

    const [wheel, setWheel] = useState({
        Y:0,
        X:0,
    })
    const [col, setCol] = useState(handleResize())
    const [garmetDetail, setGarmetDetail] = useState(null)

    const sampleBundles = Object.keys(props.sampleBundles).map((e,i, array) => {
        if(garmetDetail === null){
            setGarmetDetail(e)
        }
        const user = props.sampleBundles[e]
        if(user.imageURL){
            if(column >= col){
                column = 0;
            }
            column += 1
            return (
            <RootStyle key={`root${e}`}
                image={`url(${user.imageURL}) no-repeat center `} 
                column={column}
                >
                    <ImageStyle key={e}
                        image={`url(${user.imageURL}) no-repeat center `} 
                        column={column}
                        >
                    </ImageStyle> 
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
    const wheelEventFunc = event => {
        setWheel({
            X: (wheel.X + event.deltaX/15),
            Y: (wheel.Y + event.deltaY/15)})
        
        const index = Math.floor((wheel.Y + wheel.X)/7)
        if(index >= Object.keys(props.sampleBundles).length){
            setWheel({
                X: 0,
                Y: 0
            })
        }
        const garmet = Object.keys(props.sampleBundles)[index]
        if(garmet !== undefined){
            setGarmetDetail(garmet)
            console.log(garmetDetail)
        }
    }
    return(
        <MainStyle 
            width={`${props.dims.width}px`} 
            onWheel={wheelEventFunc}> 
        <Detail 
            bundles={props.sampleBundles} 
            garmetDetail={garmetDetail}
            wheel={wheel}/>
        {sampleBundles}
        </MainStyle>
    )
}
export default withFirebase(Root)
