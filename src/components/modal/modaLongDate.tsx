import React,{useState} from 'react';
import LoagindPage from '../LoadPage/loadingBd';
import { TextItem,BoxCamp,BoxAvatar,Avatares } from '../../styles/modals/modalConfirmPay.style';
import {FormStyle,Buttons} from '../../styles/pages/Simulation.styles'
import { Avatar} from '@material-ui/core';
import { ModalAlign } from './modal';
import WavesModal from '../../styles/modals/modalWaves';
import {calcNameAnsLastName} from '../../Utils/cals'
import { IsLockyDubmit } from '../../Utils/verifications';
import {InputBox,InputComponent} from '../FormComponent/FormMercadoryCalc/style'

type ModalsProps = {
    modal: boolean
    toggler: any
    setReload:any;
    reload:boolean
    data:any;
    setloadDates?:any;
    setReloadDates?:any;
}

export default function ModalLongDataPay({modal,toggler,setReload,reload,data,setloadDates,setReloadDates}:ModalsProps) {
  const[controlLoad,setControlLoad] = useState(true)
  console.log(data.pay)
  let datePay = new Date(data.pay)
  const body = (
      <WavesModal toggler={toggler}>
            {
                data.nameCli !== undefined?(
                    <FormStyle onSubmit={function handlerCreateMercadory(event){
                        event.preventDefault();
                        setReloadDates? setReloadDates(false) : ''
                        const dadosForm = new FormData(event.target)
                        if(IsLockyDubmit(dadosForm.get('dataPay')) !== false){
                          setloadDates? setloadDates(false) : ''
                          toggler()
                            const mercadoryItem = {
                                idBuy:data.id,
                                idClient:data.idCli,                              
                                pay:IsLockyDubmit(dadosForm.get('dataPay')),    
                            }
                            fetch('/api/prolongerData',{
                              method:'POST',
                              headers:{
                                  'Content-Type':'application/json',
                              },
                              body: JSON.stringify(mercadoryItem)
                          }).then(async(response) => {
                              setReload(!reload)
                              
                              setReloadDates? setReloadDates(true) : ''
                          }).catch((err) => alert('Erro ao Prolongar Data'))
                        }
                    }}>
                        <TextItem>{data.item}</TextItem>
                        <BoxCamp>
                            <BoxAvatar>
                                <Avatares >
                                  <Avatar style={{backgroundColor:`${data.colorCli}`,opacity:0.8}}> <p>{calcNameAnsLastName(data.nameCli)}</p></Avatar>
                                </Avatares>
                            </BoxAvatar>                            
                            <div>
                                <h1>Nova Data de Pagamento</h1>
                                <InputBox>
                                    <InputComponent type="date" name='dataPay' placeholder='nova data de pagamento'/>
                                </InputBox>
                            </div>
                          
                        </BoxCamp>
                        <Buttons type='submit'>Confirmar Data</Buttons>
                    </FormStyle> ) : <></>
                    }
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