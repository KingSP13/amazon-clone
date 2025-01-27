//Um método de criação de objetos melhor e com mais recursos são as classes. É mais limpo e legível em relação a usar funções como fazíamos antes, outro benefício de classes, é que tem outros recursos, como 'Constructor' que permite rodar algum código quando o objeto for criado. Como as funções invocadas ao fim da classe, ela permite que esse código seja integrado como parte da classe, limpando ainda mais a codebase agrupando tudo na classe.

class Cart {

    //SHORTCUT para propriedades de classes que são 'undefined', é só declara-la e ponto-virgula, como mostrado abaixo nas duas formas.

    cartItems = undefined;
    #localStorageKey;

    //Em localStorageKey, armazenamos a chave que vai ser usada para bucar os dados salvos no localStorage, par agarantir certa 'imutabilidade', usamos ela como propriedade privada, adicionando o hash # em frente onde ela for invocada, para demonstrar que ela só pode ser usada dentro da classe em que é criada, caso não contenha o hash (#) ela é declarada como propriedade pública, funciona semelhante ao escopo de funções.

    //Um 'constructor' tem uma função semelhante a de uma função comum, mas quando o objeto for gerado, o código de dentro é executado automaticamente.

    constructor (localStorageKey) {

        //Aqui temos as 'instâncias' da classe, que são os objetos gerados a partir delas.

        this.#localStorageKey = localStorageKey
        this.#loadFromStorage();

        //Mais detalhes sobre o método especial 'constructor', 1 - precisa ser invocado com a string 'constructor' exatamente, não pode ser renomeado como fazemos com funções. 2 - O método especial 'constructor' não deve retornar nada.
    }

    //O mesmo se aplica para métodos, podemos ter um método privado pelos mesmos motivos que temos propriedades privadas, funciona da mesma forma com o hash (#) antes da declaração e quando for invocado, também previne reatribuição.
    #loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));
        
        if (!this.cartItems) {
            this.cartItems = [{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 2,
                deliveryOptionId: '1'
            }, {
                productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity: 1,
                deliveryOptionId: '2'
            }];
        }
    }
    saveToStorage () {
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    }
    addToCart (productId) {
        let matchingItem;
      
        this.cartItems.forEach((cartItem) => {
          if (productId === cartItem.productId) {
            matchingItem = cartItem;
          }
        });
      
        if (matchingItem) {
          matchingItem.quantity += 1;
        } else {
          this.cartItems.push({
            productId: productId,
            quantity: 1,
            deliveryOptionId: '1'
          });
        }
      
        this.saveToStorage();
      }
      removeFromCart(productId) {
        const newCart = [];
      
        this.cartItems.forEach((cartItem) => {
          if (cartItem.productId !== productId) {
            newCart.push(cartItem);
          }
        });
      
        this.cartItems = newCart;
      
        this.saveToStorage();
      }
      updateDeliveryOption(productId, deliveryOptionId) {
        let matchingItem;
      
        this.cartItems.forEach((cartItem) => {
          if (productId === cartItem.productId) {
            matchingItem = cartItem;
          }
        });
      
        matchingItem.deliveryOptionId = deliveryOptionId;
      
        this.saveToStorage();
      }
}

const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');

//cart.#localStorageKey = 'test'
//mensagem de erro ao tentar redefinir a propriedade privada: cart-class.js:94 Uncaught SyntaxError: Private field '#localStorageKey' must be declared in an enclosing class (at cart-class.js:94:5)

console.log(cart);
console.log(businessCart);

//instanceof indica se o objeto foi gerado a partir da classe indicada, neste caso o console.log vai exibir 'true'
console.log(businessCart instanceof Cart);

// Classes são meio confusas mas basicamente, programação orientada a objetos (OOP) significa organizar o código em objetos, que tentam representar o mundo real, e classes são um recurso para ajudar a gerar objetos, tornando o processo mais facil, e classes são basicamente um gerador de objetos.