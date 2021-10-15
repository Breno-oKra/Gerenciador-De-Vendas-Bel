import React from 'react'
import {ContainerProvider} from '../styles/pages/mercadoryOff'
import ControlledAccordions from '../components/AcordeonProvider';
import { TableMercadoriaProps } from '../../pages/mercadoryOff';
import { PagesAlign } from '../../pages/home';
export type ProviderProps = {
    id:number;
    name:string,
    email:string,
    phone:number,
    mercadory:number[],
    rating:number,
    image:string

}
type ArrayProps = {
    data: ProviderProps[]
    reloadDate:boolean;
    setReload:any;
    dataMercadory:TableMercadoriaProps[]
    setloadDates:any;

}
const Providers:React.FC<ArrayProps> = ({data,reloadDate,setReload,setloadDates,dataMercadory}) => {

    
    return(
        <PagesAlign>
            <ContainerProvider>
                <ControlledAccordions data={data} dataMercadory={dataMercadory} setReload={setReload} setloadDates={setloadDates} reloadDate={reloadDate} />

            </ContainerProvider>           
        </PagesAlign>
    )
}
export default Providers