import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
        category: "Air Purifying",
        plants: [
            { name: "Snake Plant", image: "https://images.unsplash.com/photo-1628170384186-b4845118c7ed?w=200", price: "15" },
            { name: "Spider Plant", image: "https://images.unsplash.com/photo-1596724890693-369bb9c351f7?w=200", price: "12" },
            { name: "Peace Lily", image: "https://images.unsplash.com/photo-1593691509543-c20fb7c6d628?w=200", price: "18" },
            { name: "Boston Fern", image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=200", price: "14" },
            { name: "Rubber Plant", image: "https://images.unsplash.com/photo-1629853372274-122e232dc8fa?w=200", price: "20" },
            { name: "Aloe Vera", image: "https://images.unsplash.com/photo-1596547609652-9cb5d8d736bb?w=200", price: "10" }
        ]
    },
    {
        category: "Low Light",
        plants: [
            { name: "ZZ Plant", image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=200", price: "18" },
            { name: "Pothos", image: "https://images.unsplash.com/photo-1610459520857-41fb824a7374?w=200", price: "12" },
            { name: "Cast Iron Plant", image: "https://images.unsplash.com/photo-1613145464161-0d67417e0821?w=200", price: "25" },
            { name: "Philodendron", image: "https://images.unsplash.com/photo-1611078759586-1d15db636e09?w=200", price: "16" },
            { name: "Chinese Evergreen", image: "https://images.unsplash.com/photo-1600122285148-5c400494451b?w=200", price: "22" },
            { name: "Parlor Palm", image: "https://images.unsplash.com/photo-1612453676643-d34e9105ff76?w=200", price: "15" }
        ]
    },
    {
        category: "Pet Friendly",
        plants: [
            { name: "Calathea", image: "https://images.unsplash.com/photo-1605389643442-999335f60682?w=200", price: "20" },
            { name: "Ponytail Palm", image: "https://images.unsplash.com/photo-1626084227877-3e2840cf200e?w=200", price: "24" },
            { name: "Majesty Palm", image: "https://images.unsplash.com/photo-1611078759600-e35b7e289895?w=200", price: "30" },
            { name: "Peperomia", image: "https://images.unsplash.com/photo-1600121115598-1e438df3dc15?w=200", price: "14" },
            { name: "Polka Dot Plant", image: "https://images.unsplash.com/photo-1621288258385-d8502f6bc19c?w=200", price: "10" },
            { name: "Burro's Tail", image: "https://images.unsplash.com/photo-1612454629471-ab5a42045558?w=200", price: "18" }
        ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem({ name: plant.name, image: plant.image, cost: plant.price }));
  };

  return (
    <div>
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white' }}>
        <h2>Paradise Nursery</h2>
        <div style={{ display: 'flex', gap: '15px' }}>
          <a href="/" style={{ color: 'white', textDecoration: 'none' }}>Home</a>
          <a href="/plants" style={{ color: 'white', textDecoration: 'none' }}>Plants</a>
          <a href="/cart" style={{ color: 'white', textDecoration: 'none' }}>
            🛒 Cart ({totalItems})
          </a>
        </div>
      </nav>

      <div style={{ padding: '20px' }}>
        {plantsArray.map((categoryObj, index) => (
          <div key={index}>
            <h3 style={{ textAlign: 'center', marginTop: '30px' }}>{categoryObj.category}</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
              {categoryObj.plants.map((plant, pIndex) => (
                <div key={pIndex} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', textAlign: 'center', width: '200px' }}>
                  <img src={plant.image} alt={plant.name} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                  <h4>{plant.name}</h4>
                  <p>${plant.price}</p>
                  <button 
                    onClick={() => handleAddToCart(plant)}
                    disabled={cartItems.some(item => item.name === plant.name)}
                    style={{ padding: '8px 12px', cursor: cartItems.some(item => item.name === plant.name) ? 'not-allowed' : 'pointer' }}
                  >
                    {cartItems.some(item => item.name === plant.name) ? "Added" : "Add to Cart"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;