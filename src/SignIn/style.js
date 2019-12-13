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
    width: 80%;
    background-color: gray;
    margin: 5% auto;
    border-radius: .4rem;
    padding: 5%;
    display: flex;
    font-size: 16px;
    form{
        margin: auto;
        width: 96%;
        border-radius: .4rem;
        padding: 2%;
    }
    input{
        display: block;
        width: 90%;
        margin: auto;
        height: 2rem;
        font-size: 100%;
    }

`

