import styled from 'styled-components'
import { Avatar} from '@material-ui/core';
export const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 15px;
`
export const BoxClietnsCalender = styled.div`
    width: 90%;
    height: 40px;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 10px;
    display: flex;
    align-items: center;
    background-color: #fff;
    box-shadow:1px 2px 5px #dcdde1;
    margin-bottom: 5px;
`
export const CircleColor = styled(Avatar)`
    max-width: 35px;
    max-height: 35px;
    border-radius: 15px;
    margin-right: 10px;
    opacity:0.8;
    p{
        font-size: 14px;
        font-weight: bold;
    }
`
export const ContainerInfo = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    h3{
        flex: 1;
    }
`
export const ContainerButtons = styled.div`
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    button{

        border:none;
        background-color: #fff;
    }
`
export const CLi = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    div{
        flex:1;
        height: 5px;       
    }
`
export const AlignInfos = styled.div`
    flex:1;
    display: flex;
    justify-content: space-between;
    margin-right: 20px;
    .moneyTotal{
        color: green;
    }
`