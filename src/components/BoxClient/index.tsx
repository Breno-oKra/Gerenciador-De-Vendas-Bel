import React from 'react'
import {BoxClientStyle,Letter,ContainerButtons,ButtonClient,ContainerDates,ContainerSearch} from './BoxClient.style'
import { Avatar} from '@material-ui/core';
import {Table} from './BoxClient.style'
import { ClientsProps,HistoricBuys } from '../../../pages/pag';
import {AiFillDelete,AiFillEdit,AiOutlineSearch,AiOutlineClose} from 'react-icons/ai'
import { BoxSearch} from '../Header/Header.styles';
import ModalDelete from '../modal/modalDelete'
import LoagindPage from '../LoadPage/loadingBd';
interface BoxClientProps{
    data:ClientsProps
    setReload:any;
    reload:boolean
    loadDates:boolean;
}
export default function BoxClient({data,reload,setReload,loadDates}:BoxClientProps){
    const[modal,setModal] = React.useState(false)
    const[DataBuys,setDataBuys] = React.useState<HistoricBuys[]>(data.historicbuy)
    const[DataSelect,setDataSelect] = React.useState<HistoricBuys>()
    const[SerachBus,setSearchBuys] = React.useState<string>()
    React.useEffect(() => {
        setDataBuys(data.historicbuy)
        setControlLoad(true)
    },[loadDates])
    const[ControlLoad,setControlLoad] = React.useState<boolean>(true)
   
    const toggler = () => setModal(!modal)
    function ViewDate(item){
        let date = new Date(item)
        return date.toLocaleDateString('pt-br')
    }
    function SerchDataBuys(){  
        if(SerachBus == '' || SerachBus == undefined){
            setDataBuys(data.historicbuy) 
            return
        }
        const filtered = DataBuys.filter((item) => item.item.toUpperCase().indexOf(SerachBus.toUpperCase()) !== -1 || item.fornecedor.toUpperCase().indexOf(SerachBus.toUpperCase()) !== -1)
        setDataBuys(filtered)
    }
    function CalcMoneys(data,pendents){
        let calc = 0
        if(pendents){
            data.map((item) => {
                if(item.pay !== 'efetivado'){
                    calc = calc + item.valueTotal
                }
                
            })
            return calc
        }   
        data.map((item) => {
            calc = calc + item.valueTotal
        })

        return calc
    }
    return (
        <BoxClientStyle >
                    <div className="profileClient">
                        <div className="avatarCli">
                            <Avatar className={'pink'}>{data.name[0]}</Avatar>
                            <h1>{data.name}</h1>
                        </div>
                        <ContainerDates>
                            <div className="alignCard">
                                <div>
                                    <p className="titles">cliente desde</p>
                                    <h3>{data.datesubescrive}</h3>
                                </div>
                                <div>
                                    <p className="titles">total de compras</p>
                                    <h3>{data.historicbuy.length}</h3>
                                </div>
                                <div>
                                    <p className="titles">gastos</p>
                                    <h3 className="money">{CalcMoneys(data.historicbuy,false)}$</h3>
                                </div>
                                <div>
                                    <p className="titles">devendo</p>
                                    <h3 className="money">{CalcMoneys(data.historicbuy,true)}$</h3>
                                </div>
                            </div>
                        </ContainerDates>                        
                    </div>
                    <ContainerSearch>
                        <h3>Historico de Compras</h3>
                        <div className="alignSearch">
                            <BoxSearch >
                                <input onChange={(event) => {         
                                setSearchBuys(event.target.value)                     
                                }} type="text" placeholder="pesquisar" />
                                <button onClick={SerchDataBuys}>
                                    <AiOutlineSearch/>
                                </button>
                                
                            </BoxSearch>
                        </div>              
                    </ContainerSearch>
                    {ControlLoad?
                    (
                    <Table>
                        <tr className="headerTable">
                            <th><h3>Item</h3></th>
                            <th><h3>valor</h3></th>
                            <th><h3>Fornecedor</h3></th>
                            <th><h3>quantidade</h3></th>
                            <th><h3>pagamento</h3></th>
                            <th><h3>Dia Da Compra</h3></th>
                            <th><h3>Ações</h3></th>
                        </tr>
                        {
                        
                        DataBuys.map((item) => (
                            <tr key={item.id}>
                                <td><h4>{item.item || ``}</h4></td>
                                <td><h4>{item.valueTotal || ``}$</h4></td>
                                <td><h4>{item.fornecedor || ``}</h4></td>
                                <td><h4>{item.qtd || ``}</h4></td>
                                <td><h4>{item.pay == 'efetivado'? <Letter>{item.pay}</Letter> : ViewDate(item.pay)}</h4></td>
                                <td>
                                    <h4>{ViewDate(item.dayOfBuy) || ``}</h4>
                                </td>                     
                                <td>
                                    <ContainerButtons><ButtonClient onClick={() => {
                                        setDataSelect(item)
                                        setModal(!modal)
                                    }} className="del"><AiFillDelete color={'#ea8685'}/></ButtonClient></ContainerButtons>
                                </td>
                            </tr>
                        ))}
                        
                    </Table>
                     ):
                     (
                         <LoagindPage/>
                     )}
                    <ModalDelete 
                        title="tem certeza que deseja deletar este fornecedor?"
                        info="não é possivel deletar fornecedores com mercadorias,delete as mercadorias desde fornecedor primeiro "       
                        modal={modal} 
                        toggler={toggler} 
                        OnSubmit={function handlerCreateMercadory(event){
                            event.preventDefault();
                            setControlLoad(false)
                            setModal(!modal)
                                fetch('/api/deleteHistoric',{
                                    method:'POST',
                                    headers:{
                                        'Content-Type':'application/json',
                                    },
                                    body: JSON.stringify({idMercadory:DataSelect.idMercadory,idClient:data.id,idObject:DataSelect.id,provider:DataSelect.fornecedor})
                                }).then(async(response) => {
                                    setReload(!reload)
                                    setDataBuys(data.historicbuy)
                                    
                                }).catch((err) => alert('Erro ao Deletar Fornecedor'))                   
                        }}/> 
        </BoxClientStyle>
    )
}