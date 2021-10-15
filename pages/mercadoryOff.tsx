import React from 'react'
import MercadoryOff from '../src/pages/mercadoryOff'
import { ContainerPages } from './home';
import Header from '../src/components/Header';
import { ButtonAdd } from '../src/components/Header/Header.styles';

import Link from 'next/link'
import { AiOutlinePlusSquare } from "react-icons/ai";
import LoagindPageIn from '../src/components/LoadPage/loadingPage';
import nookies from 'nookies'
import jwt from 'jsonwebtoken'
import DrawerSection from '../src/components/sectonbar/DrawerSection';
import SectionOn from '../src/components/sectonbar/SectionOn'
import {useRouter} from 'next/router'
export type TableMercadoriaProps = {
    id:number;
    idprovider:string;
    name:string;
    invested:number;
    image:string;
    provider:string;
    qtdstock:number;
    valueitem:number
    sold:number;
    wins:number;
    profit:number;
    client:number[];
    closed:boolean

}
export default function Home(props){
    const[loadDates,setLoadDate] = React.useState<boolean>(false)
    const[reload,setReload] = React.useState<boolean>(false)
    const[data,setData] = React.useState<TableMercadoriaProps[]>([])
    const[dataBase,setDataBase] = React.useState<TableMercadoriaProps[]>([])
    const[loginValide,setLoginValide] = React.useState<boolean>(false)
    const Router = useRouter()
    
    React.useEffect(() => {
        if(props.res){
            Router.push("/")
            return
        }
        setLoginValide(true)
    },[props])
    const ClaclMercadoryOff = (data) => {
        const filtered = data.filter(item => item.closed == true)
        setDataBase(filtered)
        setData(filtered)
        setLoadDate(true)
    }
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

            
        }).catch((err) => {})
    },[reload])
    return (
        <>
            <SectionOn page={'mercadoryOff'}/>
            <DrawerSection />
            <ContainerPages>
                <Header page="mercadoryOff" dataBd={data} setSearch={setDataBase} NameHeader={'Vendas'} NamedTotal={'Items'} qtdTotal={data.length}>
                    <Link href='/mercadoryOff'>
                        <ButtonAdd ><AiOutlinePlusSquare size={30}/></ButtonAdd>
                    </Link> 
                </Header>
                {loginValide? (
                    <>
                        {
                            loadDates?(  
                                    <MercadoryOff data={dataBase} setloadDates={setLoadDate} reloadDate={reload} setReload={setReload} />)
                            : <LoagindPageIn/>
                        }
                    </>
                ):<></>}
               
            
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