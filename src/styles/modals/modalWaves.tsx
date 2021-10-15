import React from 'react'
import styled from 'styled-components'
import {BoxContainer,ImageBackground} from '../../styles/pages/Simulation.styles'
import {GrClose} from 'react-icons/gr';
import Back from '../../assets/gf'
export const Box = styled.div`
    width: 80%;
    max-height: 90vh;
    margin-top: 50px;
    background-color: #ffffffca;
    border-radius: 10px;
    padding: 10px;
    z-index: 5;
    margin-bottom: 50px;
    overflow-y: auto;

`
export const ButtonClose = styled.button`
    position:absolute;
    top:5px;           
    right: 0;
    border:none;

`      
const Container = styled.div`
    position:relative;
    width: 600px;
    background-color: #ffffff;
    box-shadow: 2px 2px 5px;
    padding: 10px;
   
    @media(max-width:900px){
        width: 100%;
        height: 100%;
    }
`
type WavesProps = {
    children?:any;
    toggler?:any;
}
export default function WavesModal({children,toggler}:WavesProps){
    return(
        <Container  >
            <BoxContainer>
                <ImageBackground>
                    <Back/>
                </ImageBackground>
                <Box>
                    <ButtonClose onClick={toggler}>
                        <GrClose/>
                    </ButtonClose>
                    {children}
                
                </Box>
            </BoxContainer>
        </Container>
    )
}