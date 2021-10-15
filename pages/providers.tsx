import React from 'react'
import Providers from '../src/pages/providers'
import styled from 'styled-components'
import Header from '../src/components/Header';
import { TableMercadoriaProps } from './mercadoryOff';
import { ButtonAdd } from '../src/components/Header/Header.styles';
import { AiOutlinePlusSquare } from "react-icons/ai";
import LoagindPageIn from '../src/components/LoadPage/loadingPage';
import ModalsAddProvider from '../src/components/modal/modalProvider'
import nookies from 'nookies'
import jwt from 'jsonwebtoken'
import DrawerSection from '../src/components/sectonbar/DrawerSection';
import SectionOn from '../src/components/sectonbar/SectionOn'
import {useRouter} from 'next/router'
export const ContainerPages = styled.div`
  width: 100%;
  min-height:100vh;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.backgrounds.main};
  overflow-y: scroll;
    overflow-x: hidden;
    align-items: center; 
    
`
export type ProviderProps = {
    id:number;
    name:string,
    email:string,
    phone:number,
    mercadory:number[],
    rating:number,
    image:string

}
export default function Provider(props){
    const[loadDates,setLoadDate] = React.useState<boolean>(false)
    const[data,setData] = React.useState<ProviderProps[]>([])
    const[dataMercadory,setDataMercadory] = React.useState<TableMercadoriaProps[]>([])
    const[searchVal,setSearchVal] = React.useState<ProviderProps[]>([])
    const[reload,setReload] = React.useState<boolean>(false)
    const[modal,setModal] = React.useState<boolean>(false)
    const[loginValide,setLoginValide] = React.useState<boolean>(false)
    const[modalProvider,setModalProvider] = React.useState<boolean>(true)
    const toggler = () => setModal(!modal)
    const Router = useRouter()
    
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
                method: 'POST',
                headers: {
                    'Authorization':props.envs.REDONLY,
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
                setDataMercadory(res.data.allMercadories)                
            }).catch((err) => '')
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
                    allProviders{
                        id
                        name
                        email
                        phone
                        mercadory
                        rating
                        image
                       
                    }
                    
                  }
                  `,
            })
        }).then((response) => response.json()
        ).then((res) => {
            setSearchVal(res.data.allProviders)
            setData(res.data.allProviders) 
            setLoadDate(true)              
        }).catch((err) => alert('erro'))
        
    },[reload])
    return (
        <>
         <SectionOn page={'providers'}/>
        <DrawerSection /> 
        <ContainerPages>
            <Header page='/' dataBd={data} setSearch={setSearchVal} NameHeader={'Vendas'} NamedTotal={'Items'} qtdTotal={data.length} >
                <ButtonAdd onClick={() => {
                    setModal(!modal)
                }}><AiOutlinePlusSquare size={30}/></ButtonAdd>
            </Header>
            {
                loginValide? (
                    <>
                        {
                            loadDates?( 

                                <Providers data={searchVal} reloadDate={reload} setReload={setReload} setloadDates={setLoadDate} dataMercadory={dataMercadory}/> 
                                
                                ):<LoagindPageIn/>
                        }
                        <ModalsAddProvider modal={modal} toggler={toggler} edit={true} editFull={true} modalProvider={modalProvider}
                            onSubmit={function handlerCreateMercadory(event){
                                event.preventDefault();
                                setModalProvider(false)
                                const dadosForm = new FormData(event.target)
                                const mercadoryItem = {
                                    name:dadosForm.get('name'),
                                    email:dadosForm.get('email'),
                                    phone:dadosForm.get('phone'),
                                    image:dadosForm.get('image'),
                                }
                                fetch('/api/providers',{
                                    method:'POST',
                                    headers:{
                                        'Content-Type':'application/json',
                                    },
                                    body: JSON.stringify(mercadoryItem)
                                }).then(async(response) => {
                                    setReload(!reload)
                                    setModalProvider(true)
                                }).catch((err) => alert('Erro ao Adicionar Fornecedor'))
                            }}/>
                    </>
                ):
                <></>
            }
            
        </ContainerPages>
        </>)
}
export async function getServerSideProps(context) {
    const cookies = nookies.get(context).USERBEL
    const res = jwt.decode(cookies) 
    return {
        props: {
            res:((res == undefined) || (res == null ))? true : false,
            envs:{
                REDONLY:process.env.API_TOKEN_REDONLY
            }

        }, // will be passed to the page component as props
    }
} 