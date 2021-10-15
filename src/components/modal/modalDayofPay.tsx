import React, { useState } from 'react';
import styled from 'styled-components'
import Modal from '@material-ui/core/Modal';
import { Box,BoxButtons,BoxInfo,Infos,CircleCli} from '../../styles/modals/modalDayOfPay.style';
import ModalsConfirmPay from '../modal/modalConfirmPay'
import ModalLongDataPay from '../modal/modaLongDate'
import {Button} from '@material-ui/core'
import WavesModal from '../../styles/modals/modalWaves';
export const ModalAlign = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
  
`

type ModalsProps = {
    modal: boolean
    toggler: any
    data: any;
    reloadDate: boolean;
    setReload:any;
}
export default function ModalOfDayPay({modal,toggler,data,reloadDate,setReload}:ModalsProps) {
    const[clientSelect,setClientSelect] = useState({})
   const[modals,setModal] = React.useState<boolean>(false)
   const[modalProlong,setModalProlong] = React.useState<boolean>(false)
    const[reloadDades,setReloadDates] = React.useState<boolean>(true)
   const toggle = () => setModal(!modals)
   const toggleProlong = () => setModalProlong(!modalProlong)
  const body = (
      <WavesModal toggler={toggler}>
        <h3>pagamentos expirados</h3>
      {
          reloadDades?(data.map((item) => (
            <Box key={item.id}>
                <BoxInfo>
                    <div>
                        <CircleCli style={{backgroundColor:`${item.colorCli}`}}>{item.nameCli[0]}</CircleCli>
                        <p>{item.nameCli}</p>
                    </div>
                    <Infos>
                        <div>receber :  <p className="green">{item.valueTotal}$</p></div>             
                        <p className="strong">{item.qtd} {item.item}</p>
                    </Infos>
                </BoxInfo>
               <BoxButtons>
                    <Button onClick={() => {
                         setClientSelect(item)
                         toggle()
                    }}>
                        Efetivar pagamento
                    </Button>
                    <Button onClick={() => {
                         setClientSelect(item)
                         toggleProlong()
                    }}>
                        Adiar pagamento
                    </Button>
               </BoxButtons>
               
            </Box>
          ))):<></>
      }
       <ModalsConfirmPay modal={modals} toggler={toggle} data={clientSelect} reload={reloadDate} setReload={setReload} setReloadDates={setReloadDates}/>
        <ModalLongDataPay modal={modalProlong} toggler={toggleProlong} data={clientSelect} reload={reloadDate} setReload={setReload} setReloadDates={setReloadDates} />
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