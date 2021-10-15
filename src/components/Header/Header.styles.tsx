
import styled from 'styled-components'
import { Button } from '@material-ui/core'
export const HeaderStyle = styled.header`
    position: relative;
    width: 100%;
    min-height: 80px;
    padding: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    box-shadow:1px 2px 5px #dcdde1;
    margin-bottom:10px;
    h3{
        flex: 1;
        @media(max-width: 1280px){
            margin-top: 15px;  
        }
    }
    .boxs{
        width: 100px;
        height: 100%;  
        display: flex;
        flex-direction:column;
        justify-content: center;
        text-align: center;

    }
    .boxSearchMini{
        display: none;
    }
    .buttonONSearch{
        display: none;
        background-color: #ffffff30;
    }
    @media(max-width:497px){
        .boxSearch{
            display: none;        
        }
        .boxSearchMini{
            display: flex;
            position: absolute;
            border-radius: 0;
            top: 0;
            right: 0;
            width: 85%;
            height: 80px;
            z-index: 5;
            @media(max-width:360px){
                width: 80%;
            }
        }
        .buttonONSearch{
            display: block;
        }
    }
`
export const BoxSearch = styled.div`
    position: relative;
    width: 200px;
    margin-left: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: #dcdde1;
    border-radius: 20px;
    padding: 10px;
    input{
        width: 100%;
        border: none;
        background-color: #dcdde1;
    }
    input:focus{
        outline: 0;
        box-shadow: 0 0 0 ;
    }
    button{
        border:none;
        background-color: #ffffff30;
    }
    button:focus{
        outline: 0;
        box-shadow: 0 0 0 ;
    }
    
`
export const ButtonAdd = styled(Button)`
    position:relative;
    top: 0;
    left: 0;
    height: 30px;
    border:none;
    padding:0;
    background-color: #ffffff22;
    
    @media(max-width:497px){
       
       .MuiButton-root{
            min-width: 30px;
       }
    }
`
