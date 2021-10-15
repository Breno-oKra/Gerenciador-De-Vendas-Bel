import React from 'react';
import {InputBox,InputComponent} from '../FormComponent/FormMercadoryCalc/style'
import {FormStyle,Buttons} from '../../styles/pages/Simulation.styles'
import WavesModal from '../../styles/modals/modalWaves';
import { ModalAlign } from './modal';
import {ProviderProps} from '../../pages/providers'
type ModalsProps = {
    data?:ProviderProps;
    modal: boolean;
    toggler: any
    edit:boolean;
    editFull:boolean;
    onSubmit:any;
    modalProvider:boolean;
    loaderDate?:boolean;
}
export default function ModalsAddProvider({data,modal,toggler,editFull,edit,onSubmit,modalProvider,loaderDate}:ModalsProps) {
    const[names,setName] = React.useState<string>()
    const[emails,setEmail] = React.useState<string>( )
    const[phones,setPhone] = React.useState<Number>( )
    const[Images,setImage] = React.useState<string>( )
    React.useEffect(() => {
        setName(data == undefined?  "" : data.name)
        setEmail(data == undefined?  "" : data.email)
        setPhone(data == undefined?  0 : data.phone )
        setImage(data == undefined?  "" : data.image)
    },[loaderDate])
  const body = (
        <WavesModal toggler={toggler}>
            {modalProvider?(
                <FormStyle onSubmit={onSubmit}>
                    {
                        editFull?
                        (
                            <>
                                <InputBox>
                                    <p>Name</p>
                                    <InputComponent name='name' placeholder="Nome do Fornecedor" onChange={(event) => setName(event.target.value)} value={names}/>
                                </InputBox>
                                <InputBox>
                                    <p>Imagem(opcional)</p>
                                    <InputComponent name='image' placeholder="Imagem do Fornecedor" onChange={(event) => setImage(event.target.value)} value={Images}/>
                                </InputBox>
                            </>
                        ):
                        (
                          <></>  
                        )
                    }
                  
                    <InputBox>
                        <p>Email(opcional)</p>
                        <InputComponent name='email' placeholder="email(opcional)" onChange={(event) => setEmail(event.target.value)} value={emails}/>
                    </InputBox>
                    <InputBox>
                        <p>telefone(opcional)</p>
                        <InputComponent name='phone' placeholder="telefone(opcional)" onChange={(event) => setPhone(event.target.value)} value={phones}/>
                    </InputBox>
                   

                    <Buttons type='submit'>{edit? 'Editar Fornecedor' : 'Adicionar Fornecedor'}</Buttons>
                </FormStyle> 
                ):(<h3>carregando mercadoria</h3>)}
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