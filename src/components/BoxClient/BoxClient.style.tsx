import styled from 'styled-components'
import { TableStyle } from '../campTabelMercadorias/TableMercadorias.styles';
import Button from '@material-ui/core/Button';

export const BoxClientStyle = styled.div`
width:100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: flex-start;
.profileClient{
    width: 100%;
    height: 300px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .pink{
        width: 150px;
        height: 150px;
        font-size: 50px;
    }
    .avatarCli{
        width: 40%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-right: 1px solid #000;
    }
}
`
export const Table = styled(TableStyle)`
    width: 100%;
    margin-top: 10px;
    tr{
        border-left: none;
        border-bottom:none;
    }
    .headerTable{
        border-bottom: 1px solid #bdc3c7;
        background-color: #fff;
    }
    td,th{
        border-left:none;
    }
`
export const Letter = styled.h3`
    color: green;
    font-size: 11px;
`
export const ContainerButtons = styled.div`
    height: 30px;
   

`
export const ButtonClient = styled(Button)`
    border:none;
    width: 50%;
    max-width: 50px;
    .edit{
        background-color:#2ed573;
    }
    .del{
        background-color: #eb4d4b;
    }
`
export const ContainerDates = styled.div`
    position: relative;
    width: 60%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .alignCard{
        width: 50%;
        height: 80%;
        border-radius:20px;
        display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        div{
            width: 100%;
            height: 50px;
            padding: 10px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background-color: #ebebeb;
            margin-bottom: 8px;
            border-radius: 20px;
            .titles{
                width: 100%;
                text-align: center;
                font-size: 11px;
            }
            .money{
                color:green;
                font-size: 18px;
            }
        }
    }

`
export const ContainerSearch = styled.div`
    position: relative;
    width: 100%;
    height: 50px;
    margin-bottom:10px;
    display: flex;
    align-items: center;
    background-color: #b4b4b4;
    h3{
        width: 100%;
        text-align: center;
        @media(max-width:900px){
            padding-left: 10px;
            text-align:left;
        }
    }
    .alignSearch{
        position: absolute;
        top:2px;
        right:2px;
    }
`