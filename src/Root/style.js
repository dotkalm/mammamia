import styled from 'styled-components'

export const ImageStyle = styled.div`
    background: ${props => props.image ? props.image : 'linear-gradient(red, orange)'};    
    background-size: contain;
    background-repeat: no-repeat;
    border: solid 1px black;
    @media only screen and (max-width: 600px){
        height:50px;
    }
`   

export const RootStyle = styled.div`
    height: 200px;
    grid-column: ${props => props.column ? props.column : 1};
    background: ${props => props.image ? props.image : 'linear-gradient(red, orange)'};    
`
export const MainStyle = styled.div`
    width: ${props => props.width ? props.width : '200px'};    
    display:grid;
`
