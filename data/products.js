import {formatCurrency} from '../scripts/utils/money.js'

export function getProduct(productId) {
  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  return matchingProduct;
}
//Nova técnica JS, converter objetos em classes, como os produtos são todos objetos e tem a mesma estrutura, podemos realizar a conversão sem grandes problemas.

class Product {
  id;
  image;
  name;
  rating;
  priceCents;

  constructor (productDetails) {
    this.id = productDetails.id
    this.image = productDetails.image
    this.name = productDetails.name
    this.rating = productDetails.rating
    this.priceCents = productDetails.priceCents
  };


  //Aqui temos um exemplo de funções adicionais de classes, podemos criar estes métodos para calcular o preço do produto e as avaliações "numa função", que dentro do objeto é chamado de método, quando utilizarmos o objeto 'products' podemos adicionar o método para calcular o dado em questão direto do javascript sem utilizar o cálculo numérico do html, reusabilodade e código mais separado de acordo com suas funções e relações deixa a codebase mais limpa e legível.
  getStartsUrl() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }

  getPrice() {
    return `$${formatCurrency(this.priceCents)}`;
  };

  extraInfoHTML() {
    return '';
  }
};


// Começamos aqui o conceito de herança, funciona basicamente como a definição, herdar o formato dos olhos ou cor de cabelo, em JS usamos herança para mandar a uma classe as propriedades e métodos de outra classe, principalmente quando uma classe é um tipo mais específico de uma classe já existente como neste caso são todos produtos, mas queremos especificar as roupas, temos aqui a classe Clothing herdando as propriedades e métodos de Product, os itens da categoria Clothing ainda são produtos, porém agora um pouco mais específicos com propriedades próprias, como por exemplo tamanho de roupa, voltagem para eletrodomésticos, etc.

class Clothing extends Product{
  sizeChartLink; 

  constructor(productDetails) {
    //Aqui precisamos adicionar as outras informações, por que já que Clothing vai receber as propriedades da classe pai, aínda temos que atribuir os valores, ao invés de fazer um por um como fizemos antes, "this.id = productDetails.id / this.image = productDetails.image / this.name = productDetails.name" e por aí vai, usamos o método especial, 'super', qye convoca a constructor da classe pai. no caso, chama a constructor de Products.
    super(productDetails);
    this.sizeChartLink = productDetails.sizeChartLink;
  }


  //Aqui declaramos um método de mesmo nome que o herdado da classe Product, então ele sobreescreve o método e considera o código escrito aqui, por isso o if (type === 'clothing') {} funciona, caso NÃO seja clothing, ele retorn a a string vazia declarada onde NÃO é clothing, porém caso seja e o método é invocado, ele considera o código escrito aqui e gera o HTML que queremos.
  extraInfoHTML() {
    //super.extraInfoHTML(); O método especial de classe "super" pode ser usado para invocar métodos da classe pai também. Ao que parece a syntaxe é muito semelhante a do 'this', mas ao invés de chamar o objeto 'acima' (como em diretórios), ele chama a classe pai.
    return `
    <a href="${this.sizeChartLink}" target="_blank">
      Size Chart
    </a>
    `;
  }
}

//EXEMPLO: Com a classe Clothing VAZIA, o teste foi realizado e respondeu de acordo, mesmo sem nenhuma adição a classe, o produto foi criado, exibido no console e o método getPrice() funcionou de acordo.
/* TEST CODE
const tshirt = new Clothing(
  {
    id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
    image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
    name: "Adults Plain Cotton T-Shirt - 2 Pack",
    rating: {
      stars: 4.5,
      count: 56
    },
    priceCents: 799,
    keywords: [
      "tshirts",
      "apparel",
      "mens"
    ],
    type: "clothing",
    sizeChartLink: "images/clothing-size-chart.png"
  });
  console.log(tshirt)
  console.log(tshirt.getPrice())
*/
  


//Aqui entregamos o objeto completo para ser consumido pela constructor, passando como parámetro podemos converter os dados agrupados num objeto para uma classe
/* TEST CODE
const product1 = new Product({
  id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  image: "images/products/athletic-cotton-socks-6-pairs.jpg",
  name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
  rating: {
    stars: 4.5,
    count: 87
  },
  priceCents: 1090,
  keywords: [
    "socks",
    "sports",
    "apparel"
  ]
});
*/


