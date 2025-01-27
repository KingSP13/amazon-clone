import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import {loadProductsFetch, loadProducts} from '../data/products.js'
import {loadCart} from '../data/cart.js';

//Introdução a 'async await', async faz a função retornar uma promise, é um shortcut para este código:
/*
function loadPage() {
    return new Promise ((resolve) => {
        console.log('load page');
        resolve();
    });
};
*/

//Basicamente envolve o código da função e o retorna numa Promise
async function loadPage() {
//Gestão de erros em async await: Temos um bloco de tratamento de dados, o try{} recebe o código que pode ser fonte de algum erro, quando qualquer código contido em 'try{}' retorna um erro, o código contido em 'catch{}' é executado.

    try {

        //throw 'error1'
//Podemos criar erros manualmente também, utilizando o 'throw', ele vai forçar o erro e pualr o código, assim executando o catch com o valor que está nele, como no exemplo o 'error1' vai ser salvo no 'catch('error1')' e executado. Basicamente, um debugger.

        await loadProductsFetch();

//Em Promises temos duas formas de criar erros manualmente, com o 'throw' como fizemos com async / await, e o reject, que retorna o erro no futuro, na função que seria executada quando concluído o carregamento, no caso dentro do loadCart()
        const value = await new Promise((resolve, reject) => {
            //throw 'error2'
            loadCart(() => {
                //reject('error3')
                resolve('value3');
            });
        });
    
        renderOrderSummary();
        renderPaymentSummary();
    } catch(error) {
        console.log('Unexpected error. Please try again later.')
    }

/*
O 'try{}' pode ser usado em código síncrono também, por exemplo:
try {
    doesNotExist();
    console.log('next line');

}   catch(error) {
    console.log('Error!')
}

A função 'doesNotExist()' não foi declarada, então ela vai retornar um erro, o console.log vai ser ignorado e todo o resto do código do bloco, a execução vai pular direto para o catch e executar o que está no bloco.
- Ah, mas por que não usa o try/catch em tudo e previne os erros tudo de uma vez ?
Esse tratamento de erros é utilizado para erros que estão fora de controle, quando o código está correto porém algo como o servidor fora do ar te afete, alguma página sendo redirecionada para o link errado, etc...
*/

//O await aguarda a função ser finalizada, para seguir para o próximo passo, e só pode ser usado dentro de uma função async, mesmo que aninhada com função comum, não funciona, a função pai, direta, tem que ser await
    // await loadProductsFetch();


//Como vimos antes, o valor passado como parâmetro para o 'resolve', é repassado para o '.then' como parâmetro no passo seguinte, porém não precisamos do '.then' aqui, neste caso ele é retornado para a função, e precisamos armazenar este valor numa variável como: const fun = await new Promise (() => {resolve(value)}), fun vai receber value
    // await new Promise((resolve) => {
    //     loadCart(() => {
    //         resolve();
    //     });
    // });

    // renderOrderSummary();
    // renderPaymentSummary();
};

//Como é uma Promise, podemos adicionar um próximo passo com o '.then', o mesmo sobre o parâmetro do 'resolve' se aplica aqui, se retornarmos algo, ele é como se estivesse dentro do resolve, e vai ser passado pra dentro do '.then' como parâmetro também no próximo passo

loadPage();

/*
Promise.all([
    loadProductsFetch(),
    new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    })

]).then((values) => {
    renderOrderSummary();
    renderPaymentSummary();
});
*/