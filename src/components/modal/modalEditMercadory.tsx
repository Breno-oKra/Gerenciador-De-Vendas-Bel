import React from 'react';
import {TableMercadoriaProps} from '../../../pages/mercadoryOff'
import { ModalAlign } from './modal';
import WavesModal from '../../styles/modals/modalWaves';
import FormEditMercadory from '../FormComponent/FormEditMercadory'

type ModalsProps = {
    modal: boolean
    toggler: any
    setReload:any;
    reload:boolean
    data:TableMercadoriaProps;
    setloadDates:any;
    editfull:boolean;
}

export default function ModalEditMercadoryComponent({modal,toggler,setReload,reload,data,setloadDates,editfull}:ModalsProps) {
  
  const body = (
        <WavesModal toggler={toggler}>
            {
              data?(
                <FormEditMercadory data={data} setReload={setReload} setControlLoad={setloadDates} reloadDate={reload} editfull={editfull}/>
              ):(
                <></>
              )
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