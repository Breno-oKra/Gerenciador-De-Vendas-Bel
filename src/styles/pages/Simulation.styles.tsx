import styled from 'styled-components' 
import { Button } from '@material-ui/core';
export const BoxContainer = styled.div`

    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f5f6fa;
    
    .centralizeForm{
        width: 50%;
        min-width: 500px;
        background-color: #ffffff;
        border-radius: 10px;
        display: flex;
        align-items: center; 
        justify-content:center;
        box-shadow:1px 2px 5px #dcdde1;
        z-index: 3;
        @media(max-width:600px){
            width: 100%;
            height: 100%;
            min-width:0;
            .containerForm{
                flex-direction: column-reverse;
            }
            .containerResult{
                flex-direction: row;
                height: 40%;
            }
            .formResponsive{
                height: 60%;
            }
        }
        
    }
   
`
export const ContainerForm = styled.div`
    
    position: relative;
    width: 80%;
    min-width: 300px;
    height: 100%;
    box-sizing: border-box;
    padding: 50px 10px 20px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
`
export const ContainerResult = styled.div`
     width: 100%;
     height: 100%;
    display:flex;
    gap: 10px;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`
export const FormStyle = styled.form`
    width: 100%;
    min-width: 200px;
    height: 100%;
    display:flex;
    padding:30px 0;
    gap: 10px;
    flex-direction: column;
    align-items: center;
    
`
export const Buttons = styled(Button)`
    width: 80%;
    align-self: center;
    .MuiButton-root{
        border: 1px solid #adadad;
    }
    
`
export const ResultBox = styled.div`
    width: 80%;
    max-width: 200px;
    height: 120px;
    background-color: #ececec;
    border-radius: 20px;
    padding: 5px;
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: 20px 1fr;
    grid-template-areas: "title" "result";
    box-shadow:1px 2px 5px #c6c7cc;
    h3{
        grid-area: title;
        width: 100%;
        text-align: center;
        font-size: 12px;
    }
    span{
        grid-area:result;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        
    }
    .fail{
        background-color: #ec6060a9;
        font-weight: bold;
        font-size: 18px;
    }
    .wins{
        background-color: #71f377a9;
        font-weight: bold;
        font-size: 18px;
    }
`
export const ImageBackground = styled.div`
    position: absolute;
    bottom:0;
    right:0;
    width: 100%;
    height: 400px;
    z-index: 0;
    opacity: 0.5;
    overflow: hidden;
`