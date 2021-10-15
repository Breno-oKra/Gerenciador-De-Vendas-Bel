import React from 'react'
import {Card,CardDivImg,CardDivInfo,CardInfo,CardBoxProvedor,CardBoxActions} from '../../styles/pages/mercadoryOff'

import {TableMercadoriaProps} from '../../../pages/mercadoryOff'
import {Button} from '@material-ui/core'

interface CardProps {
    item:TableMercadoriaProps;
    seeProvider:boolean;
    setloadDates:any;
    setReload:any;
    reloadDate:boolean
    toggle?:any;
    setMercadorySelect?:any;
    modalEditToggle?:any;
    setEditFull?:any
}
interface FormProps{
    item:TableMercadoriaProps;
    setloadDates:any;
    setReload:any;
    reloadDate:boolean
    
}
const FormButton = ({item,setloadDates,setReload,reloadDate}:FormProps) => {
    return(
        <form onSubmit={function(e){
            e.preventDefault()
            if(item.qtdstock > 0){
                setloadDates(false)
                const mercadoryItem = {
                    idMercadory:item.id,
                    close:false,
                    update:true
                }
                fetch('/api/offAndDeleteMercadory',{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json',
                    },
                    body: JSON.stringify(mercadoryItem)
                }).then(async(response) => {
                    setReload(!reloadDate)
                }).catch((err) => alert('Erro ao Adicionar Mercadoria'))
            }
        }}>{item.qtdstock > 0?<Button type='submit'>reabrir</Button> : <Button title="0 items no estoque,edite e aumente o numero de items ">fechada</Button>}</form>
    )
}
export default function CardMercadoyrOff({item,seeProvider,setReload,reloadDate,setloadDates,toggle,setMercadorySelect,setEditFull,modalEditToggle}:CardProps){

    return(
        <Card>
            <CardDivImg>
                    <div className='img'>
                        <h2>{item.name}</h2>
                    </div>
                    
                    <CardDivInfo className='info'>
                        <div className="alignBox">
                            <h3>clientes</h3>
                            <p>{item.client.length}</p>
                        </div>
                        <div className="alignBox">
                            <h3>vendidos</h3>
                            <p>{item.sold}</p>
                        </div>
                        <div className="alignBox">
                            <h3>estoque</h3>
                            <p>{item.qtdstock}</p>
                        </div>
                        <div className="alignBox">
                            <h3>lucro</h3>
                            <p>{item.wins}$</p>
                        </div>
                    </CardDivInfo>
            </CardDivImg>
            <CardInfo>
                {seeProvider?(
                    <>
                        <CardBoxProvedor>
                            <img src={item.image} alt="" />
                            <h3>{item.provider}</h3>
                        </CardBoxProvedor>
                        <CardBoxActions>
                        {item.closed? <FormButton item={item} setReload={setReload} setloadDates={setloadDates} reloadDate={reloadDate} /> : <></>}
                        </CardBoxActions>
                    </>
                    ) : 
                     <CardBoxActions>
                        {item.closed? <FormButton item={item} setReload={setReload} setloadDates={setloadDates} reloadDate={reloadDate} /> : <></>}
                        <Button onClick={() => {
                            setMercadorySelect(item)
                            item.client.length > 0? setEditFull(false) : setEditFull(true)
                              
                            modalEditToggle()
                        }}>editar</Button>
                        <Button onClick={() => {
                            setMercadorySelect(item)
                            toggle()
                        }}>deletar</Button>
                    </CardBoxActions>
                }
               
            </CardInfo>
        </Card>
    )
}