import styled from 'styled-components'

export const ContainerTable = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    @media(max-width:760px){
        padding: 10px;
        box-sizing: border-box;
        overflow-x: scroll;
        display: block;
    }
   
`
export const TableStyle = styled.table`
    background-color: #fff;
    width: 95%;
    .tableMain{
        min-width: 760px;
    }
    tr{
        border-bottom: 6px solid #f1f2f6;
        border-left: 3px solid orange;
        /* The element to apply the animation to */
        transition: all 400ms ease;

        &:hover{
            background-color: #f8ac6432;
            
        }
    
  
    }
    .headerTable{
        background-color: #ced6e0;
        border-left:3px solid #ced6e0;
        border-bottom: 10px solid #f1f2f6;
        h3{
            font-weight:bold;
        }
    }
    td,th{
        text-align: center;
        padding: 10px;
    }
`
export const ImageProvider = styled.img`
    width: 50px;
    height: 40px;
    border-radius: 40px;
    align-self: center;
    @media(max-width:900px){
        width: 30px;
        height: 20px;
    }
`
export const BtnActions = styled.button`
    border: none;
    background-color:#ffffff13;
`