import React from 'react';
import styled from 'styled-components'
import Modal from '@material-ui/core/Modal';
import {InputBox,InputComponent,SelectComponent} from '../FormComponent/FormMercadoryCalc/style'
import {TableMercadoriaProps} from "../../../pages/mercadoryOff"
import {ClientsProps} from "../../../pages/pag"
import {Form} from '../FormComponent';
import { QtdItemCalc } from '../../Utils/cals';
import { IsLockyDubmit } from '../../Utils/verifications';
import WavesModal from '../../styles/modals/modalWaves';
import LoagindPage from '../LoadPage/loadingBd';
import {ButtonClose} from '../../styles/modals/modalWaves';
import {Button} from '@material-ui/core';

export const ModalAlign = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
  
`

type ModalsProps = {
    modal: boolean
    datPay: boolean
    toggler: any
    data: TableMercadoriaProps;
    reloadDate: boolean;
    setReload:any;
}
export default function Modalsy({modal,datPay,toggler,data,reloadDate,setReload}:ModalsProps) {
    const[datePay,setDataPay] = React.useState(datPay)
    const[CLients,setClients] = React.useState<ClientsProps[]>()
    const[controlLoad,setControlLoad] = React.useState(true)
    const[valSection,setValSection] = React.useState()
    React.useEffect(() => {
        fetch('https://graphql.datocms.com/',{
            method:'POST',
            headers:{
                'Authorization': `ed0fff434048dc9cd053d75ef77e64`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body:JSON.stringify({"query":`
                query{
                        allClients {
                        id
                        name
                    }
                    
                }
            `
            })
        }).then((response) => response.json()
        ).then((response) => {
            setClients(response.data.allClients)
        })
    },[])
  const body = (
        <WavesModal toggler={toggler}>
           
            {controlLoad?
                (<Form action="/"                 
                    onSubmit={function handlerCreateMercadory(event){      
                        event.preventDefault();
                        const dadosForm = new FormData(event.target)                    
                       if((IsLockyDubmit(dadosForm.get('dataPay')) !== false) && dadosForm.get("buy") !== null){
                            setDataPay(false)
                            setControlLoad(false)
                            const mercadoryItem = {
                                idMercadory:data.id,
                                idClient:dadosForm.get('client'),
                                item:data.name,
                                fornecedor:data.provider,
                                pay:dadosForm.get('pagamento') == '2'? 'efetivado' : IsLockyDubmit(dadosForm.get('dataPay')) ,
                                qtd: dadosForm.get('buy'),
                                invested:data.invested,
                                valueItem:data.valueitem,
                            }
                            fetch('/api/buyMercadory',{
                                method:'POST',
                                headers:{
                                    'Content-Type':'application/json',
                                },
                                body: JSON.stringify(mercadoryItem)
                            }).then(async(response) => {
                                setReload(!reloadDate)
                                setControlLoad(true)
                            }).catch((err) => alert('Erro ao Adicionar Mercadoria')) 
                        } 
                }}
                >
                <InputBox>
                    <p>cliente</p>
                    <SelectComponent id='client' name="client">
                        {
                        CLients? (CLients.map((item) => (
                            <option key={item.id} value={item.id}>{item.name}</option>

                        ))) : <option key={1324} value={0}>Nenhum Client</option> }  
                    </SelectComponent>
                </InputBox>
                <InputBox>
                    <p>quantidade</p>
                    <QtdItemCalc value={valSection} setVal={setValSection} qtdStock={data.qtdstock}  />
                </InputBox>
                <InputBox>
                    <p>pagamento</p>
                    <SelectComponent id='pagamento' name="pagamento" onChange={(e) => {e.target.value == '1'? setDataPay(true) : setDataPay(false)}}>
                        <option value="2">efetivado</option>
                        <option value="1">pendente</option>
                        
                    </SelectComponent>
                </InputBox>
                {datePay? (
                    <InputBox>
                        <p>data de pagamento</p>
                        <InputComponent
                        name='dataPay'
                        type="date" 
                        
                        />
                    </InputBox>) : <></>}

                <Button type='submit'>Adicionar Venda</Button>
            </Form>):(<LoagindPage/>)}
        </WavesModal>

                     
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