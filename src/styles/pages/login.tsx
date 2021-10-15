import styled from 'styled-components'
import Image from 'next/image'
import img from '../../assets/backgroundLogin.jpeg'
export const Container = styled.div`
    position:relative;
    width: 100vw;
    height:100vh;
    display:flex;
    overflow: hidden;
    
`
export const Box = styled.div`
    position:relative;
    width: 90%;
    height:100%;
    padding: 10px;
    display: flex;
    align-items:center;
    justify-content:flex-start;

    .waves{
        position: absolute;
        top:0;
        left:0;
        width:110%;
        height:150%;
        z-index:1;
 
        @media(max-width:1350px){
            display:none;
        }
        
    }
    .backImage{
        position: absolute;
        top:0;
        left:0;
        width:55%;
        height:100%;
        z-index:3;

        box-shadow: -114px -16px 98px -20px #ff8b36 inset;
        -webkit-box-shadow: -114px -16px 98px -20px #ff8b36 inset;
        -moz-box-shadow: -114px -16px 98px -20px #ff8b36 inset;
        @media(max-width:1350px){
            display:none;
        }
        
    }
    img{
        position: absolute;
        top:0;
        left:0;
        width:55%;
        height:100%;
        opacity: 0.1;
        z-index:2;
        @media(max-width:1350px){
            width:100%;
        }
    }
    .login{
        width: 70%;
        display:flex;
        align-items: center;
        justify-content: center;
        z-index:4;
        @media(max-width:1350px){
            width:100%;
        }
        
    }
    @media(max-width:1350px){
            width:40%;
            background-color:#ff8b36;
    }
    @media(max-width:840px){
        width:100%;

    }
    
`

export const ImagesBack = styled.div`
    position:absolute; 
    width:600px;
    height:600px;
    top:10%;
    right: 100px;
    @media(max-width:1350px){
        width:40%;

    }
    @media(max-width:840px){
       display:none

    }
`
export const FormStyle = styled.form`
    padding: 30px;
    background-color: #fff;
    display:flex;
    flex-direction: column;
    box-shadow: 3px 3px 4px #d16c24;
    border-radius: 5px;
    input{

        border:none;
        border-radius: 20px;
        height: 40px;
        background-color:#e9e8e8;
        margin-bottom: 10px;
        padding-left: 10px;
        color: #696868;
        
    }
    input:focus{
        border:2px solid #ff8b36;
        border-radius: 20px;
        outline: 0;
    }
    button{
        width: 100%;
        height: 50px;
        border-radius: 5px;
        background-color:#eb8e4c;
        &:hover{
            background-color:#eb8e4c78;
        }
    }
    .error{
        color:#f5260bf0;
    }
    
`