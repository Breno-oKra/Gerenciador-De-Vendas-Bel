import React from 'react'
import {TableMercadoriaProps} from '../../pages/mercadoryOff'
import {Container} from '../styles/pages/mercadoryOff'
import CardMercadoyrOff from '../components/mercadoryOff';
import { PagesAlign } from '../../pages/home';

interface mercadoryProps {
    data:TableMercadoriaProps[]
    setloadDates:any;
    setReload:any;
    reloadDate:boolean
}
const MercadoryOff= ({data,setReload,setloadDates,reloadDate}:mercadoryProps) => {
    return(
        <PagesAlign>
            <Container>
                {data.map((item) =>(
                        <CardMercadoyrOff item={item} seeProvider={true} setReload={setReload} setloadDates={setloadDates} reloadDate={reloadDate}/>                        
                    ))}
                    {data.length == 0? <h3>Nenhuma Mercadoria Fechada</h3> : <></>}
            </Container>
                
        </PagesAlign>
    )
       /*  <ContainerPages>
            <Header page="mercadoryOff" onClick={search} setSearch={setValueSearch} NameHeader={'Vendas fechadas'} NamedTotal={'Items'} qtdTotal={0} >
                    <Link href='/AddMercadory'>
                    <ButtonAdd ><AiOutlinePlusSquare size={30}/></ButtonAdd>
                    </Link>    
            </Header>
            <Container>
                <Skeleton variant="rect" width={300} height={300} />
                <Skeleton variant="rect" width={300} height={300} />
                <Skeleton variant="rect" width={300} height={300} />
            </Container>
            
        </ContainerPages> */
}
export default MercadoryOff