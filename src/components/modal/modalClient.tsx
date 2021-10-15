import React from 'react';
import {ClientsProps} from "../../../pages/pag"
import BoxClient from '../BoxClient';
import {ModalAlign} from './modal'
import styled from 'styled-components'
import { ButtonClose } from '../../styles/modals/modalWaves';
import {GrClose} from 'react-icons/gr';
const Container = styled.div`
  position:relative;
  width:850px;
  height:100vh;
  overflow-y: auto;
  background-color: #fff;
  padding: 10px;
  box-shadow: 2px 2px 3px #757373;
  .buttonFixed{
    position:fixed;
    right: 20px;
    z-index: 4;
  }
  @media(max-width:900px){
    width:100%;
  }
`
type ModalsProps = {
    modal: boolean
    toggler: any
    data:ClientsProps
    setReload:any;
    reload:boolean;
    loadDates:boolean;
}
export default function ModalClient({modal,toggler,data,setReload,reload,loadDates}:ModalsProps) {

  const body = (
        data !== undefined?(
            <Container>
                <ButtonClose className="buttonFixed" onClick={toggler}>
                    <GrClose/>
                </ButtonClose>
                <BoxClient
                    data={data}
                    setReload={setReload}
                    reload={reload}
                    loadDates={loadDates}
                /> 
            </Container>): <></>
                         
  );

  return (
    <div>
      <ModalAlign

        open={modal}
        onClose={toggler}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </ModalAlign>
    </div>
  );
}