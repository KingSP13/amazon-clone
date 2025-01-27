//Em OOP é uma convenção usar PascalCase em funções que geram ou criam objetos, então a primeira letra é maiúscula também.

function Cart(localtorageKey) {
    const cart = {
        cartItems : undefined,
    
        // QUANDO TEMOS UMA FUNÇÃO DENTRO DE UM OBJETO, CHAMAMOS DE 'MÉTODO' JAVASCRIPT TEM UM ATALHO PARA MÉTODOS, É UM ATALHO DE SINTAXE.
        //O ATALHO : loadFromStorage () {}  FORMA COMPLETA: loadFromStorage : function () {}
            loadFromStorage() {
            this.cartItems = JSON.parse(localStorage.getItem(localtorageKey));
          //Se o nome do objeto do arquivo for alterado, nada dentro dele vai funcionar já que está apontando para algo que não existe, para previnir isso, o javascript oference o 'this', que oferece o objeto pai do método a ser invocado, então substituindo o 'cart.cartItem' para 'this.cartItem' temos uma certa garantia de que não quebre caso o nome venha a ser alterado futuramente por que a hierarquia é aplicada ao invés do nome.
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
        },
        //Novamente o shortcut abaixo, completo ficaria saveToStorage : function () {}
        saveToStorage () {
            localStorage.setItem(localtorageKey, JSON.stringify(this.cartItems));
        },
    
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
          },
          removeFromCart(productId) {
            const newCart = [];
          
            this.cartItems.forEach((cartItem) => {
              if (cartItem.productId !== productId) {
                newCart.push(cartItem);
              }
            });
          
            this.cartItems = newCart;
          
            this.saveToStorage();
          },
    
          updateDeliveryOption(productId, deliveryOptionId) {
            let matchingItem;
          
            this.cartItems.forEach((cartItem) => {
              if (productId === cartItem.productId) {
                matchingItem = cartItem;
              }
            });
          
            matchingItem.deliveryOptionId = deliveryOptionId;
          
            this.saveToStorage();
          },
          
          updateQuantity (productId, newQuantity) {
            let matchingItem;
          
            this.cartItems.forEach((cartItem) => {
              if (productId === cartItem.productId) {
                matchingItem = cartItem;
              }
            });
          
            matchingItem.quantity = newQuantity;
          
            this.saveToStorage();
          }
    };
    return cart;
};

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');

cart.loadFromStorage();
businessCart.loadFromStorage();

console.log(cart)
console.log(businessCart)

// console.log(cart)

// cart.addToCart('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');

//Programação orientada a objetos tenta representar o mundo real, no mundo real, um carrinho é um objeto físico. Então em OOP tentamos representá-lo de forma digital, ou nesse caso num objeto JavaScript, um carrinho físico pode ter produtos dentro, um carrinho em JavaScript, digital também. Um carrinho físico tem acções que podemos tomar, como adicionar produtos ou remover produtos. Como removeFromCart ou addToCart, pode trazer uma perspectiva diferente, um novo mode de encarar o mesmo problema pode deixar mais claro a sua função ou o que uso o que voce escreve vai ter.



/*
const businessCart = {
    cartItems : undefined,

    // QUANDO TEMOS UMA FUNÇÃO DENTRO DE UM OBJETO, CHAMAMOS DE 'MÉTODO' JAVASCRIPT TEM UM ATALHO PARA MÉTODOS, É UM ATALHO DE SINTAXE.
    //O ATALHO : loadFromStorage () {}  FORMA COMPLETA: loadFromStorage : function () {}
        loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem('cart-business'));
      //Se o nome do objeto do arquivo for alterado, nada dentro dele vai funcionar já que está apontando para algo que não existe, para previnir isso, o javascript oference o 'this', que oferece o objeto pai do método a ser invocado, então substituindo o 'cart.cartItem' para 'this.cartItem' temos uma certa garantia de que não quebre caso o nome venha a ser alterado futuramente por que a hierarquia é aplicada ao invés do nome.
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
    },
    //Novamente o shortcut abaixo, completo ficaria saveToStorage : function () {}
    saveToStorage () {
        localStorage.setItem('cart-business', JSON.stringify(this.cartItems));
    },

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
      },
      removeFromCart(productId) {
        const newCart = [];
      
        this.cartItems.forEach((cartItem) => {
          if (cartItem.productId !== productId) {
            newCart.push(cartItem);
          }
        });
      
        this.cartItems = newCart;
      
        this.saveToStorage();
      },

      updateDeliveryOption(productId, deliveryOptionId) {
        let matchingItem;
      
        this.cartItems.forEach((cartItem) => {
          if (productId === cartItem.productId) {
            matchingItem = cartItem;
          }
        });
      
        matchingItem.deliveryOptionId = deliveryOptionId;
      
        this.saveToStorage();
      },
      
      updateQuantity (productId, newQuantity) {
        let matchingItem;
      
        this.cartItems.forEach((cartItem) => {
          if (productId === cartItem.productId) {
            matchingItem = cartItem;
          }
        });
      
        matchingItem.quantity = newQuantity;
      
        this.saveToStorage();
      }
};
*/
businessCart.loadFromStorage();

// Com programação orientada a objetos, podemos criar múltiplos objetos, como por exemplo a amazon business, que tem um carrinho para pessoa física e outro para empresa, o exemplo foi esse, então basicamente criamos uma cópia do carrinho, o que é muito facilitado em OOP. Só copiamos o carrinho inicial e alteramos o caminho do localStorage para 'businessCast' e foi basicamente isso. Porém pode tornar o código pouco organizado com muito código copiado e colado, então agora escrevemos uma função para gerar o objeto do carrinho diferenciado.