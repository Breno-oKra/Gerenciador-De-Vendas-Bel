import React from 'react'
import {SelectComponent} from '../components/FormComponent/FormMercadoryCalc/style'
export function  FinderClientsPendets(items,data){
    let datas = []
    items.client.map((item) => {
        let clients = data.find((i) => i.id === item)
        datas.push(clients)
        
    })
    return datas
}
export function CalcVendido(items,data){
    let dataCalc = 0

    FinderClientsPendets(items,data).map((item) => {
        item.historicBuys.map((i) => {
            if(i.fornecedor === items.provider){
                dataCalc = dataCalc + 1
            }
        })
    })
    return dataCalc
}
export function CalcWinsNow(items,data){
        
    let dataCalc = 0

    FinderClientsPendets(items,data).map((item) => {
        item.historicBuys.map((i) => {
            if(i.fornecedor === items.provider){
                dataCalc = dataCalc + i.totalItem
            }
        })
    })
    return dataCalc
}
export function CalcProfit(qtdItems,ValueInvested,ValueItems){
    let total = Number(qtdItems)*Number(ValueItems)
    return{
        totalBuy:total,
        totalProfit:total-Number(ValueInvested)
    }
}
export function calclPendents(data){
    let total = 0
    data.forEach((item) => {
        total = total + parseInt(item.valueTotal)
    })
    return total
  }
  
export function calclPendentsMounth(date,data){
    let finder = data.filter(item =>  new Date(item.pay).getMonth() === date)

    return finder.length == 0? 0 : calclPendents(finder)
}

export function QtdItemCalc(props) {
    let datas = []
    for(let i = 1; i <= props.qtdStock;i++){
        datas.push(i)
    }
    return(
        <SelectComponent name="buy" id="3" value={props.value} onChange={(e) => {props.setVal(e.target.value)}}>
        {
            datas.map((item) => (
                <option key={item} value={item}>{item}</option>
            )
        )}
        </SelectComponent>
        )
            
}
export function color_client(){

    let r = Math.floor(Math.random() * 255);

    let g =  Math.floor(Math.random() * 255);

    let b =  Math.floor(Math.random() * 255);

    return rgbToHex(r,g,b)

 }
export function CalcValueItmesPay(val,qtd){
    return  val*qtd   
  }
  
export let calcNameAnsLastName = (name) => {
    let division = name.split(' ')
    let firtName = division[0]
    let quant =  division.length
    if(quant > 1){
      return `${firtName[0].toUpperCase()+firtName.slice(1)} ${division[quant-1][0].toUpperCase()}`
    }
    return firtName
  }


function componentToHex(c) {
var hex = c.toString(16);
return hex.length == 1 ? "0" + hex : hex;
}

export function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
export function FindePendents(data){
    let finder = data.historicbuy.length < 1
    return finder
}

export function FindeClients(data){
    let finder = data.client.length < 1
    return finder
}
