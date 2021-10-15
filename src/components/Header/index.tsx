import React from 'react'
import { HeaderStyle,BoxSearch,ButtonAdd} from './Header.styles';

import {AiOutlineSearch,AiOutlineClose} from 'react-icons/ai'

type HeaderProps = {
    NameHeader:string;
    NamedTotal:string;
    qtdTotal:number;
    children:any;
    setSearch:any;
    page:string
    dataBd:any;
}
type CompProps = {
    class:string;
    onClick:any;
    setSearch:any;
    children?:any;
}
function CompSerach(props:CompProps){
    return(
        <BoxSearch className={props.class}>
            <input onChange={(event) => {
                props.setSearch(event.target.value)
            }} type="text" placeholder="pesquisar" />
            <button onClick={props.onClick}>
                <AiOutlineSearch/>
            </button>
            {props.children}
        </BoxSearch>
    )
}
export default function Header(data:HeaderProps){

    const datas = data.dataBd
    const[open,SetOpen] = React.useState(true)
    const[valueSearch,setValueSearch] = React.useState<string>('')
    
    const ShowHide = () => {
        SetOpen(!open)
    }
    const search = () => {
        if(valueSearch == '' || valueSearch == undefined){
            data.setSearch(data.dataBd) 
        }
        if(datas[0].provider === undefined){
            const filtered = datas.filter((item) => item.name.toUpperCase().indexOf(valueSearch.toUpperCase()) !== -1)
            data.setSearch(filtered)
            return
        }
        const filtered = datas.filter((item) => item.name.toUpperCase().indexOf(valueSearch.toUpperCase()) !== -1 || item.provider.toUpperCase().indexOf(valueSearch.toUpperCase()) !== -1)
            data.setSearch(filtered)
    }
    return(
        <HeaderStyle>
            <h3>{data.NameHeader}</h3>
            
            <div className="boxs">
                <h4>Total {data.NamedTotal}</h4>
                <h4>{data.qtdTotal}</h4>
            </div>
            {data.children}
            <CompSerach class='boxSearch' onClick={search} setSearch={setValueSearch}></CompSerach>
            {open?(<></>):(
                <CompSerach class='boxSearchMini' onClick={search} setSearch={setValueSearch}>
                    <ButtonAdd className="buttonONSearch" onClick={ShowHide}>
                        <AiOutlineClose size={25}/>
                    </ButtonAdd>
                </CompSerach>
            )}
            {open?(
                <ButtonAdd className="buttonONSearch" onClick={ShowHide}>
                    <AiOutlineSearch size={25}/>
                </ButtonAdd>
            ):(<></>)}
            
        </HeaderStyle>
    )
}