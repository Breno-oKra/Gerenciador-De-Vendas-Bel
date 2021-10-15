import styled from 'styled-components'

export const SectionComponent = styled.div`
    position: relative;
    min-width: 200px;
    height: 100%;
    min-height: 500px;
    overflow-x: auto;
    overflow-y: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fa8231;
    .alginPages{
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content:center;
    }
`
export const Boxs = styled.div`
    position: relative;
    width: 100%;
    height: 50px;
    cursor: pointer;

    .active{
        background-color:#f5f6fa;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
        h4{
            color:#f55d21;
        }
        transition: all 1s ease;
        z-index: 0;
    }
    
`
export const BoxAlign = styled.div`
    position: relative;
    width: 100%;
    padding: 0 20px;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    h4{
        flex:1;
        font-size: 17px;
        margin-left: 10px;
        color:#fff;
    }
    
`

export const BoxUser = styled.div`
    width: 100%;
    height: 150px;
    padding:10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    box-sizing:border-box;
    .avatar{
        width: 100px;
        height: 100px;
        border-radius: 50px;
        background-color: #ffcbadbe;
    }
`
export const AlignInfo = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 5px;
    h4{
        font-size: 18px;
        color: #faf5f5;
        font-weight: bold;
    }
    button{
        border: none;
        background-color: #f1720a1c;
    }
`
export const SectioComponent = styled.div`
    
    @media(max-width: 1280px){
        display: none;
    }
`
export const ConainterDraw = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    display: none;
    width: 80px;
    height: 50px;
    z-index: 4;
   
@media(max-width: 1280px){
    display: block;
   
}
`
export const DrawerDiv = styled.div`
    height: 100vh;

`
export const SectionComponentDraw = styled.div`
    width:100%;
    min-width: 200px;
    height: 100%;

`