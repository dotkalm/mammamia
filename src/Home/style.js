import styled from 'styled-components'

export const BundleStyle = styled.div`
    background-image: ${props => props.img ? props.img : 'auto'};
    background-size: cover;
    height: 5rem;
    width: 5rem;
    border: 1px solid gray;
    display: inline-block;
    margin: 1rem;
    
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
