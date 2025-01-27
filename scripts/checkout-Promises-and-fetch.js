import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import {loadProductsFetch, loadProducts} from '../data/products.js'
import {loadCart} from '../data/cart.js';

// import '../data/cart-class.js'; utilizado para teste
// import '../data/backend-practice.js';

//Início do módulo de Promises, uma promisse é uma classe builtin que é chamada como está abaixo, é uma classe só que recebe uma função como parâmetro, que é executada em tempo real. Promises são usadas para nos permitir executar funções assíncronas como vinhamos fazendo com o addEventListener, só que são feitas para isso. O parâmetro que recebem, é o 'resolve', funciona como o 'done()' do Jasmine. Lembrando que o 'resolve' é uma function. Dentro da Promise passamos o resolve que é executado quando o código assíncrono for concluído.

//Pelo que eu entendi uma promise cria uma nova linha, uma nova execução do código, no sentido de que ela pode ser executada simultaneamente com o resto, basicamente quando a execução do código chega a uma Promise, o código para para executá-la como uma classe normal, porém ao mesmo tempo continua executando o código abaixo, e no fim, ela não necessáriamente acaba, pode ter comando sequenciais, passos a se seguir com essa nova 'linhagem de execução', e é claro, o resolve é o ponto final disso, ele posiciona o fim da tarefa e parte para o próximo passo.

//TEST CODE, aqui um exemplo de como as coisas funcionam, início, meio e fim.
/*
new Promise((resolve) => {
    console.log('start of the promise')
    loadProducts(() => {
        console.log('finish loaded')
        resolve();
    });

}).then(() => {
    console.log('//next step')
});
*/
//Meu primeiro pensamento aqui era de passar ambas as funções como parâmetro, mais simples que a função anônima, porém nos parentesis vai o parâmetro formal, e como na declaração da função definimos 'fun', só pode receber um parâmetro e não faria muito sentido, a solução de função anônima foi perfeita por que uma função é um código reutilizável, aqui ela está sendo aplicada para executar o render da order page e da product page quando os produtos forem carregados da API.
//Voltando aqui posteriormente pra dizer que vamos converter esse código abaixo, de uma função com callback pra uma promisse, vou manter tudo comentado e seguir com a conversão.
/*
loadProducts(() => {
    renderOrderSummary();
    renderPaymentSummary();
});
*/

//Parece mais complicado do que só usar callback normalmente, mas o callback causa muito aninhamento e pra qualquer projeto de médio prazo fica insustentável ter código tão ilegível.


//Uma coisa interessante de se pontuar, é que o valor passado para o 'resolve(x)', vai ser passado para o método 'then(x)', assim podemos carregar alguma informação de um passo para o outro de uma Promise. Também podemos executar várias promisses ao mesmo tempo, sem precisar esperar uma carregar completamente, usando o Promise.All()
//Promise.All é usado para aguardar todas as Promises de dentro serem concluídas antes de pular para o próximo passo, aqui por exemplo podemos executar as duas Promises que criamos anteriormente e executar o mesmo resultado com este método especial novo.

//TEST CODE - Promise.All([]), recebe um array de Promises, e executa todas ao mesmo tempo, como aqui, não precisamos aguardar os produtos carregarem por completo, e no próximo passo carregar o carrinho por completo, o método '.All' recebe um array com todas as promises e executa todas ao mesmo tempo

Promise.all([
    loadProductsFetch(),
    // new Promise((resolve) => {
    //     loadProductsFetch(() => {
    //         resolve('value1');
    //     });
    // }),
    new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    })
    //Exemplo da String 'value1' sendo passada no 'resolve' da primeira Promise, e sendo recebido no '.then' ao final da Promise.All,
]).then((values) => {
    console.log(values) //O console vai exibir um array de valores em que a ordem é a ordem de declaração das Promises, neste caso o retorno é: ['value1', undefined]
    renderOrderSummary();
    renderPaymentSummary();
})

//EM RESUMO: Promises são uma maneira melhor de utilizar funções assíncronas, já que tudo pode ser executado ao mesmo tempo, e o código fica menos aninhado em relação a callbacks, como tivemos em 'setTimeOut', 'flat code' é muito mais legível e mais fácil de aplicar manutenção já que tem menos 'coisa dentro de coisa'


// .then((value) => {
//     console.log(value)
//     return new Promise((resolve) => {
//         loadCart(() => {
//             resolve();
//         });
//     });

// }).then(() => {
//     renderOrderSummary();
//     renderPaymentSummary();
// });