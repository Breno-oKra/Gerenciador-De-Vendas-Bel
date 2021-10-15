import React from 'react'
import { ClientsProps } from '../../../pages/pag';
import {Container,BoxClietnsCalender,CircleColor,CLi,ContainerInfo,ContainerButtons,AlignInfos} from "./DayCalenderClient.style"
import {BiTime,BiCheck} from 'react-icons/bi'
import ModalsConfirmPay from '../modal/modalConfirmPay'
import ModalLongDataPay from '../modal/modaLongDate'
type DataProps = {
    data:ClientsProps[];
    setReload:any;
    reload:boolean;
    setloadDates:any;
}
export const ComponentClient = ({color}) => {  
    
    return(
        <CLi>
            {
                color.map((i) => (
                    <div style={{backgroundColor:`${i.color}`}}></div>
                ))
            }
        </CLi>
    )
}
export default function ClientsPendentCalender({data,setReload,reload,setloadDates}:DataProps){
    const[modal,setModal] = React.useState<boolean>(false)
    const[modalProlong,setModalProlong] = React.useState<boolean>(false)
    const toggler = () => setModal(!modal)
    const togglerProlong = () => setModalProlong(!modalProlong)
    const[clientSelect,setClientSelect] = React.useState({})
    return(
        <Container>
            {data.map((item) => (
                item.historicbuy.map((i) => {
                    return (i.pay !== 'efetivado'? (
                        <BoxClietnsCalender key={i.idMercadory+item.id+i.pay}>

                            <CircleColor  style={{backgroundColor:`${item.colorident}`}} title={item.name}><p>{item.name.slice(0,2)}</p></CircleColor>
                            <ContainerInfo>
                                <AlignInfos>
                                    <div>
                                        <h3>{i.pay.slice(8,10) }/{i.pay.slice(5,7)}</h3>
                                    </div>
                                    <div>
                                        <h3 title={i.item}>{i.qtd} {i.item.length >10? `${i.item.slice(0,10)}...` : i.item}</h3>
                                    </div>
                                    <div>
                                        <h3 className='moneyTotal'>{i.valueTotal}$</h3>
                                    </div>
                                </AlignInfos>
                               
                                <ContainerButtons>
                                    <button 
                                        title={'compra efetivada'} 
                                        onClick={() => {
                                            setClientSelect({...i,id:i.id,idCli:item.id,nameCli:item.name,colorCli:item.colorident,payPendent:item.paypendent})
                                            toggler()
                                    }}>
                                        <BiCheck color={'green'}/>
                                    </button>

                                    <button title={'pronlogar data'} 
                                    onClick={() => {
                                            setClientSelect({...i,id:i.id,idCli:item.id,nameCli:item.name,colorCli:item.colorident,payPendent:item.paypendent})
                                            togglerProlong()
                                    }}><BiTime color={'red'} /></button>                                
                                </ContainerButtons>
                            </ContainerInfo>
                            
                        </BoxClietnsCalender>
                    ) : <></>  

                )})
            ))}
           <ModalsConfirmPay modal={modal} toggler={toggler} data={clientSelect} reload={reload} setReload={setReload} setloadDates={setloadDates}/>
           <ModalLongDataPay modal={modalProlong} toggler={togglerProlong} data={clientSelect} reload={reload} setReload={setReload} setloadDates={setloadDates}/>
        </Container>
    )
}