const HeroRepository = require('./../repositories/heroRepository')
const HeroService = require('./../services/heroService')

//Buscando o caminho do arquivo e formalizando
const { join } = require('path')
const filename = join(__dirname, '../../database', 'data.json')

const generateInstance = () => {
    const heroRepository = new HeroRepository({
        file: filename
    })
    const heroService = new HeroService({
        heroRepository
    })

    return heroService
}

module.exports = { generateInstance }

//Testando
// generateInstance().find().then(console.log)