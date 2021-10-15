
import Link from 'next/link'
import {MdAttachMoney,MdPerson,MdGroup} from 'react-icons/md'
import {BiUser,BiAnalyse} from 'react-icons/bi'
import {BsFillLockFill} from 'react-icons/bs'
import React from 'react';
import { Avatar } from '@material-ui/core';
import { destroyCookie } from 'nookies'
import {HiOutlineLogin} from 'react-icons/hi'
import {SectionComponent,Boxs,BoxAlign,BoxUser,AlignInfo} from '../../styles/pages/sectonBar.style'
import {useRouter} from 'next/router'
interface SectionProps{
    page?:string;
}

export default function Section({page}:SectionProps){
    const Router = useRouter()
    return(
     <SectionComponent>
                <BoxUser>
                    <Avatar className='avatar' >
                        <BiUser size={80}/>
                    </Avatar>
                    <AlignInfo>
                        <h4>Maria Izabel</h4>
                        <button title='sair' onClick={() => {
                            destroyCookie(null, 'USERBEL')
                            Router.push("/")
                        }}><HiOutlineLogin size={30} color={"#f5f6fa"}/></button>
                    </AlignInfo>            
                </BoxUser>
                <div className="alginPages">
                <Boxs>
                    <Link href='/home'>         
                        <BoxAlign className={page == 'home'? 'active': ''}>
                            <MdAttachMoney size={40} color={page == 'home'? '#f55d21': '#f5f6fa'}/>
                            <h4 >Vendas</h4>
                        </BoxAlign>
                    </Link>
                </Boxs>
                <Boxs>
                    
                    <Link href='/pag'>
                        <BoxAlign className={page == 'clients'? 'active': ''}>
                            <MdPerson size={40} color={page == 'clients'? '#f55d21': '#f5f6fa'}/>
                            <h4>Clientes</h4>
                           
                        </BoxAlign>
                    </Link>
                   
                </Boxs>
                <Boxs>
                    <Link href='/simulation'>
                        <BoxAlign className={page == 'simulation'? 'active': ''}>
                            <BiAnalyse size={40} color={page == 'simulation'? '#f55d21': '#f5f6fa'}/>
                            <h4 >Simulação</h4>
                        </BoxAlign>         
                    </Link>
                </Boxs>
                <Boxs>
                    <Link href='/mercadoryOff'>
                        <BoxAlign  className={page == 'mercadoryOff'? 'active': ''}>
                            <BsFillLockFill size={40} color={page == 'mercadoryOff'? '#f55d21': '#f5f6fa'}/>
                            <h4 >Mercadorias Fechadas</h4>
                        </BoxAlign>       
                    </Link>
                </Boxs>
                <Boxs>
                    <Link href='/providers'>
                        <BoxAlign className={page == 'providers'? 'active': ''}>
                            <MdGroup size={40} color={page == 'providers'? '#f55d21': '#f5f6fa'}/>
                            <h4 >Fornecedores</h4>
                        </BoxAlign>      
                    </Link>
                </Boxs>
            </div>
    </SectionComponent>

  );
    
} 