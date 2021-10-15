import React from 'react'
import { Avatar} from '@material-ui/core';
import { PagesAlign } from '../../pages/home';
import {
    BoxContainer,
    ContainerOne,
    Box,BoxCalender,
    Calend,
    ContainerCalend,
    ContainerInfoPags,
    BoxInfoPags,
    AlignContainerOne,
    AlignItemsSecton,
    AlignAll,
    
    }from '../styles/pages/Clients.index'
import Background from '../assets/noneClient';

import ClientsPendentCalender,{ComponentClient} from '../components/DayCalenderClient';
import ModalsEditClient from '../components/modal/modalEditClient'
import ModalClient from '../components/modal/modalClient';
import ModalDelete from '../components/modal/modalDelete';
import {calclPendents,calclPendentsMounth,FindePendents} from '../Utils/cals'
import PopperComp from '../components/Popover/Popper'
import {FinderClientsOnMonth,FinderColor} from '../Utils/cals-calender'
import AnimationCalender from '../components/LoadPage/animationCalender'
import {ClientsProps,HistoricBuys} from '../../pages/pag'
interface propsClient{
    data:ClientsProps[];
    pendents:HistoricBuys[];
    setReload:any;
    reload:boolean;
    setloadDates:any;
    loadDates:boolean
}

const Clients= ({data,pendents,reload,setReload,setloadDates,loadDates}:propsClient) => {
    const[indexData,setIndex] =  React.useState<number>(0)
    const[Client,setClient] = React.useState<ClientsProps>(data[indexData])
    const[loadClientBuys,setLoadClientsBuys] = React.useState<boolean>(false)
    React.useEffect(() => {
        setClient(data[indexData])
        setLoadClientsBuys(!loadClientBuys)
    },[loadDates])
    
    const[nameClie,setNameClit] = React.useState<ClientsProps>({
        id:0,
        name:'',
        datesubescrive:'',
        paypendent:0,
        colorident:'',
        historicbuy: []
    })
    const [modal, setModal] = React.useState(false);
    const[ModalEdit,setModalEdit] = React.useState(false);
    const[ModalDel,setModalDel] = React.useState(false);

    const[dataCalender,setDataCalender] = React.useState()

    const toggle = () => setModal(!modal);  
    const toggleEdit = () => setModalEdit(!ModalEdit); 
    const toggleDel = () => setModalDel(!ModalDel); 

      function tileContent({ date, view }) {    
        if (view === 'month') {  
            
            let dataTemp = null
           
            //ajuda a não calcular dias de outros meses junto com o mes atual
            date.getDate() === 25? setDataCalender(date.getMonth()) : ''
            if(pendents.find((item) => {
                
                dataTemp = new Date(item.pay)
                if(dataTemp.getDate() === date.getDate() && dataTemp.getMonth() === date.getMonth() && dataTemp.getFullYear() === date.getFullYear()){
                    return true
                }  
            })){    
                let resultItemColor = FinderClientsOnMonth(pendents,date)
                let findy = FinderColor(resultItemColor) 
                return <ComponentClient color={findy} />
            }
        }
      }
      function tileClassName({ date, view }) {  
        let dataTemp = null   
        if (view === 'month') {   
            if(pendents.find((item) => {
                dataTemp = new Date(item.pay)
                if(dataTemp.getDate() === date.getDate() && dataTemp.getMonth() === date.getMonth() && dataTemp.getFullYear() === date.getFullYear()){
                    return true
                }
            })){             
                return 'daySelecty'
            }
        }
      }
      
    return(
        <PagesAlign>
           
            <BoxContainer>
                {data.length > 0?(
                    <ContainerOne>
                        <AlignContainerOne>
                        {data.map((item) => (
                            <Box  key={item.name} colorCli={item.colorident} >
                                <button className="alignAll" onClick={() => {
                                            setIndex(data.indexOf(item))
                                            
                                            setTimeout(() => toggle(),1000)
                                        }} >
                                    <div className="BoxImage">
                                        <Avatar style={{backgroundColor:`${item.colorident}`,opacity:0.8}} >{item.name[0]}</Avatar>
                                        <h2>{item.name}</h2>
                                    </div>
                                    
                                    <div className='BoxInfo'>
                                        <table key={item.name}>
                                            <tr>
                                                <th>total de compras</th>
                                                <th>compras pendentes</th>
                                            </tr>
                                            <tr>
                                                <td>{item.historicbuy.length}</td>
                                                <td>{item.paypendent}</td>
                                                
                                            </tr>
                                        
                                        </table>
                                        

                                    </div>
                                </button>
                                <PopperComp funEdit={() => {
                                    setNameClit({...item})
                                    setModalEdit(!ModalEdit)   
                                    
                                }}funDel={() => {
                                    setNameClit({...item})
                                    setModalDel(!ModalDel)   
                                    
                                }}/>
                            </Box>
                        ))}
                        </AlignContainerOne>
                    </ContainerOne>
                ):(<ContainerOne><Background/></ContainerOne>)}   
                    <ContainerCalend>
                        <AlignAll>
                            
                            <ContainerInfoPags>
                                
                                <AnimationCalender/>
                                <BoxInfoPags>
                                    <h3>a receber</h3>
                                    <p>{calclPendents(pendents)}$</p>
                                </BoxInfoPags>
                                <BoxInfoPags>
                                    <h3>a receber neste mes</h3>
                                    <p>{calclPendentsMounth(dataCalender,pendents)}$</p>
                                </BoxInfoPags>
                                
                            </ContainerInfoPags>
                            <AlignItemsSecton>
                                <BoxCalender >
                                    
                                    <Calend
                                        onChange={(item) => alert(item) }
                                        value={new Date()}
                                        tileContent={tileContent}
                                        tileClassName={tileClassName}
                                    />
                                </BoxCalender>
                                <ClientsPendentCalender data={data} reload={reload} setReload={setReload} setloadDates={setloadDates} />
                            </AlignItemsSecton>
                         </AlignAll>
                    </ContainerCalend>
                       
            </BoxContainer>
            <ModalClient modal={modal} toggler={toggle} data={Client} setReload={setReload} reload={reload}  loadDates={loadClientBuys}/>
            <ModalsEditClient reload={reload} modal={ModalEdit} toggler={toggleEdit} setReload={setReload} namer={{id:nameClie.id,name:nameClie.name,color:nameClie.colorident}}/>
            <ModalDelete 
                title="tem certeza que deseja deletar este cliente?"
                info="não é possivel deletar clientes com pagamentos pendentes ou efetivados, altere ou exclua-os antes"  
                modal={ModalDel} 
                toggler={toggleDel} 
                OnSubmit={function handlerCreateMercadory(event){
                        event.preventDefault();
                        if(FindePendents(nameClie)){
                            setloadDates(false)
                            const mercadoryItem = {
                                idClient:nameClie.id,
                            }
                            fetch('/api/deleteCli',{
                                method:'POST',
                                headers:{
                                    'Content-Type':'application/json',
                                },
                                body: JSON.stringify(mercadoryItem)
                            }).then(async(response) => {
                                setReload(!reload)
                            }).catch((err) => alert('Erro ao Deletar Cliente'))
                        }
                        
                    }}/>
        </PagesAlign>
    )
}
export default Clients