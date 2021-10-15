import React from 'react';
import Section from './index'
import {SectioComponent} from '../../styles/pages/sectonBar.style'

interface SectionProps{
    page:string
}
export default function SectionOn({page}:SectionProps){
    return(
        <SectioComponent>
            <Section page={page}/>
        </SectioComponent>
  );
    
} 