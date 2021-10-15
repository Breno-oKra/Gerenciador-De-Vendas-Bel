import {SiteClient} from 'datocms-client'
const TOKEN = process.env.API_TOKEN_FULL;
const client = new SiteClient(TOKEN);
export default async  function recebedorDeRequest(request,response){
    if(request.method === 'POST'){
       
        const parseri = JSON.stringify([])
        if(request.body.update){
            if(request.body.edit){
                let upgradeMercadory = []
                if(request.body.name !== undefined){
                    upgradeMercadory = await client.items.update(request.body.idProvider, {
                        name:request.body.name,
                        image:request.body.image,
                        email:request.body.email,
                        phone:parseInt(request.body.phone),
                        
                    })
                    response.json({
                        registrado:upgradeMercadory
                    })
                    return;
                }
                upgradeMercadory = await client.items.update(request.body.idProvider, {
                    email:request.body.email,
                    phone:parseInt(request.body.phone),
                    
                })
                response.json({
                    registrado:upgradeMercadory
                })
                return;
            }
            const deleProvider = await client.items.destroy(request.body.idProvider, {
             }).then((res) => res).catch((err) => err)
            response.json({
                dados:'Algum dado qualquer',
                registrao:deleProvider,
            })
            return
        }
        const register = await client.items.create({
            itemType:"1103103",
            name: request.body.name,
            email: request.body.email,
            phone: parseInt(request.body.phone),
            mercadory:parseri,
            rating: 0,
            image: request.body.image,
        })
        response.json({
            dados:'Algum dado qualquer',
            registrao:register,

        })
        return;
    }
    response.status(404).json({
        message:'Não Encontrado'
    })
}