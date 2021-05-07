// Chamando a entidade de heros
const Hero = require('./entities/hero')

const http = require('http')
const HeroFactory = require('./factories/heroFactory')
const port = 3000
const heroService = HeroFactory.generateInstance()
    //Criando header para que a api retorne sempre JSON
const DEFAULT_HEADER = { 'Content-Type': 'application/json' }

//CRIANDO ROTAS
const routes = {
    //Rota para listar os heroes
    '/heroes:get': async(request, response) => {
        //Verifico se tenho o id na request
        const { id } = request.queryString
            //Listo os heroes passando como parâmetro o id através heroService
        const heroes = await heroService.find(id)
        response.write(JSON.stringify({ results: heroes }))
        response.end()
    },
    /*Rota para criar um hero. Usando async iterator. 
        For await itera dentro de funções assíncronas. 
        Pra cada evento novo cai no for*/
    '/heroes:post': async(request, response) => {
        for await (const data of request) {
            try {
                //Pego os dados do herói e converto
                const item = JSON.parse(data)
                    //Adiciono os dados obtidos dentro da instância
                const hero = new Hero(item)
                    //Puxo a validação dos dados
                const { valid, error } = hero.isValid()
                    /*Se os dados não forem válidos eu retorno um erro 400
                        Caso os dados sejam válidos retorno os dados 
                        separando-os por vírgulas*/
                if (!valid) {
                    response.writeHead(400, DEFAULT_HEADER)
                    response.write(JSON.stringify({ error: error.join(',') }))
                    return response.end()
                }
                //Gravo os dados tratados como um hero
                const id = await heroService.create(hero)

                response.writeHead(201, DEFAULT_HEADER)
                response.write(JSON.stringify({ success: 'Hero criado com sucesso!', id }))

                return response.end()
            } catch (error) {
                return handleError(response)(error)
            }


        }
    },
    default: (request, response) => {
        response.write('Hello')
        response.end()
    }
}

//Tratando erros internos
const handleError = response => {
    return error => {

        console.error('Internal Error***', error)
        response.writeHead(500, DEFAULT_HEADER)
        response.write(JSON.stringify({ error: 'Internal Server Error!' }))

        return response.end()
    }
}

const handler = (request, response) => {
    const { url, method } = request

    /*Criando o padrão para reconhecimento de rotas
        Retiro as barras da url trazida pelo request*/
    const [first, route, id] = url.split('/')

    /*Injeto o id no request
        Verifico se o id é numérico*/
    request.queryString = { id: isNaN(id) ? id : Number(id) }

    // criando rota a partir de uma chave
    const key = `/${route}:${method.toLowerCase()}`

    //Retorno default. Retorna o valor da rota ou a rota default.
    const chosen = routes[key] || routes.default

    response.writeHead(200, DEFAULT_HEADER)
    return chosen(request, response).catch(handleError(response))
}

http.createServer(handler).listen(port, () => {
    console.log('Server Running at', port)
})