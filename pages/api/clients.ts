import {SiteClient} from 'datocms-client'
import { color_client } from '../../src/Utils/cals';
const TOKEN = process.env.API_TOKEN_FULL;
const client = new SiteClient(TOKEN);

export default async  function recebedorDeRequest(request,response){
    if(request.method === 'POST'){
        const parseri = JSON.stringify([])
        let DateNow = new Date()
        const register = await client.items.create({
            itemType:"1097668",
            name:request.body.name,
            datesubescrive:`${DateNow.getMonth() + 1}/${DateNow.getDate()}/${DateNow.getFullYear()} `,
            paypendent:0,
            colorident:color_client(),
            historicbuy:parseri,
        })
        response.json({
            registrao:register
        })
        return;
    }
    response.status(404).json({
        message:'Não Encontrado'
    })
}