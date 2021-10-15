import React from 'react'
import Clients from '../src/pages/Clients'
import { ContainerPages } from './home';
import Header from '../src/components/Header';
import { ButtonAdd } from '../src/components/Header/Header.styles';
import { AiOutlinePlusSquare } from "react-icons/ai";
import ModalsAddClient from '../src/components/modal/modalAssClient'
import LoagindPageIn from '../src/components/LoadPage/loadingPage';
import nookies from 'nookies'
import jwt from 'jsonwebtoken'
import DrawerSection from '../src/components/sectonbar/DrawerSection';
import SectionOn from '../src/components/sectonbar/SectionOn'
import {useRouter} from 'next/router'
export type HistoricBuys = {
    id:number;
    idMercadory:string;
    item:string;
    fornecedor?:string;
    valueItem:number;
    valueTotal:number;
    qtd:number;
    pay:any;
    dayOfBuy:string;
}
export type ClientsProps = {
    id:number;
    name:string
    datesubescrive:string
    paypendent:number;
    colorident:string;
    historicbuy: HistoricBuys[]
}
export default function Pag(props){
    const[loadDates,setLoadDate] = React.useState<boolean>(false)
    const[data,setData] = React.useState<ClientsProps[]>([])
    const[reload,setReload] = React.useState<boolean>(false)
    const[reloadBuys,setReloadBuys] = React.useState<boolean>(false)
    const [Pendents, setPensents] = React.useState([]);
    const[dataSearch,setDataSearch] = React.useState<ClientsProps[]>([])
    const [modal, setModal] = React.useState(false);
    const[loginValide,setLoginValide] = React.useState<boolean>(false)
    const toggle = () => setModal(!modal);
    const Router = useRouter()
    
    
    React.useEffect(() => {
        if(props.res){
            Router.push("/")
            return
        }
        setLoginValide(true)
    },[props])
    React.useEffect(() => {
        fetch('https://graphql.datocms.com/',{
            method:'POST',
            headers:{
                'Authorization': `${props.envs.REDONLY}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body:JSON.stringify({"query":`
                query{
                        allClients {
                        id
                        name
                        datesubescrive
                        paypendent
                        colorident
                        historicbuy
                    }
                    
                }
            `
            })
        }).then((response) => response.json()
        ).then(async (res) => {
            let data = res.data.allClients
            let finderPendenst = []
            await data.map((item) => {
                    item.historicbuy.map((i) => {

                        if(i.pay !== 'efetivado'){
                            finderPendenst.push({...i,color:item.colorident} )
                            
                        }
                    })
               
            })
            setPensents(finderPendenst)
            setDataSearch(data)
            setData(data)
            setLoadDate(true)
            setReloadBuys(!reloadBuys)
        }).catch((err) => console.log('erro'))
       
    },[reload])

        return(
            <>
                <SectionOn page={'clients'}/>
                <DrawerSection />
                <ContainerPages>  
                    <Header page="pag" dataBd={data} setSearch={setDataSearch} NameHeader={'Clientes'} NamedTotal={'Items'} qtdTotal={data.length}>
                            <ButtonAdd onClick={() => {
                                toggle()                          
                            }} ><AiOutlinePlusSquare size={30}/></ButtonAdd>
                    </Header>
                    {
                        loginValide? (
                            <>
                                {
                                    loadDates?(
                                        <>
                                        
                                            <ModalsAddClient reload={reload} modal={modal} toggler={toggle} setReload={setReload} setLoadDate={setLoadDate} />
                                            <Clients data={dataSearch} pendents={Pendents} reload={reload}  setReload={setReload} setloadDates={setLoadDate} loadDates={reloadBuys}/>
                                        </>
                                    )
                                    :(<LoagindPageIn/>)
                                }
                            </>
                        ):
                        <></>
                    }
                   
                </ContainerPages>
            </>
        )

    
}
export async function getServerSideProps(context) {
    const cookies = nookies.get(context).USERBEL
    const res = jwt.decode(cookies) 
    return {
        props: {
            res: ((res == undefined) || (res == null ))? true : false,
            envs:{
                REDONLY:process.env.API_TOKEN_REDONLY
            }
        }, // will be passed to the page component as props
      }
  } 