import React from 'react'
import {ContainerTable,TableStyle,ImageProvider,BtnActions} from './TableMercadorias.styles'
import {AiOutlinePlus} from 'react-icons/ai'
import Modals from '../modal/modal'
import {TableMercadoriaProps} from "../../../pages/mercadoryOff"
import {BsFillLockFill} from 'react-icons/bs'
type ArrayProps = {
    data: TableMercadoriaProps[];
    reloadDate: boolean;
    setReload:any;
    setloadDates:any
}
export default function TableMercadorias({data,setReload,reloadDate,setloadDates}:ArrayProps){
    const [clientsPag,setClientsPag] = React.useState(data[0])
    const [modal, setModal] = React.useState(false);
    const[datePay,setDataPay] = React.useState(false)
    const toggle = () => setModal(!modal);


    return(
        <ContainerTable >
        <TableStyle className='tableMain'>
            <thead>
                <tr className="headerTable">

                    <th><h3>Mercadoria</h3></th>
                    <th><h3>Fornecedor</h3></th>
                    <th><h3>Investido</h3></th>
                    <th><h3>Item no Estoque</h3></th>
                    <th><h3>Valor Cada Item</h3></th>
                    <th><h3>Vendido</h3></th>
                    <th><h3>Ganhos Atual</h3></th>
                    <th><h3>Lucro</h3></th>
                    <th><h3>Açoes</h3></th>
                </tr>
            </thead>
            <tbody>
            {data.map((item) => (
                <tr key={item.id}>
                
                    <td className='boxName'>

                        <h4>{item.name}</h4>
                    </td>
                    <td>
                        <ImageProvider title="fornecedor" src={item.image}/>
                        <h4>{item.provider}</h4>
                    </td>
                    <td>
                        
                        <h4 title="investido">{item.invested}$</h4>
                    </td>

                    <td>
                        <h4>{item.qtdstock}</h4>
                    </td>
                    <td>

                        <h4>{item.valueitem}$</h4>
                    </td>
                    <td>
                    
                        <h4>{item.sold} items</h4>
                    </td>
                    <td>

                        <h4>{item.wins}$</h4>
                    </td>
                    <td>
                    
                        <h4>{item.profit}$</h4>
                    </td>
                    <td >
                        <BtnActions title="adicionar venda" onClick={() => {
                            toggle()
                            setClientsPag(item)
                        }}><AiOutlinePlus color={'green'}/> </BtnActions>
                        <form onSubmit={function(e){
                            e.preventDefault()
                            setloadDates(false)
                            const mercadoryItem = {
                                idMercadory:item.id,
                                close:true,
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
                            
                        }}>
                            <BtnActions title="fechar mercadoria" type="submit"><BsFillLockFill color={'red'}/> </BtnActions>
                        </form>
                        
                    </td>
                </tr>
            ))}
            </tbody>
       </TableStyle>
       <Modals modal={modal} datPay={datePay} toggler={toggle} data={clientsPag} reloadDate={reloadDate} setReload={setReload} /> 
       </ContainerTable>
    )
}