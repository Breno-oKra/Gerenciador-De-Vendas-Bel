
import styled from 'styled-components'

export const Container = styled.div`
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
    
    @media(max-width:650px){
        align-items: center;
        justify-content: center;
    }
    
`
export const ContainerProvider = styled(Container)`
    flex-direction: column;
    flex-wrap: nowrap;
    width: 100%;
    height: 100%;
    .provider{
        width:100%;   
        height: 80px;
        box-shadow:0 0 0;
    }
    .MuiPaper-root{
        min-width: 760px;
    }
    @media(max-width:760px){
        padding: 10px;
        box-sizing: border-box;
        display: block;
    }
`
export const Card = styled.div`
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
   
    background-color: #fff;
    box-shadow:1px 2px 5px #dcdde1;
    
`
export const CardDivImg = styled.div`
    position: relative;
    width:100%;
    height: 180px;
    background: #eeaecac3;
    background: radial-gradient(circle, #eeaecab3 0%, #94bce9be 100%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow:hidden;
    .img{
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 2s;
        
        h2{
            font-size: 18px;
            color: #ffffff;
            text-shadow: 2px 2px #8b8b8b;
            z-index:3;
            background-color: orange;
            border-radius: 20px;
            padding: 5px 20px;
        }
        img{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity:0.7;
        }
    }
    &:hover{
        .info{
            transition: 2s;
            transform: translateY(0px);
            opacity:1;
        }
        .img{
            transition: 2s;
            transform: translateY(200px);
            opacity:0;
        }
        
    }
`
export const CardDivInfo = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    transform: translateY(200px);
    opacity:0;
    transition: 2s;
    
    display: flex;
    flex-direction:row;
    justify-content: space-around;
    align-items: center;
    .alignBox{
        text-align: center;
        color: #030303;

    }
`
export const CardInfo = styled.div`
    width: 100%;
    height: 50%;
    padding:5px 20px;
    
    
    
`
export const CardBoxProvedor = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding: 5px 0;
    img{
        width: 60px;
        height: 60px;
        margin-right: 5px;
        border-radius: 30px;
    }
    h3{
        flex:1
    }
    div{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        p{
            width: 100%;
            text-align: center;
            font-size: 12px;
        }
        
    }
    /* padding: 0 20px; */
`
export const CardBoxActions = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    padding: 5px;
`