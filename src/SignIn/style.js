import styled from 'styled-components'

export const ImgContainer = styled.div`
    #noAccount{
        color: pink;
        :hover{
            color: red;
            cursor: pointer;
        }
    }
    #eek{
        width: 100%;
        text-align: center;
        color: pink;
    }
    #title{
        background-color: black;
        padding: .8rem;
        font-size: 1.5rem;
        border-radius: .4rem;
    }
    #box{
        margin:1rem auto; 
        width:20%;
        img{
            width:100%;
            margin: auto;
        }
    }
`

export const SignInStyle = styled.div`
    width: 50%;
    background-color: gray;
    margin: 3rem auto;
    border-radius: .4rem;
    padding: 1rem;
    display: flex;
    form{
        margin: auto;
        width: 100%;
        border-radius: .4rem;
    }
    input{
        display: block;
        width: 100%;
        margin: auto;
        height: 2rem;
    }

`

