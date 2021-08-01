
let modalKey = 0;
let cart = [];
let modalQt = 1;

// função anonima
const selector = (el)=>document.querySelector(el);
const selectorAll = (el)=>document.querySelectorAll(el)

// listagem das pizzas 
pizzaJson.map((pizza, index) => {
  let pizzaItem = selector('.models .pizza-item').cloneNode(true);

  pizzaItem.querySelector('.pizza-item--img img').src = pizza.img;

  pizzaItem.setAttribute('data-key', index);
  pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${pizza.price.toFixed(2)}`;
  pizzaItem.querySelector('.pizza-item--name').innerHTML = pizza.name;
  pizzaItem.querySelector('.pizza-item--desc').innerHTML = pizza.description;
  pizzaItem.querySelector('a').addEventListener('click', (e) => {
    e.preventDefault();

    let key = e.target.closest('.pizza-item').getAttribute('data-key');
    modalQt = 1;
    modalKey = key;
    
    selector('.pizzaBig img').src = pizzaJson[key].img;
    selector('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
    selector('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
    selector('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;

    selector('.pizzaInfo--size.selected').classList.remove('selected');
    selectorAll('.pizzaInfo--size').forEach((size, sizeIndex)=>{
      if(sizeIndex == 2) {
        size.classList.add('selected');
      }
      size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
    });

    selector('.pizzaInfo--qt').innerHTML = modalQt;

    selector('.pizzaWindowArea').style.opacity = 0;
    selector('.pizzaWindowArea').style.display = 'flex';
    setTimeout(() => {
      selector('.pizzaWindowArea').style.opacity = 1;
    }, 200);

  })
  // preencher as informações em pizzaitem
  selector('.pizza-area').append(pizzaItem);
});

// eventos do modal
function closeModal() {
  selector('.pizzaWindowArea').style.opacity = 0;  
  setTimeout(() => {
    selector('.pizzaWindowArea').style.display = 'none';
  }, 500);
}
selectorAll('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=>{
  item.addEventListener('click', closeModal);
});

selector('.pizzaInfo--qtmenos').addEventListener('click', () => {
  if(modalQt > 1) {
  modalQt--;
  selector('.pizzaInfo--qt').innerHTML = modalQt;
  }
});

selector('.pizzaInfo--qtmais').addEventListener('click', () => {
  modalQt++;
  selector('.pizzaInfo--qt').innerHTML = modalQt;
});
selectorAll('.pizzaInfo--size').forEach((size, sizeIndex)=>{
  size.addEventListener('click', (e)=>{
    selector('.pizzaInfo--size.selected').classList.remove('selected');
    size.classList.add('selected');
  });
});
selector('.pizzaInfo--addButton').addEventListener('click', ()=>{
  // qual o tamanho
  let size = parseInt(selector('.pizzaInfo--size.selected').getAttribute('data-key'));
  let identifier = pizzaJson[modalKey].id+'@'+size;
  let key = cart.findIndex((item)=>{
    return item.identifier == identifier;
  });

  if(key > -1) {
    cart[key].qt += modalQt;
  }else {
    cart.push({
      identifier,
      id: pizzaJson[modalKey].id,
      size,
      qt: modalQt
    });
  }
  updateCart();
  closeModal();
});


selector('.menu-openner').addEventListener('click', ()=>{
  if(cart.length > 0) {
    selector('aside').style.left = '0';
  }
});

selector('.menu-closer').addEventListener('click', ()=>{
  selector('aside').style.left = '100vw';
})

function updateCart() {

  selector('.menu-openner span').innerHTML = cart.length;

  if(cart.length > 0) {
    selector('aside').classList.add('show');
    selector('.cart').innerHTML = '';

    let subtotal = 0;
    let desconto = 0;
    let total = 0;

    for(let i in cart) {
      let pizzaItem = pizzaJson.find((item)=>item.id == cart[i].id);
      subtotal += pizzaItem.price * cart[i].qt;
      let cartItem = selector('.models .cart--item').cloneNode(true);

      let pizzaSizeName;

      switch(cart[i].size) {
        case 0:
          pizzaSizeName = 'P';
          break;
        case 1:
          pizzaSizeName = 'M';
          break;
        case 2:
          pizzaSizeName = 'G';
          break;
      }

      let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;

      cartItem.querySelector('img').src = pizzaItem.img;
      cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
      cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;
      cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', ()=>{
        if(cart[i].qt > 1) {
          cart[i].qt--;
        }else{
          cart.splice(i, 1);
        }
        updateCart();
      });
      cartItem.querySelector('.cart--item-qtmais').addEventListener('click', ()=>{
        cart[i].qt++;
        updateCart();
      });

      selector('.cart').append(cartItem);
    }

    desconto = subtotal * 0.1;
    total = subtotal - desconto;

    selector('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
    selector('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
    selector('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;

  }else{
    selector('aside').classList.remove('show');
    selector('aside').style.left = '100vw';
  }
}