//Built-in classes: um exemplo é a classe 'Date', que exibe o horário atual de quando a classe é chamada, ela possui um método chamado '.toLocaleTimeString', que exibe apenas as horas, é útil porém a biblioteca que utilizamos anteriormente possui mais recursos de formatação e etc, então esta classe não costuma ser usada, na verdade também preferi o uso da lib, parece mais dinâmico e mais completo do que usar a classe diretamente.
/* TEST CODE
const date = new Date();
console.log(date)
console.log(date.toLocaleTimeString());
*/

//Aprofundando na referência dinâmica 'this', o 'this' é uma palavra chave que referencia o objeto atual e pode ser usado em qualquer lugar do código, como no exemplo abaixo ele está sendo usado isoladamente fora de um objeto, neste caso não existe um objeto pai então a info de saída é 'undefined'

// console.log(this)

//Outro exemplo de como o 'this' funciona abaixo, inicializando o objeto object2 demos a ele a propriedade a: 2 e b: this.a, que pode parece que a propriedade 'b' vai receber 2 pelo this apontar ao próprio objeto e o valor de a ser 2, porém o objeto ainda não foi inicializado por completo, então b vai receber 'undefined'. As aplicações que temos é normalmente em métodos, onde aponta ao objeto pai.
/* TEST CODE
const object2 = {
  a: 2,
  b: this.a
};
*/

//O 'this' também pode ser utilizado dentro de uma função, no caso ela retorna 'undefined' por não estar dentro de um objeto, mas as funções em JavaScript possuem um método chamado '.call' que executa a função, como normalmente acontece, porém ele recebe os parâmetros a serem passados para a função, sendo um adicional, o primeiro deles é o valor que 'this' vai adotar, no exemplo abaixo, o 'this' foi substituído por 'hello'. IMPORTANTE: APENAS FUNÇÕES COMUNS REALIZAM ESSA SUBSTITUIÇÃO, ARROW FUNCTIONS NÃO !
/* TEST CODE
function logThis(param1, param2) {
  console.log(this)
  console.log(param1)
  console.log(param2)
}
logThis();
logThis.call('hello', 'param1', 'param2');
*/

//Anteriormente existia um problema comum em JavaScript em que quando se criasse um objeto, e nele se tinha uma função com um forEach loop, no caso um método, o 'this' apontava para o objeto em questão, mas se tentássemos fazer um forEach loop, dentro do forEach loop, ele não apontaria mais o objeto em questão, apontaria 'undefined', por conta da função, por isso dentro de uma função comum, 'this' vira 'undefined', e isso causa problemas por não ter mais acesso ao objeto acima, por isso se criou as arrow functions, elas não alteram o valor do 'this', dentro e fora do forEach o valor é o mesmo, para que não ocorra a sobreposição.

class Appliance extends Product {
  instructionsLink = "images/appliance-instructions.png"
  warrantyLink = "images/appliance-warranty.png"

  constructor(productDetails) {
    super(productDetails);
  };

  extraInfoHTML() {
    //super.extraInfoHTML(); O método especial de classe "super" pode ser usado para invocar métodos da classe pai também. Ao que parece a syntaxe é muito semelhante a do 'this', mas ao invés de chamar o objeto 'acima' (como em diretórios), ele chama a classe pai.
    return `
    <a href="${this.instructionsLink}" target="_blank">
      Instructions
    </a>
    <a href="${this.warrantyLink}" target="_blank">
    Warranty
    </a>
    `;
  };
};

export let products = [];

