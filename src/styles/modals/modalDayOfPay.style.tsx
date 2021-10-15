import styled from 'styled-components'
import { Avatar} from '@material-ui/core';
export const Box = styled.div`
    width: 100%;
    height: 150px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    border-radius: 10px;
    padding: 10px;
    border-bottom: 2px solid #f5c0c06c;
`
export const BoxButtons = styled.div`
    width: 100%;
    height: 100px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
`
export const BoxInfo = styled.div`
    width: 100%;
    height: 200px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
`
export const Infos = styled.div`
    width:80% ;
    display: flex;
    flex-direction: column;
    align-items: center;
    div{
        display:flex;
        margin-right: 10px;
    }
    .green{
        color:green
    }
    .strong{
        font-weight:bold;
    }
`
export const CircleCli = styled(Avatar)`
    max-width: 55px;
    max-height: 55px;
    min-width: 55px;
    min-height: 55px;
    margin-right: 10px;
    opacity:0.8;

    p{
        font-size: 20px;
        font-weight: bold;
    }
    
`