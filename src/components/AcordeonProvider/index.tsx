import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Card,CardInfo,CardBoxProvedor} from '../../styles/pages/mercadoryOff'

import {ProviderProps} from '../../pages/providers'
import CardMercadoyrOff from '../mercadoryOff';
import {ContainerMercadory,BoxMercadory,Box} from './Acordeon.style'
import {AiFillDelete,AiFillEdit} from 'react-icons/ai'
import {TableMercadoriaProps} from '../../../pages/mercadoryOff'
import {GrAddCircle} from 'react-icons/gr'
import { ButtonAdd } from '../Header/Header.styles';
import ModalAddMercadory from '../modal/modalAddMercadory'
import ModalEditMercadoryComponent from '../modal/modalEditMercadory'
import { FindeClients } from '../../Utils/cals';
import ModalDelete from '../modal/modalDelete'
import ModalsAddProvider from "../modal/modalProvider"

type ArrayProps = {
    data: ProviderProps[];
    dataMercadory:TableMercadoriaProps[];
    setloadDates:any;
    setReload:any;
    reloadDate:boolean
}
type datesProps = {
    id:number
    provider:string
    image:string
}
type SelectProviderProps = {
    id:string;
    mercadory:number
}
export default function ControlledAccordions({data,dataMercadory,setReload,reloadDate,setloadDates}:ArrayProps) {
    const[loadMercadory,setloadMercadory] = React.useState<boolean>(true);
    const[editFull,setEditFull]  = React.useState<boolean>(true);
    const[modal,setModal] = React.useState<boolean>(false);
    const [expanded, setExpanded] = React.useState('');
    const [mercadory,setMercadory] = React.useState([])
    const[datesProvider,setDatasProvider] = React.useState<datesProps>({id:0,provider:'',image:''})
    const[loaderDataProviderEdit,setLoaderDataProviderEdit] = React.useState<boolean>(true);

    const[ModalDel,setModalDel]  = React.useState(false); 
    const[ModalEditProvider,setModalEditProvider]  = React.useState(false); 
    const[ModalDelProvider,setModalDelProvider]  = React.useState(false);
    const[ModalEditMercadory,setModalEditMercadory]  = React.useState(false);


    
    const toggleEditMercadory = () => setModalEditMercadory(!ModalEditMercadory)
    const toggleDelProvider = () => setModalDelProvider(!ModalDelProvider)
    const toggleDel = () => setModalDel(!ModalDel)
    const toggle = () => setModal(!modal);

    const[mercadorySelect,setMercadorySelect] = React.useState<TableMercadoriaProps>();
    const[providerSelectDel,setProviderSelectDel] = React.useState<SelectProviderProps>({id:'',mercadory:0});
    const[providerSelect,setProviderSelect] = React.useState<ProviderProps>();

    const toggleEditProvider = () => setModalEditProvider(!ModalEditProvider)

    const finderMercarys =  (item) => {
        const data = []
        item.mercadory.forEach(element => {
            data.push(dataMercadory.find((item) => item.id === element))
        });

        return data.length < 1? [] : data 
    }
    const handleChange =  (panel,item) => async (event,isExpanded) => {
        setloadMercadory(false)
        setExpanded(isExpanded ? panel : false);
        const filtered =  await finderMercarys(item)
        setMercadory(filtered == undefined? [] : filtered)
        setTimeout(() =>  setloadMercadory(true),500)
       
      };
      

  return(
    <div>
        {data.map((item) =>(
            <Accordion key={item.id} expanded={expanded === item.id.toString()} onChange={handleChange(item.id.toString(),item)}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                >
                <Card key={item.id} className='provider'>
                            <CardInfo>
                                <CardBoxProvedor>
                                    <img src={item.image} alt="" />
                                    <h3>{item.name}</h3>
                                  
                                    <Box>
                                        <h3>email</h3>
                                        <h4>{item.email}</h4>
                                    </Box>
                                    <Box>
                                        <h3>telephone</h3>
                                        <h4>{item.phone}</h4>
                                    </Box>
                                   
                                    <Box>
                                        <ButtonAdd onClick={() => {
                                             setDatasProvider({
                                                id:item.id,
                                                provider:item.name,
                                                image:item.image
                                            })
                                            setModal(!modal)
                                            
                                        }}>
                                            <GrAddCircle size={25} />
                                        </ButtonAdd>
                                    </Box>
                                    <Box>
                                        <ButtonAdd onClick={() => {
                                             setProviderSelect(item)
                                             setLoaderDataProviderEdit(!loaderDataProviderEdit)
                                             item.mercadory.length > 0? setEditFull(false) : setEditFull(true) 
                                            setModalEditProvider(!ModalEditProvider)
                                           
                                           
                                            
                                        }}>
                                            <AiFillEdit size={25} />
                                        </ButtonAdd>

                                    </Box>
                                    <Box>
                                        <ButtonAdd onClick={() => {
                                            setProviderSelectDel({id:item.id.toString(),mercadory:item.mercadory.length})
                                            setModalDelProvider(!ModalDelProvider)
                                        }}>
                                            <AiFillDelete size={25} />
                                        </ButtonAdd>

                                    </Box>
                                </CardBoxProvedor>
                                
                            </CardInfo>
                        </Card>
                </AccordionSummary>
                <AccordionDetails>                
                    <ContainerMercadory>
                        {loadMercadory? 
                        mercadory.map((i) => (                       
                                <BoxMercadory key={i.id} className='BoxMercadory'>                                 
                                        <CardMercadoyrOff 
                                            item={i} 
                                            seeProvider={false} 
                                            setReload={setReload} 
                                            setloadDates={setloadDates} 
                                            reloadDate={reloadDate}
                                            setMercadorySelect={setMercadorySelect}
                                            toggle={toggleDel}
                                            modalEditToggle={toggleEditMercadory}
                                            setEditFull={setEditFull}
                                        /> 
                                        
                                </BoxMercadory>                           
                        )) : <h3>carregando...</h3>}
                    </ContainerMercadory>
                </AccordionDetails>
            </Accordion>
            
        ))}
        <ModalAddMercadory 
            modal={modal} 
            idProvider={datesProvider.id} 
            provider={datesProvider.provider} 
            image={datesProvider.image} 
            toggler={toggle} 
            setReload={setReload} 
            reloadDate={reloadDate}  />
        <ModalsAddProvider
            data={providerSelect}
            loaderDate={loaderDataProviderEdit}
            modal={ModalEditProvider}
            toggler={toggleEditProvider}
            edit={true}
            editFull={editFull}
            modalProvider={true}
            onSubmit={function handlerCreateMercadory(event){
                event.preventDefault();
                const dadosForm = new FormData(event.target)
                const mercadoryItem = {
                    idProvider:providerSelect.id,
                    name:dadosForm.get('name'),
                    email:dadosForm.get('email'),
                    phone:dadosForm.get('phone'),
                    image:dadosForm.get('image'),
                    update:true,
                    edit:true
                }
                setloadDates(false)
                fetch('/api/providers',{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json',
                    },
                    body: JSON.stringify(mercadoryItem)
                }).then(async(response) => {
                    setReload(!reloadDate)
                    
                }).catch((err) => alert('Erro ao Adicionar Fornecedor'))
            }}
        />
        <ModalDelete 
                title="tem certeza que deseja deletar esta Mercadoria?"
                info="não é possivel deletar mercadorias com clientes,retire as compras desta mercadoria do perfil dos clientes que a compraram "       
                modal={ModalDel} 
                toggler={toggleDel} 
                OnSubmit={function handlerCreateMercadory(event){
                        event.preventDefault();
                        if(FindeClients(mercadorySelect)){
                            setloadDates(false)
                            toggleDel()

                            const mercadoryItem = {
                                idProvider:mercadorySelect.idprovider,
                                idMercadory:mercadorySelect.id,
                            }
                            fetch('/api/offAndDeleteMercadory',{
                                method:'POST',
                                headers:{
                                    'Content-Type':'application/json',
                                },
                                body: JSON.stringify(mercadoryItem)
                            }).then(async(response) => {
                                setReload(!reloadDate)
                            }).catch((err) => alert('Erro ao Deletar Mercadoria'))
                        }
                        
                    }}/> 
        <ModalDelete 
            title="tem certeza que deseja deletar este fornecedor?"
            info="não é possivel deletar fornecedores com mercadorias,delete as mercadorias desde fornecedor primeiro "       
            modal={ModalDelProvider} 
            toggler={toggleDelProvider} 
            OnSubmit={function handlerCreateMercadory(event){
                    event.preventDefault();
                    if(providerSelectDel.mercadory < 1){
                        setloadDates(false)
                        toggleDel()
                        fetch('/api/providers',{
                            method:'POST',
                            headers:{
                                'Content-Type':'application/json',
                            },
                            body: JSON.stringify({idProvider:providerSelectDel.id,update:true,edit:false})
                        }).then(async(response) => {
                            setReload(!reloadDate)
                        }).catch((err) => alert('Erro ao Deletar Fornecedor'))
                    }
                    
                }}/> 
        <ModalEditMercadoryComponent
             modal={ModalEditMercadory} 
             data={mercadorySelect} 
             toggler={toggleEditMercadory} 
             setReload={setReload} 
             reload={reloadDate} 
             setloadDates={setloadDates}
             editfull={editFull}           
        />
    </div>
  )
}