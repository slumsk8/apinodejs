/*Entidade que além de mapear os dados. A entidade valida se os dados estão
corretos*/
class Hero {
    constructor({ name, age, power }) {
        //Uso o this pra que os atributos sejam membros da classe
        this.id = Math.floor(Math.random() * 100) + Date.now() //Criando id automático
        this.name = name
        this.age = age
        this.power = power
    }

    isValid() {
        //Pego todas as propriedades da instância
        const propertyNames = Object.getOwnPropertyNames(this)

        //Pego os itens inválidos. Os itens vazios
        const amountInvalid = propertyNames
            .map(property => (!!this[property]) ? null : `${property} está perdida!`)
            .filter(item => !!item)

        //Esse objeto só será válido se a quantidade de itens inválidos for zero
        return {
            valid: amountInvalid.length === 0,
            error: amountInvalid
        }
    }
}

module.exports = Hero

// TESTE
// const hero = new Hero({ name: "Thor", age: 2000, power: "Storm" })
// console.log('valid', hero.isValid())
// console.log('valid', hero)