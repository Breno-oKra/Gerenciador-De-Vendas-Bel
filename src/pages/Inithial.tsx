import React from 'react'
import TableMercadorias from '../components/campTabelMercadorias'
import { PagesAlign } from '../../pages/home';
import {TableMercadoriaProps} from '../../pages/mercadoryOff'
import BackgroundMercaory from '../assets/noneMercadory'
interface InhitialProps{
    data:TableMercadoriaProps[];
    reloadDate: boolean;
    setReload:any;
    setloadDates:any;

}

const Inithial= ({data,reloadDate,setReload,setloadDates}:InhitialProps) => {
    return(       
        <PagesAlign>
            {data.length === 0? <BackgroundMercaory/>: <TableMercadorias data={data} reloadDate={reloadDate} setReload={setReload} setloadDates={setloadDates} />}
                
        </PagesAlign>
    )
}
export default Inithial