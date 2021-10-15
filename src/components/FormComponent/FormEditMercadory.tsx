import React from 'react'

import {FormStyle,Buttons} from '../../styles/pages/Simulation.styles'
import { useState } from 'react'
import {InputBox,InputComponent} from './FormMercadoryCalc/style'
import {TableMercadoriaProps} from '../../../pages/mercadoryOff'
interface State {
  numberformat: string;
}
interface FormaAddProps{
  
  data:TableMercadoriaProps;
  reloadDate?: boolean;
  setReload?:any;
  setControlLoad?:any;
  editfull:boolean;

}

export default function FormEditMercadory({data,reloadDate,setReload,setControlLoad,editfull}:FormaAddProps){
    const[name,setName] = React.useState<string>(data.name)
    const [valueInvested, setValuesInvested] = React.useState<State>({
        numberformat:data.invested.toString(),

    });
    const [valuesProduct, setValuesProduct] = React.useState<State>({
      numberformat:data.valueitem.toString() ,

    });
    const [qtdItem,setQtdItem] = useState(data.qtdstock)
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
      return editfull?(
        
        <FormStyle className="formResponsive"  onSubmit={function handlerCreateMercadory(event){
                event.preventDefault();
                    setControlLoad(false)
                    const dadosForm = new FormData(event.target)
                    const mercadoryItem = {
                        idMercadory:data.id,
                        name:dadosForm.get('name'),
                        qtdItems:dadosForm.get('qtdItems'),
                        invested:dadosForm.get('numberformat'),
                        valueItem:dadosForm.get('numberformat2'),
                        update:true,
                        edit:true

                    }
                    fetch('/api/offAndDeleteMercadory',{
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

            <InputBox>
                <p>nome da Mercadoria</p>
                <InputComponent name='name' placeholder="Nome da Mercadoria" onChange={(event) => setName(event.target.value)} value={name} required />
            </InputBox>
              <InputBox>
              <p>quantidade de items</p>
              <InputComponent 
                name='qtdItems'
                placeholder={`acima de ${data.qtdstock}`}
                value={qtdItem}
                type="number"
                onChange={(event) => {
                    setQtdItem(event.target.value)
                }}
                required
                />
            </InputBox>
            <InputBox>
             <p>valor do investimento</p>
              <InputComponent 
                placeholder="Valor de Investimento" 
                value={valueInvested.numberformat}
                onChange={handleChange}
                name="numberformat"
                required
                />
            </InputBox>
            <InputBox>
                <p>valor de cada produto</p>
              <InputComponent 
                placeholder="Valor de Cada Produto" 
                value={valuesProduct.numberformat}
                onChange={handleChangeTwo}
                name="numberformat2"
               required
                />
            </InputBox>        
            <Buttons  type='submit'>Editar Mercadoria</Buttons>        
        </FormStyle>
    ):
    (
        <FormStyle className="formResponsive"  onSubmit={function handlerCreateMercadory(event){
            event.preventDefault();
            setControlLoad(false)
            const dadosForm = new FormData(event.target)
            const mercadoryItem = {
                idMercadory:data.id,
                qtdItems:dadosForm.get('qtdItems'),
                valueItem:dadosForm.get('numberformat2'),
                update:true,
                edit:true

            }
            fetch('/api/offAndDeleteMercadory',{
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
          <InputBox>
          <p>quantidade de items</p>
            <InputComponent 
                name='qtdItems'
                placeholder="Quantidade de Items" 
                type="number"
                value={qtdItem}
                onChange={(event) => {
                    setQtdItem(event.target.value)
                }}/>
            </InputBox>
            <InputBox>
            <p>valor de cada produto</p>
            <InputComponent 
                placeholder="Valor de Cada Produto" 
                value={valuesProduct.numberformat}
                onChange={handleChangeTwo}
                name="numberformat2"
                />
            </InputBox>        
            <Buttons  type='submit'>Editar Mercadoria</Buttons>        
        </FormStyle>
    )
}