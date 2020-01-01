import styled from 'styled-components'

export const ImageStyle = styled.div`
    background: ${props => props.image ? props.image : 'linear-gradient(red, orange)'};    
    background-size: contain;
    background-repeat: no-repeat;
    grid-column: ${props => props.column ? props.column : 1};
    height: 100px;
    border: solid 1px black;
    @media only screen and (max-width: 600px){
        height:50px;
    }
`   

export const RootStyle = styled.div`
    grid-column: ${props => props.column ? props.column : 1};
    background-image: ${props => props.image ? props.image : 'linear-gradient(red, orange)'};    
`
export const MainStyle = styled.div`
    background-color: green;
    width: ${props => props.width ? props.width : '200px'};    
    display:grid;
`
