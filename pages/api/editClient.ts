import {SiteClient} from 'datocms-client'
const TOKEN = process.env.API_TOKEN_FULL;
const client = new SiteClient(TOKEN);

export default async  function recebedorDeRequest(request,response){
    
    if(request.method === 'POST'){
        const upgrade = await client.items
        .update(request.body.idClient, {
            name:request.body.name,
            colorident:request.body.color
        })
        
        response.json({
            registrao:upgrade,
        })
        return;
    }
    response.status(404).json({
        message:'Não Encontrado'
    })
}