import {SiteClient} from 'datocms-client'
const TOKEN = process.env.API_TOKEN_FULL;
const client = new SiteClient(TOKEN);
import { recontructorItemProps,reconstructoItemClientProps } from '../../src/interfaces/buyMercadory';

export default async  function recebedorDeRequest(request,response){
    
    if(request.method === 'POST'){
        let DataClients = []
        let recontructorItem: recontructorItemProps
        let payPendets = 0
        await client.items.find(request.body.idMercadory, {
        }).then((res) =>{
            const convert = JSON.parse(res.client)
            const verifi = convert.length < 1
            recontructorItem = {
                qtdstock:res.qtdstock,
                sold:res.sold,
                wins:res.wins,
                profit:res.profit,
            }
            const verifiClientExistent = convert.find((item) => item == request.body.idClient)
            verifi? DataClients = [request.body.idClient] : verifiClientExistent != undefined? DataClients = [...convert] : DataClients = [...convert,request.body.idClient]
            

        })
        let DateNow = new Date()
        let idRando =  parseInt(request.body.idMercadory)+parseInt(request.body.qtd) + Math.floor(Math.random()*10000) + Math.floor(Math.random()*10000)
        const register = {
            id:idRando,
            idMercadory:request.body.idMercadory,
            item: request.body.item,
            fornecedor: request.body.fornecedor,
            valueItem:parseFloat(request.body.valueItem),
            valueTotal:parseInt(request.body.qtd)*parseFloat(request.body.valueItem),
            qtd: parseInt(request.body.qtd),
            pay:request.body.pay,
            dayOfBuy: `${DateNow.getMonth() + 1}/${DateNow.getDate()}/${DateNow.getFullYear()}`
        }
        const upgradeMercadory = await client.items.update(request.body.idMercadory, {
            qtdstock:recontructorItem.qtdstock - register.qtd,
            sold:recontructorItem.sold + register.qtd,
            wins:recontructorItem.wins + register.valueTotal,
            client:JSON.stringify(DataClients) ,
            closed:recontructorItem.qtdstock - register.qtd <= 0? true : false
        })
        let dataCli = []
        
        
        let reconstructoItemClient: reconstructoItemClientProps;
        let recontructorItemExistent = {}
        await client.items.find(request.body.idClient, {
        }).then((res) =>{
            const convert = JSON.parse(res.historicbuy)
            reconstructoItemClient = {
                paypendent:res.paypendent
            }
            const verifi = convert.length > 0
            if(verifi){
                const verifiClientExistent = convert.find((item) => item.pay == request.body.pay && item.fornecedor == register.fornecedor && item.item == register.item)
                let index = convert.indexOf(verifiClientExistent);
                if(index > -1){
                    convert.splice(index, 1);
                    recontructorItemExistent = {
                        idMercadory:request.body.idMercadory,
                        item:verifiClientExistent.item,
                        fornecedor:verifiClientExistent.fornecedor,
                        valueItem:register.valueItem,
                        valueTotal:verifiClientExistent.valueTotal + register.valueTotal,
                        qtd:verifiClientExistent.qtd + register.qtd,
                        pay:verifiClientExistent.pay,
                        dayOfBuy:verifiClientExistent.dayOfBuy
                    }
                    // pendents = 0 pq ja existia uma pagamento nesta data
                    payPendets = 0
                    dataCli = [...convert,recontructorItemExistent]
                }else{
                    payPendets = register.pay != 'efetivado'? 1 : 0
                    dataCli = [...convert,register]
                }
            }else{
                payPendets = register.pay != 'efetivado'? 1 : 0
                dataCli = [register]
            }
          
        })
        const upgrade = await client.items
        .update(request.body.idClient, {
            paypendent:reconstructoItemClient.paypendent + payPendets,
            historicbuy:JSON.stringify(dataCli) ,
        })
        
        response.json({
            registrao:upgrade,
            registrado:upgradeMercadory
        })
        return;
    }
    response.status(404).json({
        message:'Não Encontrado'
    })
}