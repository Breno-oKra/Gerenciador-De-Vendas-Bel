import styled from 'styled-components'
import Calendar from 'react-calendar';
export const BoxContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    width: 100%;
    padding: 5px;
    
    @media(max-width:820px){
        flex-direction:column-reverse;
    }

`
export const ContainerOne = styled.div`
     flex:1;
     height: 100%;
     min-height: 70vh;
    padding: 5px;
    @media(max-width:1280px){
        width: 60%;
    }
    @media(max-width:820px){
        width: 100%;
    }

`
export const AlignContainerOne = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
    @media(max-width:1480px){
        flex-direction: column;
        flex-wrap: nowrap;
    }
`
export const Box = styled.div` 
    position: relative;
    width: 48%;
    height: 90px;
    box-shadow:1px 2px 5px #dcdde1;
    background-color: #fff;
    margin-bottom: 5px;
    border-left: 5px solid ${(props) => props.colorCli}; 
    .alignAll{
        position: relative;
        background-color: #fff;
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: 20% 1fr;
        padding: 10px;
        box-sizing: border-box;
        border:none; 
        cursor: pointer;
     }
     .alignAll:focus{
        outline: 0;
        box-shadow: 0 0 0 ;
    }
    .alignAll:before{
        content:'';
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 100%;
        background-color: ${(props) => props.colorCli};
        transition: all 1s ease;
        z-index: 0;
    }
    .alignAll:focus:before{
        width: 100%;
    }
    .BoxImage{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction:column;
        justify-content: center;
        align-items: center;
        z-index: 2;
        h2{
            color: ${(props) => props.colorCli};
        }
    }
    .BoxInfo{
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        gap: 8px;
        z-index: 2;
        table{
            
            width: 100%;
            tr th{
                font-size: 12px;
            }
            tr,td{
                background-color: rgba(255,255,255,0.3);
                
                text-align:center;
                font-size: 14px;
            }
        }
    }
    @media(max-width:1480px){
        width: 100%;
    }
`
export const Calend = styled(Calendar)`
    .daySelecty{
        background-color: #fcdcdcb1;
    }
`
export const AlignAll = styled.div`
    width:100%;
    display: flex;
    flex-direction: column;
`
export const AlignItemsSecton = styled.div`
    width: 100%;
    top:0;
    position: relative;

    display: flex;
    flex-direction: column;
    z-index: 1;
    margin-bottom: 50px;
`
export const BoxCalender = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
    h3{
        margin-bottom:10px;
    }
`
export const ContainerCalend = styled.div`
    position: relative;
    width:500px;
    height:100%;
    min-height: 87vh;
    background-color: #ffffff;
    box-shadow:1px 2px 5px #dcdde1;
    border-radius: 20px;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:flex-start;
    @media(max-width:1280px){
        width: 400px;
    }
    @media(max-width:820px){
        width: 100%;
    }
    
`
export const ContainerInfoPags = styled.div`
    position: relative;
    width: 100%;
    height: 330px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: flex-end;
    padding-bottom: 50px;
    border-top-left-radius: 20px;
    border-top-right-radius:20px;
    background: rgb(255,255,255);
    background: linear-gradient(0deg, rgba(255,255,255,1) 14%, rgba(245,137,48,1) 100%);
    z-index: 1;
    @media(max-width:820px){
        height: 530px;
    }
    @media(max-width:720px){
        height: 430px;
    }
    @media(max-width:550px){
        height: 330px;
    }
    
`
export const BoxInfoPags = styled.div`

    padding: 10px 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    background-color: #ffffffed;
    border-radius: 10px;
    z-index:2;
    box-shadow:1px 2px 5px #dcdde1;
`
export const ContainerBackgrounds = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    h1{
        font-size: 25px;
        font-weight: bold;
    }
    div{
        width: 40%;
        height: 40%;
        opacity: 0.4;
    }
`
