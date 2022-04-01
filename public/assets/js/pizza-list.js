const $pizzaList = document.querySelector('#pizza-list');

// make call to my pizza api
const getPizzaList = () => {
  // call our pizza api
    fetch('/api/pizzas')
    // turn the response to json data
    .then(response => response.json())
    .then(pizzaListArr => {
      // run print pizza funtion on every object returned in our data array
      pizzaListArr.forEach(printPizza);
    })
    .catch(err => {
      console.log(err);
    });
};

// this will use the data from our api to make pizza cards "note how we destructure the incoming object for its individual properties"
const printPizza = ({ _id, pizzaName, toppings, size, commentCount, createdBy, createdAt }) => {
  const pizzaCard = `
    <div class="col-12 col-lg-6 flex-row">
      <div class="card w-100 flex-column">
        <h3 class="card-header">${pizzaName}</h3>
        <div class="card-body flex-column col-auto">
          <h4 class="text-dark">By ${createdBy}</h4>
          <p>On ${createdAt}</p>
          <p>${commentCount} Comments</p>
          <h5 class="text-dark">Suggested Size: ${size}
          <h5 class="text-dark">Toppings</h5>
          <ul>
            ${toppings
              .map(topping => {
                return `<li>${topping}</li>`;
              })
              .join('')}
          </ul>
          <a class="btn display-block w-100 mt-auto" href="/pizza?id=${_id}">See the discussion.</a>
        </div>
      </div>
    </div>
  `;

  $pizzaList.innerHTML += pizzaCard;
};

getPizzaList();