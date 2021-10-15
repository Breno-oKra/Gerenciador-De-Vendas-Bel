import { SiteClient } from 'datocms-client';
const TOKEN = process.env.API_TOKEN_FULL;
const client = new SiteClient(TOKEN);
export default async  function recebedorDeRequest(request,response){
  let respo = false
  await client.items.find("59920512", {
  }).then((res) => {
    res.name == request.body.name && res.password == request.body.password? respo = res.token : respo = false
  }).catch((err) => err)
  response.json({
    res:respo
  })

}
  