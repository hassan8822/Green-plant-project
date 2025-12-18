let cart = [];


const loadCategory = () =>{
    fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((json)=>displayCategory(json.categories
))
}
const displayPlants =(plants)=>{
  const plantContainer =document.getElementById("plant-container");
  plantContainer.innerHTML ="";

  for(let plant of plants){
    const div =document.createElement("div");
    div.innerHTML =`<div class="bg-white rounded-xl shadow p-4 flex flex-col">
    <img src="${plant.image}" alt="${plant.name}"
       class="h-40 bg-gray-100 rounded mb-3"/>
      
        
        
        <h3 class="font-semibold text-lg">${plant.name}</h3>
        <p class="text-gray-500 mb-2">${plant.description}</p>
        

          <div class="flex justify-between items-center mt-auto">
          <span class="text-green-700 text-xs font-medium mb-2">
          ${plant.category}
        </span>
          <span class="font-semibold">৳${plant.price}</span>
            </div>

          <button class="btn btn-active btn-sm rounded-full add-to-cart-btn primary-color text-white">ADD to Cart 
          </button>
        
          `;
          
    div.querySelector(".add-to-cart-btn").addEventListener("click", () => {
      addToCart({ id: plant.id, name: plant.name, price: plant.price });
    });
      
        
        plantContainer.appendChild(div);
  }
};
const CategoryClick =(id,btn) =>{
  document.querySelectorAll(".category-btn").forEach(b =>
    b.classList.remove("bg-green-600", "text-white")
  );

  btn.classList.add("bg-green-600", "text-white");

  loadPlantsByCategory(id);
}
const loadPlantsByCategory = (id) => {
  document.getElementById("spinner").classList.remove("hidden");

  fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then(res => res.json())
    .then(data => {
      displayPlants(data.plants);
      document.getElementById("spinner").classList.add("hidden");
    })
    .catch(err => console.error(err));
};

const addToCart = (plant) => {
  const myPlant = cart.find(item => item.id === plant.id);

  if (myPlant) {
    myPlant.quantity += 1;
  } else {
    cart.push({ ...plant, quantity: 1 });
  }

  renderCart();
};

const renderCart = () => {
  const cartList = document.getElementById("cart-list");
  const totalPrice = document.getElementById("total-price");

  cartList.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total +=item.price * item.quantity;

    const div = document.createElement("div");
    div.className = "flex justify-between items-center";

    div.innerHTML = `<div class="bg-[#DCFCE7] px-8">
      <span>${item.name}</span>
      
      <div class=" items-center gap-2">
        <span>৳${item.price * item.quantity}</span>
        <button
          class="text-black font-bold"
          onclick="removeFromCart(${item.id})">
          ×
        </button>
      </div>
      </div>
    `;

    cartList.appendChild(div);
  });

  totalPrice.innerText = total;
};


const removeFromCart = (id) => {
  cart = cart.filter(item => item.id !== id);
  renderCart();
};



const displayCategory =(categories) =>{
    const categoryContainer =document.getElementById("Category-Container");
    categoryContainer.innerHTML ="";

    for(let category of categories){
        const li =document.createElement("li");
        li.innerHTML =`<button  class="category-btn w-full text-left px-2 py-1 bg-[#DCFCE7] rounded hover:bg-[#15803D]"
        onClick ="CategoryClick(${category.id},this)">
        ${category.category_name}
        </button>`;
        categoryContainer.appendChild(li);

    }

}

loadCategory();