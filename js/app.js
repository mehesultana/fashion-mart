// load Products
const loadProducts = () => {
    const url = `https://fakestoreapi.com/products`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI
const showProducts = (products) => {
    const allProducts = products.map((pd) => pd);
    for (const product of allProducts) {
        const image = product.image;
        const { rate, count } = product.rating;

        const div = document.createElement('div');
        div.classList.add('product');
        div.innerHTML = `
            <div class="card single-product  h-100 g-4">
                    <img src=${image} class="card-img-top product-image " alt="...">
                <div class="card-body ">
                <h3>${product.title.slice(0, 12)}</h3>
                <p>Category: ${product.category}</p>
                <h2>Price: $ ${product.price}</h2>
                <p>Total Rating : ${count}   </p>
                <p>Average rating: ${rate}</p>
                <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-outline-warning">add to cart</button>
                <button id="details-btn" class="btn btn-secondary ">Details</button>
                </div>
            </div>
        `;
        document.getElementById('all-products').appendChild(div);
    }
};

// add To Cart
let count = 0;
const addToCart = (id, price) => {
    count = count + 1;
    updatePrice('price', price);

    updateTaxAndCharge();
    document.getElementById('total-Products').innerText = count;
    updateTotal();
};

const getInputValue = (id) => {
    const element = document.getElementById(id).innerText;
    const converted = parseFloat(element);
    return converted;
};

// main price update function
const updatePrice = (id, value) => {
    const convertedOldPrice = getInputValue(id);
    const convertPrice = parseFloat(value);
    const total = convertedOldPrice + convertPrice;
    document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
    document.getElementById(id).innerText = Math.round(value);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
    const priceConverted = getInputValue('price');
    if (priceConverted > 0) {
        setInnerText('delivery-charge', 20);
    }
    if (priceConverted > 200) {
        setInnerText('delivery-charge', 30);
        setInnerText('total-tax', priceConverted * 0.2);
    }
    if (priceConverted > 400) {
        setInnerText('delivery-charge', 50);
        setInnerText('total-tax', priceConverted * 0.3);
    }
    if (priceConverted > 500) {
        setInnerText('delivery-charge', 60);
        setInnerText('total-tax', priceConverted * 0.4);
    }
};

//grandTotal update function
const updateTotal = () => {
    const grandTotal = getInputValue('price') + getInputValue('delivery-charge') + getInputValue('total-tax');
    document.getElementById('total').innerText = grandTotal.toFixed(2);
};
