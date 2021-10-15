import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import FormAddMercadory from '../FormComponent/FormMercadoryCalc'
import {ModalAlign} from './modal'
import WavesModal from '../../styles/modals/modalWaves';



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 600,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: 10,
    },
  }),
);
type ModalsProps = {
    modal: boolean;
    toggler: any;
    idProvider:number;
    provider:string;
    image:string;
    reloadDate: boolean;
    setReload:any;
}
export default function ModalAddMercadory({modal,idProvider,provider,image,toggler,reloadDate,setReload}:ModalsProps) {
  const[controlLoad,setControlLoad] = React.useState(true)
  const body = (
    <WavesModal toggler={toggler}>
      {controlLoad?(<FormAddMercadory provider={provider} image={image} idProvider={idProvider} reloadDate={reloadDate} setReload={setReload} setControlLoad={setControlLoad} calc={false}/>):(<h3>carregando mercadoria</h3>)}
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