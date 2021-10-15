import React from 'react'
import styled from 'styled-components'
import Inithial from '../src/pages/Inithial'
import {TableMercadoriaProps} from './mercadoryOff'
import Header from '../src/components/Header';
import LoagindPageIn from '../src/components/LoadPage/loadingPage';
import ModalOfDayPay from '../src/components/modal/modalDayofPay'
import SectionOn from '../src/components/sectonbar/SectionOn'
import nookies from 'nookies'
import jwt from 'jsonwebtoken'
import DrawerSection from '../src/components/sectonbar/DrawerSection';
import {useRouter} from 'next/router'
export const ContainerPages = styled.div`
  width: 100%;
  min-height:100vh;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.backgrounds.main};
  overflow-y: hidden;
    
`
export const PagesAlign = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: center; 
`
export default function Home(props){
    const[loadDates,setLoadDate] = React.useState<boolean>(false)
    const[data,setData] = React.useState<TableMercadoriaProps[]>([])
    const[searchVal,setSearchVal] = React.useState<TableMercadoriaProps[]>([])
    const[reload,setReload] = React.useState<boolean>(false)
    const[modal,setModal] = React.useState<boolean>(false)
    const[loginValide,setLoginValide] = React.useState<boolean>(false)
    const Router = useRouter()
    const toggler = () => setModal(!modal)
    const[dataCliPendents,setDataCliPendents]  = React.useState([])
    const ClaclMercadoryOff = (data) => {
        const filtered = data.filter(item => item.closed == false)
        setSearchVal(filtered)
        setData(filtered)
        setLoadDate(true)
    }
    
    React.useEffect(() => {
        if(props.res){
            Router.push("/")
            return
        }
        setLoginValide(true)
    },[props])
    React.useEffect(() => {
        setLoadDate(false)
        fetch('https://graphql.datocms.com/',{
            method:'POST',
            headers:{
                'Authorization':props.envs.REDONLY,
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
            let data = []

            await res.data.allClients.map((item) => {
                let dateNow = new Date()
                
                item.historicbuy.map((i) => {
                    let dataPay = new Date(i.pay)
                    if(dataPay.getDate() <= dateNow.getDate() && dataPay.getMonth() <= dateNow.getMonth() && dataPay.getFullYear() <= dateNow.getFullYear() ){
                        data.push({...i,colorCli:item.colorident,nameCli:item.name,idCli:item.id} )
                        
                    }
                })
               
            })
            data.length > 0? setModal(true) : setModal(false)
            setDataCliPendents(data)
            
        }).catch((err) => console.log('erro'))
       
    },[reload])
    React.useEffect(() => {
        fetch('https://graphql.datocms.com/',{
            method: 'POST',
            headers: {
                'Authorization': props.envs.REDONLY,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                
            },
            body:JSON.stringify({"query":
                `query{
                    allMercadories {
                      id
                      idprovider
                      name
                      image
                      invested,
                      provider
                      qtdstock
                      valueitem
                      sold
                      wins
                      profit
                      client
                      closed 
                    }
                    
                  }
                  `,
            })
        }).then((response) => response.json()
        ).then((res) => {
            ClaclMercadoryOff(res.data.allMercadories)                
        }).catch((err) => '')
    },[reload])
    return (
    <>
        <SectionOn page={'home'}/>
        <DrawerSection />
        <ContainerPages>
                {loginValide? (
                    <>
                     <Header page='/' dataBd={data} setSearch={setSearchVal} NameHeader={'Vendas'} NamedTotal={'Items'} qtdTotal={data.length} >
                     </Header>
                     {
                         loadDates?(   
                             <>                   
                                 <Inithial data={searchVal} reloadDate={reload} setReload={setReload} setloadDates={setLoadDate}/> 
                                 <ModalOfDayPay modal={modal} toggler={toggler} data={dataCliPendents} reloadDate={reload} setReload={setReload} />
                             </>
                     ):(<LoagindPageIn/> )
     
                    }
                    </>
                ) : <></>
                }
               
        </ContainerPages>
    </>)
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
  