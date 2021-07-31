
// função anonima
const selector = (el)=>document.querySelector(el);
const selectorAll = (el)=>document.querySelectorAll(el)


pizzaJson.map((pizza, index) => {
  let pizzaItem = selector('.models .pizza-item').cloneNode(true);

  pizzaItem.querySelector('.pizza-item--img img').src = pizza.img;

  pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${pizza.price.toFixed(2)}`;
  pizzaItem.querySelector('.pizza-item--name').innerHTML = pizza.name;
  pizzaItem.querySelector('.pizza-item--desc').innerHTML = pizza.description;
  pizzaItem.querySelector('a').addEventListener('click', (e) => {
    e.preventDefault();
    selector('.pizzaWindowArea').style.opacity = 0;
    selector('.pizzaWindowArea').style.display = 'flex';
    setTimeout(() => {
      selector('.pizzaWindowArea').style.opacity = 1;
    }, 200);

  })
  // preencher as informações em pizzaitem
  selector('.pizza-area').append(pizzaItem);

});