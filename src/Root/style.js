import styled from 'styled-components'

export const ImageStyle = styled.div`
    background: ${props => props.image ? props.image : 'linear-gradient(red, orange)'};    
    background-size: contain;
    background-repeat: no-repeat;
    border: solid 1px black;
    height:50px;
    @media only screen and (max-width: 600px){
        height:50px;
    }
`   

export const RootStyle = styled.div`
    border: solid 1px black;
    height: 200px;
    grid-column: ${props => props.column ? props.column : 1};
    background: ${props => props.image ? props.image : 'linear-gradient(red, orange)'};    
`
export const MainStyle = styled.div`
    width: ${props => props.width ? props.width : '200px'};    
    display:grid;
`

export const DetailStyle = styled.div`
    margin-top: 2rem;
    background-color: orange;
    position: fixed;
    width: 100%;
    height: 100%;
    opacity: 0.5;
`
