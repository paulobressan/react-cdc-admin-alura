import PubSub from 'pubsub-js'

export default class TratadorErrors {
    publicaErrors(erros) {
        for (let erro of erros.errors) {
            PubSub.publish('erro-validacao', erro)
        }
    }
}