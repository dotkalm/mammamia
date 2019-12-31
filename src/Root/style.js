import styled from 'styled-components'

export const RootStyle = styled.div`
    background: ${props => props.image ? props.image : 'linear-gradient(red, orange)'};    
    background-size: contain;
    background-repeat: no-repeat;
    grid-column: ${props => props.column ? props.column : 1};
`   

export const ImageStyle = styled.div`
    background-image: ${props => props.image ? props.image : 'linear-gradient(red, orange)'};    
`
export const MainStyle = styled.div`
    margin: 1rem;
    background-color: green;
    width: ${props => props.width ? props.width : '200px'};    
    display:grid;
`
