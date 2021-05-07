// Bibliotecas usadas ára ler os dados do arquivo
const { readFile, writeFile } = require('fs/promises')

class HeroRepository {
    constructor({ file }) {
        this.file = file
    }

    //Função para ler o arquivo atual
    async _currentFileContent() {
            //Leio o arquivo e retorno conteúdo como json
            return JSON.parse(await readFile(this.file))
        }
        // Função para buscar os dados do arquivo
    async find(itemId) {
        //Variável para armazenar conteúdo do arquivo
        const all = await this._currentFileContent()

        /*Se eu não especificar um conteúdo, ou seja, se não informo um ID
        retorno todo o conteúdo. Caso contrário, retorno a informação pertencente 
        ao ID informado.*/
        if (!itemId) return all

        return all.find(({ id }) => itemId === id)
    }
    async create(data) {
        //Variável para armazenar conteúdo do arquivo atual
        const currentFile = await this._currentFileContent()

        //Adiciono o conteúdo dentro do arquivo atual com o push
        currentFile.push(data)

        /*Gravo as informações dentro do arquivo e retorno o ID caso seja 
        necessário em outro momento*/
        await writeFile(this.file, JSON.stringify(currentFile))

        return data.id
    }
}

module.exports = HeroRepository

//Testando o find. Declaro a Instância da classe passando o caminho do arquivo
// const heroRepository = new HeroRepository({
//     file: './../../database/data.json'
// })
// heroRepository.find().then(console.log).catch(error => console.log('error', error))

//Testando o create. Declaro a Instância da classe passando o caminho do arquivo
// const heroRepository = new HeroRepository({
//     file: './../../database/data.json'
// })

// heroRepository.create({
//     id: 2,
//     name: 'Chapolin',
//     age: 35,
//     power: 'Astúcia'
// }).then(console.log).catch(error => console.log('error', error))