import styled from 'styled-components'

export const BundlesStyle = styled.div`
    padding-left: 20%;
    padding-right: 20%;
    padding-top: 2rem;
    #description{
        font-size: .9rem;
        text-align: center;
        background-color: hotpink;
        height: 100%;
        width: 100%;
        border: solid pink;
        border-width: .5rem;
        border-radius: 1rem;
        margin-bottom: 2rem;
    }
    .form{
        text-align:center;
        form{
            select{
                text-align:center;
                height: 100%;
                width: 100%;
            }
            height: 100%;
            width: 100%;
            border: solid lightgray;
            border-width: .5rem;
            button{
                height: 100%;
                width: 100%;
                &:hover{
                    background-image: linear-gradient(to bottom right, pink, hotpink, gray)
                } 
            }
        }
    }
`

export const StylePost = styled.div`
    .selling{
        width: 100%;
        border-bottom: solid gray;
        border-bottom-width: 1px;
        .sellling_spacer{
            width: 33.3%;
            display: inline-block;
            padding-top: .25rem;
        }
        #selling_left{
            text-align: center; 
            width: 33.3%;
            display: inline-block;
            border-bottom: solid #f1385d;
            border-bottom-width: 5px;
            font-size: .8rem;
            #backArrow{
                float:left;
            }
        }
    }
`
export const CategoryStyles = styled.div`
    height: ${props => props.height ? props.height :'20rem'};
    .buffer{
        height: 90%;
        margin: 5%;
        padding-left: 20%;
        padding-right: 20%;
        #padding-top: 5%;
        @media screen and (max-width: 500px){
            padding-top: 10%;
        }
        .categories-space{
            width: 100%;
            height: 12%
        }
        .categories{
            border-radius: 1rem;
            text-align: center;
            background-color: lightgray;
            width: 100%;
            padding-top: 5%;
            padding-bottom: 5%;
            #height: 10%;
            &:hover{
                background-image: linear-gradient(to bottom right, pink, hotpink, gray)
            }
            @media screen and (max-width: 500px){
               # height: 10%;
            }
            .button-name{
                font-size: 1.5rem;
                @media screen and (max-width: 500px){
                    font-size: .8rem;
                }
            }
            .button-description{
                font-size: .7rem;
                @media screen and (max-width: 500px){
                    font-size: .5rem;
                }
            }
            #button-spacer{
                height: 10%;
                width: 100%;
            }
        }
    }
`
