import styled from 'styled-components'

export const Overlay = styled.div`
    width: 200px;
    transform: ${props => props.transform ? props.transform : '200px'};
    height: ${props => props.height ? props.height : 'auto'};    
    box-shadow: 3px 3px 10px black;
    background-color: antiquewhite;
    float: right;
    position: absolute;
    h1{
        text-align: center;
        &:hover{
            text-shadow: -2px 2px 4px #000000;
            color: white;
            cursor: pointer;
        }
    }
`


export const MainContentStyle = styled.div`
    background-color: white;
    width: 98%;
    padding-left: 1%;
    padding-right: 1%;
    display: grid;
    #sorters{
        width:100%
        border-top: solid gray;
        border-top-width: 1px;
        border-bottom: solid gray;
        border-bottom-width: 1px;
        height:1.5rem;
        .sortsLeft{
            padding-top: .5rem;
            font-size: .8rem;
            width:20%;
            height:2rem;
            color: darkgray;
            float: left;
            display: inline-block;
        }
        .sortsSpacer{
            width:60%;
            float: left;
            display: inline-block;
            height:2rem;
        }
        .sortsRight{
            display: inline-block;
            float: left;
            padding-top: .5rem;
            font-size: .8rem;
            width:20%;
            height:2rem;
            color: darkgray;
            text-align: right;
        }
    }

`
export const HomeStyle = styled.header`
    background-color: Pink;
    padding: .25rem;
    nav{
        width: 100%;
        height: 2rem;
        display: flex;
    }
    .top-left{
        width: 12%;
        float: left;
        background-color: pink;
        height: 100%;
        svg{
        
        }
    }
    .top{
       ## border-radius: .5rem;
        ##background-color: gray;
        width: 80%;
        float: left;
        .top_1{
            float: left;
            width: 15%;
            height: 100%;
        }
        .top_2{
            float: left;
            width: 70%;
            height: 100%;
            background-color: hotpink;
            border-radius: .5rem;
            #Layer_mag{
                float: left;
                width: 10%;
                padding-left: 2%;
                padding-right: 2%;
                transform: translateY(3px);
            }
            form{
                border-width: 0;
                background: transparent;
                float: left;
                height: 100%;
                width: 86%;
                color-background: lightgray;
                #search1{
                    @media screen and (max-width: 700px){
                        font-size: .35rem;
                    }
                    &::placeholder{
                        color: lightgray;
                    }
                    &:focus {
                        outline: none;
                    }
                    font-size: .8rem;
                    float: left;
                    background: transparent;
                    border-width: 0;
                    width: 37%;
                    height: 100%;
                    padding: 0;
                }
                #div_btwn{
                    float: left;
                    background: transparent;
                    width: 1%; 
                    background-color: pink;
                    height: 100%;
                    svg{
                        @media screen and (max-width: 700px){
                            transform: translate(0px, 4px);
                            padding-right: 1% 
                        }
                        padding-right: 1%; 
                        transform: translate(6px, 4px)
                    }

                }
                #search2{
                    @media screen and (max-width: 700px){
                        font-size: .35rem;
                    }
                    &::placeholder{
                        color: lightgray;
                    }
                    font-size: .8rem;
                    float: left;
                    background: transparent;
                    background: transparent;
                    border-width: 0;
                    padding: 0 0 0 6%;
                    width: 23%;
                    margin-left: 5%;
                    height: 100%;
                    &:focus {
                        outline: none;
                    }
                }
                input{
                    color-background: lightgray;
                }
                button{
                    @media screen and (max-width: 500px){
                        font-size: .8rem;
                    }
                    background-color: rgba(250,0,0,.5);
                    width: 18%;
                    text-decoration: none;
                    height: 100%;
                    font-size: 1rem;
                    float: right;
                    border-width: 0;
                    border-top-right-radius: .5rem;
                    border-bottom-right-radius: .5rem;
                    &:focus {
                        outline: none;
                    }
                    &:hover {
                        background-color: rgba(200,0,0,.5);
                    }
                }
            }
        }
        .top_3{
            float: right;
            width: 10%;
            height: 100%;
            padding-right: 2%;
            svg{
                float: right;
            }
        }
    }
    .top-right{
        width: 8%;
        float: left;
        background-color: pink;
    }
    #space-top-right{
        @media only screen and (max-width: 807px){
            display: none;     
        }
        float: left;
        width: 30%;
        height: 100%;
        font-size: .8rem;
    }
    .menu{
       &:hover{
           cursor: pointer; 
       } 
       float: right;
       width: 2rem;
       background-color: pink;
       color: red;
       height: 100%;
        #pink{
            background-color: pink;
            width: 100%;
            height: .4rem;
            border-radius: 1.5rem;
        }
        #topMenu{
            background-color: #b32cce;
            width: 100%;
            height: .4rem;
            border-radius: 1.5rem;
        }
    }
`
export const SelectorStyle = styled.div`
        .selector_spacer{
            width: 5%;
            float:left;
            border-left-width: 7px;
            display: inline-block;
            height:100%;
            &#line{
                border-right: solid black;
            }
        }
        background-color: lightgray;
        height: 1rem;
        width: 100%;
        color: gray;
        font-size: .8rem;
        text-align: center;
        #selector_left{
            float:left;
            width:26.66%;
            border-bottom-width: 7px;
            border-bottom: solid green;
        }
        #selector_middle{
            float:left;
            width:26.66%
        }
        #selector_right{
            float:left;
            width:26.66%
        }

`
