class HeroService {
    constructor({ heroRepository }) {
        this.heroRepository = heroRepository
    }

    /*Busco o item de dentro do arquivo JSON através do ID.
    Essa função está no heroRepository*/
    async find(itemId) {
        return this.heroRepository.find(itemId)
    }

    /*Crio um objeto JSON dentro do arquivo data.json
    Essa função está no heroRepository*/
    async create(data) {
        return this.heroRepository.create(data)
    }
}

module.exports = HeroService