export function loadProductsFetch() {
  //Por padrão fetch vai fazer uma requisição HTTP 'GET', então passamos o URL para que queremos envia-la. Fetch funciona como o método HTTP 'GET', porém por baixo dos panos, cria uma Promise, então recebe os dados e salva no parâmetro do '.then()', que como vimos antes, vai funcionar basicamente como uma variável comum
  const promise =  fetch(
    'https://supersimplebackend.dev/products'

  ).then((response) => {
    //Aqui, o 'response.json' cria outra Promise, então podemos criar um próximo passo, como da pra ver no console.log abaixo, o response é literalmente a resposta do 'GET', apenas os dados com número de status, URL a qual foi referido, etc...
    //console.log(response)
    return response.json() //Aqui, realmente processamos os dados, isso vai converter a resposta de servidor de 'response', para um json que podemos trabalhar, no caso, a lista de produtos. Lembrando que isso também é uma Promise, então código assíncrono, precisamos aguardar concluir para seguir para o próximo passo. Por isso o return, ele obriga a espera pelo dado para a função ser concluída
  }).then((productsData) => {
    //O valor é passado pra variável do '.then' como vimos antes, e aqui o console.log vai exibir o array de objetos que precisamos para importar e funcionar no projeto.
    console.log(productsData);
    //A resposta aqui foi um array de objetos json por conta do método de cima, o return, ele converteu uma string enorme com os dados de um json, num array javascript que podemos usar, ele basicamente usou o código que tínhamos antes na parte do 'products = JSON.parse(xhr.response)'

    products = productsData.map((productDetails) => {
      if(productDetails.type === 'clothing') {
        return new Clothing(productDetails);
      } else if (productDetails.type === 'appliance') {
        //TODO - criei a classe de Appliance por conta de um exercício, mas me baseei nas propriedades 'keywords', aí criei uma propriedade 'type: appliance', e isso puxava os produtos pra classe e criava bonitinho, mas agora importando pelo backend não posso alterar mais, preciso de outro método de fazer isso funcionar, também tem a paradinha clicável de Informações e Garantia, semelhante a tabela de medidas de roupas que fica perto da imagem do produto na home page. Depois volta na lissão 17 de heranças e confere dnv.
        return new Appliance(productDetails)
      }
      return new Product(productDetails);
    });

    console.log('load products');

//Promises nos dão dois métodos, '.then' e '.catch', caso um erro ocorra, ela vai executar o '.catch' e executar a função contida nele, sempre que a Promise for negada.
  }).catch((error) => {
    console.log('Unexpected error. Please try again later.')
  })
  return promise;
}
// loadProductsFetch();
/*
loadProductsFetch().then(() => {
  console.log('next step')
});
*/

export function loadProducts(fun) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    products = JSON.parse(xhr.response).map((productDetails) => {
      if(productDetails.type === 'clothing') {
        return new Clothing(productDetails);
      } else if (productDetails.type === 'appliance') {
        return new Appliance(productDetails)
      }
      return new Product(productDetails);
    });

    fun()
  });


//ERROR HANDLING - Aqui temos um código específico para caso a resposta do 'GET' seja alguma mensagem de erro, independente de qual seja, temos o exemplo do link incorreto, mas outros também podem ocorrer, preparamos um callback apenas para erros.

  xhr.addEventListener('error', (error) => {
    console.log('Unexpected error. Please try again later.')
  });

  xhr.open('GET', 'https://supersimplebackend.dev/products');
  xhr.send();
};

// loadProducts()

