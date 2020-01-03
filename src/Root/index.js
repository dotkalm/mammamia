import React,{ useState, useEffect } from 'react'
import { withFirebase } from '../Firebase'
import { 
    RootStyle, 
    MainStyle
    } from './style'
//import Detail from './detail'

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
        if(garmetDetail === null && (i+1) === array.length){
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
                image={`url(${user.imageURL})`} 
                column={column}
                >
            </RootStyle>
            )
        }else{ return null}
    })
    useEffect(() => {
        window.addEventListener('resize', setCol(handleResize()));
        return () => {
            window.removeEventListener('resize', setCol(handleResize()));
        };
    }, []);
    const wheelEventFunc = event => {
        setWheel({
            X: (wheel.X + event.deltaX/15),
            Y: (wheel.Y + event.deltaY/15)})
        let index = 0 
        if(Math.floor((wheel.Y + wheel.X)/7) >= 0 && Math.floor((wheel.Y + wheel.X)/7) < Object.keys(props.sampleBundles).length){
           index =  Math.floor((wheel.Y + wheel.X)/7)
        } else {
            setWheel({
                X: 0,
                Y: 0
            })
        }
        console.log(index, "<--- index")
        const garmet = Object.keys(props.sampleBundles)[index]
        const garmetDetail = props.sampleBundles[garmet].imageURL
        if(garmet && garmetDetail){
            setGarmetDetail(garmet)
        }
    }
    return(
        <MainStyle 
            width={`${props.dims.width}px`} 
            onWheel={wheelEventFunc}> 
        {sampleBundles}
        </MainStyle>
    )
}
export default withFirebase(Root)
