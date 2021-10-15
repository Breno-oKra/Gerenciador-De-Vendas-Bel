import React,{useState} from 'react';
import { QtdItemCalc } from '../../Utils/cals';
import { TextItem,BoxCamp,BoxAvatar,Boxys,PayText,Avatares } from '../../styles/modals/modalConfirmPay.style';
import {FormStyle,Buttons} from '../../styles/pages/Simulation.styles'
import { Avatar} from '@material-ui/core';
import { ModalAlign } from './modal';
import WavesModal from '../../styles/modals/modalWaves';

import {CalcValueItmesPay,calcNameAnsLastName} from '../../Utils/cals'

type ModalsProps = {
    modal: boolean
    toggler: any
    setReload:any;
    reload:boolean
    data:any;
    setloadDates?:any;
    setReloadDates?:any;
}

export default function ModalsConfirmPay({modal,toggler,setReload,reload,data,setloadDates,setReloadDates}:ModalsProps) {
  const[valSection,setValSection] = useState(data.qtd || 1)
  
  const body = (
      <WavesModal toggler={toggler}>
            {
                data.nameCli !== undefined?(
                    <FormStyle onSubmit={function handlerCreateMercadory(event){
                        event.preventDefault();
                        toggler()
                        const dadosForm = new FormData(event.target)
                            setloadDates? setloadDates(false) : ''
                            setReloadDates? setReloadDates(false) : ''
                            const mercadoryItem = {
                                id:data.id,
                                idMercadory:data.idMercadory,
                                idClient:data.idCli,
                                payPendent:data.payPendent,
                                item:data.item,
                                fornecedor:data.fornecedor,
                                pay:data.qtd == valSection? 'efetivado' : data.pay,
                                qtdBuy: dadosForm.get('buy'),
                                qtdStok:data.qtd,
                                valueItem:data.valueItem,
                                dayOfBuy:data.dayOfBuy
                            }

                           fetch('/api/PayMercadory',{
                              method:'POST',
                              headers:{
                                  'Content-Type':'application/json',
                              },
                              body: JSON.stringify(mercadoryItem)
                          }).then(async(response) => {
                              setReload(!reload)
                              
                              setReloadDates? setReloadDates(true) : ''
                          }).catch((err) => alert('Erro ao Adicionar Mercadoria'))
                        
                    }}>
                        <TextItem>{data.item}</TextItem>
                        <BoxCamp>
                            <BoxAvatar>
                                <Avatares >
                                  <Avatar style={{backgroundColor:`${data.colorCli}`,opacity:0.8}}> <p>{calcNameAnsLastName(data.nameCli)}</p></Avatar>
                                </Avatares>
                            </BoxAvatar>                            
                            <div>
                                <Boxys>
                                    <td>
                                        <tr>
                                            <h3>items pago</h3>
                                        </tr>
                                        <tr>
                                            <h3>a receber por {valSection} items: </h3>
                                        </tr>
                                    </td>
                                    <td className="infosPay">
                                        <tr>
                                            <QtdItemCalc value={valSection} setVal={setValSection} qtdStock={data.qtd}/>
                                        </tr>
                                    
                                        <tr>
                                            <PayText> {CalcValueItmesPay(data.valueItem,valSection)}$</PayText>
                                        </tr>
                                    </td>
                                </Boxys>
                            </div>
                          
                        </BoxCamp>
                        <Buttons type='submit'>Confirmar o Pagamento de {valSection} items</Buttons>
                    </FormStyle> ) : <></>}
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