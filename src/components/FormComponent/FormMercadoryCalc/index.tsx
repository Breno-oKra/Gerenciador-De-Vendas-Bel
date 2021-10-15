import React from 'react'

import {FormStyle,Buttons} from '../../../styles/pages/Simulation.styles'
import { useState } from 'react';
import {CalcProfit} from '../../../Utils/cals'
import {InputBox,InputComponent} from './style'

interface State {
  numberformat: string;
}
interface FormaAddProps{
  provider?:string;
  image?:string;
  idProvider?:number;
  reloadDate?: boolean;
  setReload?:any;
  setControlLoad?:any
  setValues?:any;
  calc:boolean

}

export default function FormAddMercadory({provider,image,idProvider,reloadDate,setReload,setControlLoad,setValues,calc}:FormaAddProps){
    const[controlForm,setControlForm] = React.useState<boolean>(calc)
    const [valueInvested, setValuesInvested] = React.useState<State>({
        numberformat: '',

    });
    const [valuesProduct, setValuesProduct] = React.useState<State>({
      numberformat: '',

    });
    const [qtdItem,setQtdItem] = useState(0)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValuesInvested({
          ...valueInvested,
          numberformat: event.target.value,
        });
      };
      const handleChangeTwo = (event: React.ChangeEvent<HTMLInputElement>) => {
        
        setValuesProduct({
          ...valuesProduct,
          numberformat: event.target.value,
        });
      };
      const[controlButtonAdd,setControlButtonAdd] = useState<boolean>(false)
      return(
        
        <FormStyle className="formResponsive"  onSubmit={function handlerCreateMercadory(event){
                event.preventDefault();
                setControlLoad(false)
                const dadosForm = new FormData(event.target)
                const mercadoryItem = {
                    name:dadosForm.get('name'),
                    idProvider:idProvider,
                    provider:dadosForm.get('provider'),
                    imageProvider:dadosForm.get('imageProvider'),
                    qtdItems:dadosForm.get('qtdItems'),
                    invested:dadosForm.get('numberformat'),
                    valueItem:dadosForm.get('numberformat2'),

                }
                fetch('/api/mercadory',{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json',
                    },
                    body: JSON.stringify(mercadoryItem)
                }).then(async(response) => {
                    setReload(!reloadDate)
                    setControlLoad(true)
                }).catch((err) => alert('Erro ao Adicionar Mercadoria'))
            }}>
              {!controlForm?(
                  <>
                  <InputBox>
                        <InputComponent name='name' placeholder="Nome da Mercadoria" required/>
                    </InputBox>
                    <InputBox>
                        <InputComponent name='provider' placeholder="Nome do fornecedor" value={provider} Readonly  />
                    </InputBox>
                    <InputBox style={{display:'none'}}>
                        <InputComponent name='imageProvider' placeholder="imagem do fornecedor" value={image} Readonly  />
                    </InputBox>
                    
                  </>
                ):(<></>)
              }
              <InputBox>
              <InputComponent 
                name='qtdItems'
                placeholder="Quantidade de Items" 
                type="number"
                onChange={(event) => {
                    setQtdItem(event.target.value)
                
                }}
                required
                />
            </InputBox>
            <InputBox>
              <InputComponent 
                placeholder="Valor de Investimento" 
                value={valueInvested.numberformat}
                onChange={handleChange}
                name="numberformat"
                required
                />
            </InputBox>
            <InputBox>
              <InputComponent 
                placeholder="Valor de Cada Produto" 
                value={valuesProduct.numberformat}
                onChange={handleChangeTwo}
                name="numberformat2"
                required
                />
            </InputBox>
            {controlForm? 
                (
                  <>
                  <Buttons onClick={() => {
                      if(valueInvested.numberformat !== ''){
                          setControlButtonAdd(true) 
                      }
                      const result = CalcProfit(qtdItem,valueInvested.numberformat,valuesProduct.numberformat)
                      setValues(result)
                    }}>Simular Venda
                    </Buttons> 
                   
                  </>
                ):(
                  <Buttons  type='submit'>Adicionar Venda</Buttons>) 
            }          
        </FormStyle>
    )
}