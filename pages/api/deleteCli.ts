import {SiteClient} from 'datocms-client'
const TOKEN = process.env.API_TOKEN_FULL;
const client = new SiteClient(TOKEN);

export default async  function recebedorDeRequest(request,response){
    
    if(request.method === 'POST'){
        const upgrade = await client.items
        .destroy(request.body.idClient, {
           
        }).then((item) => {
            
        }).catch((err) => err )
        
        response.json({
            registrao:upgrade,
        })
        return;
    }
    response.status(404).json({
        message:'Não Encontrado'
    })
}