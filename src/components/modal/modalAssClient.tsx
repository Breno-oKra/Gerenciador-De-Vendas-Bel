import React from 'react';
import {InputBox,InputComponent} from '../FormComponent/FormMercadoryCalc/style'
import {FormStyle,Buttons} from '../../styles/pages/Simulation.styles'
import WavesModal from '../../styles/modals/modalWaves';
import { ModalAlign } from './modal';
type ModalsProps = {
    modal: boolean
    toggler: any
    setReload:any;
    reload:boolean;
    setLoadDate:any;

}
export default function ModalsAddClient({modal,toggler,setReload,reload,setLoadDate}:ModalsProps) {
  const body = (
    <WavesModal toggler={toggler}>
            <FormStyle onSubmit={function handlerCreateMercadory(event){
                event.preventDefault();
                setLoadDate(false)
                const dadosForm = new FormData(event.target)
                const mercadoryItem = {
                    name:dadosForm.get('name'),
                }
                console.log(mercadoryItem)
                fetch('/api/clients',{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json',
                    },
                    body: JSON.stringify(mercadoryItem)
                }).then(async(response) => {
                    setReload(!reload)
                }).catch((err) => alert('Erro ao Adicionar Mercadoria'))
            }}>
                <InputBox>
                    <InputComponent name='name' placeholder="Nome do Client"/>
                </InputBox>

                <Buttons type='submit'>Adicionar Cliente</Buttons>
            </FormStyle> 
    </WavesModal>          
  )

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