/*
export const products = [
  {
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    image: "images/products/athletic-cotton-socks-6-pairs.jpg",
    name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
    rating: {
      stars: 4.5,
      count: 87
    },
    priceCents: 1090,
    keywords: [
      "socks",
      "sports",
      "apparel"
    ]
  },
  {
    id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    image: "images/products/intermediate-composite-basketball.jpg",
    name: "Intermediate Size Basketball",
    rating: {
      stars: 4,
      count: 127
    },
    priceCents: 2095,
    keywords: [
      "sports",
      "basketballs"
    ]
  },
  {
    id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
    image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
    name: "Adults Plain Cotton T-Shirt - 2 Pack",
    rating: {
      stars: 4.5,
      count: 56
    },
    priceCents: 799,
    keywords: [
      "tshirts",
      "apparel",
      "mens"
    ],
    type: "clothing",
    sizeChartLink: "images/clothing-size-chart.png"
  },
  {
    id: "54e0eccd-8f36-462b-b68a-8182611d9add",
    image: "images/products/black-2-slot-toaster.jpg",
    name: "2 Slot Toaster - Black",
    rating: {
      stars: 5,
      count: 2197
    },
    priceCents: 1899,
    keywords: [
      "toaster",
      "kitchen",
      "appliances"
    ],
    type: 'appliance',
    instructionsLink: "images/appliance-instructions.png",
    warrantyLink: "images/appliance-warranty.png"
  },
  {
    id: "3ebe75dc-64d2-4137-8860-1f5a963e534b",
    image: "images/products/6-piece-white-dinner-plate-set.jpg",
    name: "6 Piece White Dinner Plate Set",
    rating: {
      stars: 4,
      count: 37
    },
    priceCents: 2067,
    keywords: [
      "plates",
      "kitchen",
      "dining"
    ]
  },
  {
    id: "8c9c52b5-5a19-4bcb-a5d1-158a74287c53",
    image: "images/products/6-piece-non-stick-baking-set.webp",
    name: "6-Piece Nonstick, Carbon Steel Oven Bakeware Baking Set",
    rating: {
      stars: 4.5,
      count: 175
    },
    priceCents: 3499,
    keywords: [
      "kitchen",
      "cookware"
    ]
  },
  {
    id: "dd82ca78-a18b-4e2a-9250-31e67412f98d",
    image: "images/products/plain-hooded-fleece-sweatshirt-yellow.jpg",
    name: "Plain Hooded Fleece Sweatshirt",
    rating: {
      stars: 4.5,
      count: 317
    },
    priceCents: 2400,
    keywords: [
      "hoodies",
      "sweaters",
      "apparel"
    ],
    type: "clothing",
    sizeChartLink: "images/clothing-size-chart.png"
  },
  {
    id: "77919bbe-0e56-475b-adde-4f24dfed3a04",
    image: "images/products/luxury-tower-set-6-piece.jpg",
    name: "Luxury Towel Set - Graphite Gray",
    rating: {
      stars: 4.5,
      count: 144
    },
    priceCents: 3599,
    keywords: [
      "bathroom",
      "washroom",
      "restroom",
      "towels",
      "bath towels"
    ]
  },
  {
    id: "3fdfe8d6-9a15-4979-b459-585b0d0545b9",
    image: "images/products/liquid-laundry-detergent-plain.jpg",
    name: "Liquid Laundry Detergent, 110 Loads, 82.5 Fl Oz",
    rating: {
      stars: 4.5,
      count: 305
    },
    priceCents: 2899,
    keywords: [
      "bathroom",
      "cleaning"
    ]
  },
  {
    id: "58b4fc92-e98c-42aa-8c55-b6b79996769a",
    image: "images/products/knit-athletic-sneakers-gray.jpg",
    name: "Waterproof Knit Athletic Sneakers - Gray",
    rating: {
      stars: 4,
      count: 89
    },
    priceCents: 3390,
    keywords: [
      "shoes",
      "running shoes",
      "footwear"
    ]
  },
  {
    id: "5968897c-4d27-4872-89f6-5bcb052746d7",
    image: "images/products/women-chiffon-beachwear-coverup-black.jpg",
    name: "Women's Chiffon Beachwear Cover Up - Black",
    rating: {
      stars: 4.5,
      count: 235
    },
    priceCents: 2070,
    keywords: [
      "robe",
      "swimsuit",
      "swimming",
      "bathing",
      "apparel"
    ],
    type: "clothing",
    sizeChartLink: "images/clothing-size-chart.png"
  },
  {
    id: "aad29d11-ea98-41ee-9285-b916638cac4a",
    image: "images/products/round-sunglasses-black.jpg",
    name: "Round Sunglasses",
    rating: {
      stars: 4.5,
      count: 30
    },
    priceCents: 1560,
    keywords: [
      "accessories",
      "shades"
    ]
  },
  {
    id: "04701903-bc79-49c6-bc11-1af7e3651358",
    image: "images/products/women-beach-sandals.jpg",
    name: "Women's Two Strap Buckle Sandals - Tan",
    rating: {
      stars: 4.5,
      count: 562
    },
    priceCents: 2499,
    keywords: [
      "footwear",
      "sandals",
      "womens",
      "beach",
      "summer"
    ]
  },
  {
    id: "901eb2ca-386d-432e-82f0-6fb1ee7bf969",
    image: "images/products/blackout-curtain-set-beige.webp",
    name: "Blackout Curtains Set 4-Pack - Beige",
    rating: {
      stars: 4.5,
      count: 232
    },
    priceCents: 4599,
    keywords: [
      "bedroom",
      "curtains",
      "home"
    ]
  },
  {
    id: "82bb68d7-ebc9-476a-989c-c78a40ee5cd9",
    image: "images/products/men-slim-fit-summer-shorts-gray.jpg",
    name: "Men's Slim-Fit Summer Shorts",
    rating: {
      stars: 4,
      count: 160
    },
    priceCents: 1699,
    keywords: [
      "shorts",
      "apparel",
      "mens"
    ],
    type: "clothing",
    sizeChartLink: "images/clothing-size-chart.png"
  },
  {
    id: "c2a82c5e-aff4-435f-9975-517cfaba2ece",
    image: "images/products/electric-glass-and-steel-hot-water-kettle.webp",
    name: "Electric Glass and Steel Hot Tea Water Kettle - 1.7-Liter",
    rating: {
      stars: 5,
      count: 846
    },
    priceCents: 3074,
    keywords: [
      "water boiler",
      "appliances",
      "kitchen"
    ],
    type: 'appliance',
    instructionsLink: "images/appliance-instructions.png",
    warrantyLink: "images/appliance-warranty.png"
  },
  {
    id: "6b07d4e7-f540-454e-8a1e-363f25dbae7d",
    image: "images/products/facial-tissue-2-ply-18-boxes.jpg",
    name: "Ultra Soft Tissue 2-Ply - 18 Box",
    rating: {
      stars: 4,
      count: 99
    },
    priceCents: 2374,
    keywords: [
      "kleenex",
      "tissues",
      "kitchen",
      "tissues box",
      "napkins"
    ]
  },
  {
    id: "a82c6bac-3067-4e68-a5ba-d827ac0be010",
    image: "images/products/straw-sunhat.webp",
    name: "Straw Lifeguard Sun Hat",
    rating: {
      stars: 4,
      count: 215
    },
    priceCents: 2200,
    keywords: [
      "hats",
      "straw hats",
      "summer",
      "apparel"
    ],
    type: "clothing",
    sizeChartLink: "images/clothing-size-chart.png"
  },
  {
    id: "e4f64a65-1377-42bc-89a5-e572d19252e2",
    image: "images/products/sky-flower-stud-earrings.webp",
    name: "Sterling Silver Sky Flower Stud Earrings",
    rating: {
      stars: 4.5,
      count: 52
    },
    priceCents: 1799,
    keywords: [
      "jewelry",
      "accessories",
      "womens"
    ]
  },
  {
    id: "b0f17cc5-8b40-4ca5-9142-b61fe3d98c85",
    image: "images/products/women-stretch-popover-hoodie-black.jpg",
    name: "Women's Stretch Popover Hoodie",
    rating: {
      stars: 4.5,
      count: 2465
    },
    priceCents: 1374,
    keywords: [
      "hooded",
      "hoodies",
      "sweaters",
      "womens",
      "apparel"
    ],
    type: "clothing",
    sizeChartLink: "images/clothing-size-chart.png"
  },
  {
    id: "a93a101d-79ef-4cf3-a6cf-6dbe532a1b4a",
    image: "images/products/bathroom-rug.jpg",
    name: "Bathroom Bath Rug Mat 20 x 31 Inch - Grey",
    rating: {
      stars: 4.5,
      count: 119
    },
    priceCents: 1250,
    keywords: [
      "bathmat",
      "bathroom",
      "home"
    ]
  },
  {
    id: "4f4fbcc2-4e72-45cc-935c-9e13d79cc57f",
    image: "images/products/women-knit-ballet-flat-black.jpg",
    name: "Women's Knit Ballet Flat",
    rating: {
      stars: 4,
      count: 326
    },
    priceCents: 2640,
    keywords: [
      "shoes",
      "flats",
      "womens",
      "footwear"
    ]
  },
  {
    id: "8b5a2ee1-6055-422a-a666-b34ba28b76d4",
    image: "images/products/men-golf-polo-t-shirt-blue.jpg",
    name: "Men's Regular-Fit Quick-Dry Golf Polo Shirt",
    rating: {
      stars: 4.5,
      count: 2556
    },
    priceCents: 1599,
    keywords: [
      "tshirts",
      "shirts",
      "apparel",
      "mens"
    ],
    type: "clothing",
    sizeChartLink: "images/clothing-size-chart.png"
  },
  {
    id: "b86ddc8b-3501-4b17-9889-a3bad6fb585f",
    image: "images/products/trash-can-with-foot-pedal-50-liter.jpg",
    name: "Trash Can with Foot Pedal - Brushed Stainless Steel",
    rating: {
      stars: 4.5,
      count: 2286
    },
    priceCents: 8300,
    keywords: [
      "garbage",
      "bins",
      "cans",
      "kitchen"
    ]
  },
  {
    id: "19c6a64a-5463-4d45-9af8-e41140a4100c",
    image: "images/products/duvet-cover-set-blue-twin.jpg",
    name: "Duvet Cover Set with Zipper Closure",
    rating: {
      stars: 4,
      count: 456
    },
    priceCents: 2399,
    keywords: [
      "bedroom",
      "bed sheets",
      "sheets",
      "covers",
      "home"
    ]
  },
  {
    id: "d2785924-743d-49b3-8f03-ec258e640503",
    image: "images/products/women-chunky-beanie-gray.webp",
    name: "Women's Chunky Cable Beanie - Gray",
    rating: {
      stars: 5,
      count: 83
    },
    priceCents: 1250,
    keywords: [
      "hats",
      "winter hats",
      "beanies",
      "tuques",
      "apparel",
      "womens"
    ],
    type: "clothing",
    sizeChartLink: "images/clothing-size-chart.png"
  },
  {
    id: "ee1f7c56-f977-40a4-9642-12ba5072e2b0",
    image: "images/products/men-chino-pants-beige.jpg",
    name: "Men's Classic-fit Pleated Chino Pants",
    rating: {
      stars: 4.5,
      count: 9017
    },
    priceCents: 2290,
    keywords: [
      "pants",
      "apparel",
      "mens"
    ],
    type: "clothing",
    sizeChartLink: "images/clothing-size-chart.png"
  },
  {
    id: "1c079479-8586-494f-ab53-219325432536",
    image: "images/products/men-athletic-shoes-green.jpg",
    name: "Men's Athletic Sneaker",
    rating: {
      stars: 4,
      count: 229
    },
    priceCents: 3890,
    keywords: [
      "shoes",
      "running shoes",
      "footwear",
      "mens"
    ]
  },
  {
    id: "4df68c27-fd59-4a6a-bbd1-e754ddb6d53c",
    image: "images/products/men-navigator-sunglasses-brown.jpg",
    name: "Men's Navigator Sunglasses Pilot",
    rating: {
      stars: 3.5,
      count: 42
    },
    priceCents: 1690,
    keywords: [
      "sunglasses",
      "glasses",
      "accessories",
      "shades"
    ]
  },
  {
    id: "4e37dd03-3b23-4bc6-9ff8-44e112a92c64",
    image: "images/products/non-stick-cooking-set-15-pieces.webp",
    name: "Non-Stick Cookware Set, Pots, Pans and Utensils - 15 Pieces",
    rating: {
      stars: 4.5,
      count: 511
    },
    priceCents: 6797,
    keywords: [
      "cooking set",
      "kitchen"
    ]
  },
  {
    id: "a434b69f-1bc1-482d-9ce7-cd7f4a66ce8d",
    image: "images/products/vanity-mirror-silver.jpg",
    name: "Vanity Mirror with Heavy Base - Chrome",
    rating: {
      stars: 4.5,
      count: 130
    },
    priceCents: 1649,
    keywords: [
      "bathroom",
      "washroom",
      "mirrors",
      "home"
    ]
  },
  {
    id: "a45cfa0a-66d6-4dc7-9475-e2b01595f7d7",
    image: "images/products/women-french-terry-fleece-jogger-camo.jpg",
    name: "Women's Fleece Jogger Sweatpant",
    rating: {
      stars: 4.5,
      count: 248
    },
    priceCents: 2400,
    keywords: [
      "pants",
      "sweatpants",
      "jogging",
      "apparel",
      "womens"
    ],
    type: "clothing",
    sizeChartLink: "images/clothing-size-chart.png"
  },
  {
    id: "d339adf3-e004-4c20-a120-40e8874c66cb",
    image: "images/products/double-elongated-twist-french-wire-earrings.webp",
    name: "Double Oval Twist French Wire Earrings - Gold",
    rating: {
      stars: 4.5,
      count: 117
    },
    priceCents: 2400,
    keywords: [
      "accessories",
      "womens"
    ]
  },
  {
    id: "d37a651a-d501-483b-aae6-a9659b0757a0",
    image: "images/products/round-airtight-food-storage-containers.jpg",
    name: "Round Airtight Food Storage Containers - 5 Piece",
    rating: {
      stars: 4,
      count: 126
    },
    priceCents: 2899,
    keywords: [
      "boxes",
      "food containers",
      "kitchen"
    ]
  },
  {
    id: "0d7f9afa-2efe-4fd9-b0fd-ba5663e0a524",
    image: "images/products/coffeemaker-with-glass-carafe-black.jpg",
    name: "Coffeemaker with Glass Carafe and Reusable Filter - 25 Oz, Black",
    rating: {
      stars: 4.5,
      count: 1211
    },
    priceCents: 2250,
    keywords: [
      "coffeemakers",
      "kitchen",
      "appliances"
    ],
    type: 'appliance',
    instructionsLink: "images/appliance-instructions.png",
    warrantyLink: "images/appliance-warranty.png"
  },
  {
    id: "02e3a47e-dd68-467e-9f71-8bf6f723fdae",
    image: "images/products/blackout-curtains-black.jpg",
    name: "Blackout Curtains Set 42 x 84-Inch - Black, 2 Panels",
    rating: {
      stars: 4.5,
      count: 363
    },
    priceCents: 3099,
    keywords: [
      "bedroom",
      "home"
    ]
  },
  {
    id: "8a53b080-6d40-4a65-ab26-b24ecf700bce",
    image: "images/products/cotton-bath-towels-teal.webp",
    name: "100% Cotton Bath Towels - 2 Pack, Light Teal",
    rating: {
      stars: 4.5,
      count: 93
    },
    priceCents: 2110,
    keywords: [
      "bathroom",
      "home",
      "towels"
    ]
  },
  {
    id: "10ed8504-57db-433c-b0a3-fc71a35c88a1",
    image: "images/products/knit-athletic-sneakers-pink.webp",
    name: "Waterproof Knit Athletic Sneakers - Pink",
    rating: {
      stars: 4,
      count: 89
    },
    priceCents: 3390,
    keywords: [
      "shoes",
      "running shoes",
      "footwear",
      "womens"
    ]
  },
  {
    id: "77a845b1-16ed-4eac-bdf9-5b591882113d",
    image: "images/products/countertop-blender-64-oz.jpg",
    name: "Countertop Blender - 64oz, 1400 Watts",
    rating: {
      stars: 4,
      count: 3
    },
    priceCents: 10747,
    keywords: [
      "food blenders",
      "kitchen",
      "appliances"
    ],
    type: 'appliance',
    instructionsLink: "images/appliance-instructions.png",
    warrantyLink: "images/appliance-warranty.png"
  },
  {
    id: "36c64692-677f-4f58-b5ec-0dc2cf109e27",
    image: "images/products/floral-mixing-bowl-set.jpg",
    name: "10-Piece Mixing Bowl Set with Lids - Floral",
    rating: {
      stars: 5,
      count: 679
    },
    priceCents: 3899,
    keywords: [
      "mixing bowls",
      "baking",
      "cookware",
      "kitchen"
    ]
  },
  {
    id: "aaa65ef3-8d6f-4eb3-bc9b-a6ea49047d8f",
    image: "images/products/kitchen-paper-towels-30-pack.jpg",
    name: "2-Ply Kitchen Paper Towels - 30 Pack",
    rating: {
      stars: 4.5,
      count: 1045
    },
    priceCents: 5799,
    keywords: [
      "kitchen",
      "kitchen towels",
      "tissues"
    ]
  },
  {
    id: "bc2847e9-5323-403f-b7cf-57fde044a955",
    image: "images/products/men-cozy-fleece-zip-up-hoodie-red.jpg",
    name: "Men's Full-Zip Hooded Fleece Sweatshirt",
    rating: {
      stars: 4.5,
      count: 3157
    },
    priceCents: 2400,
    keywords: [
      "sweaters",
      "hoodies",
      "apparel",
      "mens"
    ],
    type: "clothing",
    sizeChartLink: "images/clothing-size-chart.png"
  }
].map((productDetails) => {
  if(productDetails.type === 'clothing') {
    return new Clothing(productDetails);
  } else if (productDetails.type === 'appliance') {
    return new Appliance(productDetails)
  }
  return new Product(productDetails);
});
*/