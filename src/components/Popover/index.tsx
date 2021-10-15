import React,{useState} from 'react'
import { UncontrolledPopover,PopoverBody } from 'reactstrap'
import styled from 'styled-components'
import {RiErrorWarningFill} from 'react-icons/ri'
const Buttons = styled.button`
    width: 100%;
    height: 30px;
    border:none;
    background-color: #fff;
    &:hover{
        background-color: #ececec;
    }
`


function PopoverClient({ scheduleUpdate }){
    const [isOpen, setIsOpen] = useState(false);
    return(
            <>
    
                <PopoverBody>
                    <p>Há Pagamentos Pendentes</p>
                </PopoverBody>
            </>
        )
}
export default function PopoverWarn(){
    const [isOpen, setIsOpen] = useState(false);
    return(
            <>
    
        <Buttons id="ScheduleUpdateButton" type="button">
            <RiErrorWarningFill color={'#f70606'} size={20}/>
        </Buttons>
        <UncontrolledPopover trigger="focus" placement="top" target="ScheduleUpdateButton">
            {({ scheduleUpdate }) => (
            <PopoverClient scheduleUpdate={scheduleUpdate} />
            )}
        </UncontrolledPopover>
            </>
        )
}
