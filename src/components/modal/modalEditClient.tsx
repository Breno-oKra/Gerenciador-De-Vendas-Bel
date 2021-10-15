import React from 'react';
import {InputBox,InputComponent} from '../FormComponent/FormMercadoryCalc/style'
import {FormStyle,Buttons} from '../../styles/pages/Simulation.styles'
import WavesModal from '../../styles/modals/modalWaves';
import { ModalAlign } from './modal';
import LoagindPage from '../LoadPage/loadingBd';
type ModalsProps = {
    modal: boolean
    toggler: any
    setReload:any;
    reload:boolean;
    namer:any;
    
}
export default function ModalsEditClient({modal,toggler,setReload,reload,namer}:ModalsProps) {
  const[controlLoad,setControlLoad] = React.useState(true)
  const[name,setName] = React.useState()
  const[color,setColor] = React.useState()
  React.useEffect(() => {
    setName(namer.name)
    setColor(namer.color)
  },[namer])
  const body = (
    <WavesModal toggler={toggler}>
    {controlLoad? (
            <FormStyle onSubmit={function handlerCreateMercadory(event){
                event.preventDefault();
                setControlLoad(false)
                const dadosForm = new FormData(event.target)
                const mercadoryItem = {
                    idClient:namer.id,
                    name:dadosForm.get('name'),
                    color:dadosForm.get('color'),
                }
                fetch('/api/editClient',{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json',
                    },
                    body: JSON.stringify(mercadoryItem)
                }).then(async(response) => {
                    setReload(!reload)
                    setControlLoad(true)
                }).catch((err) => alert('Erro ao Adicionar Mercadoria'))
            }}>
                <InputBox>
                    <InputComponent name='name'  onChange={(e) => setName(e.target.value)} value={name} placeholder="Nome do Client"/>
                </InputBox>
                <h3>alterar cor(opcional)</h3>
                <InputBox>
                    <InputComponent name='color'  onChange={(e) => setColor(e.target.value)} type='color' value={color} />
                </InputBox>
                <Buttons type='submit'>Alterar Cliente</Buttons>
            </FormStyle> 


    ) : (<LoagindPage/>) }
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