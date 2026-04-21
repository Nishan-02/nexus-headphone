const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mock Database
const products = [
  {
    id: 'p1',
    image: '/images/carbon.png',
    title: 'Carbon Black',
    description: 'Forged from reinforced polymers.',
    price: 299,
    features: ['Noise Cancellation', '40h Battery', 'Spatial Audio']
  },
  {
    id: 'p2',
    image: '/images/neon.png',
    title: 'Neon Pulse',
    description: 'Cyberpunk aesthetic for the night.',
    price: 349,
    features: ['RGB Lighting', 'Ultra-low Latency', 'Pro Mic']
  },
  {
    id: 'p3',
    image: '/images/studio.png',
    title: 'Studio Pure',
    description: 'Reference grade transparency.',
    price: 499,
    features: ['High-Res Audio', 'Open-back Design', 'Velour Pads']
  },
  {
    id: 'p4',
    image: '/images/ghost.png',
    title: 'Ghost White',
    description: 'Minimalism in its purest form.',
    price: 299,
    features: ['Clean Aesthetic', 'Lightweight', 'Fast Charge']
  }
];

let orders = [];

// Routes
app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

app.post('/api/orders', (req, res) => {
  const { cart, customer } = req.body;
  if (!cart || cart.length === 0) {
    return res.status(400).json({ message: 'Cart is empty' });
  }
  
  const newOrder = {
    id: `ORD-${Date.now()}`,
    cart,
    customer,
    status: 'pending',
    createdAt: new Date()
  };
  
  orders.push(newOrder);
  console.log('New Order Received:', newOrder);
  
  res.status(201).json({ 
    message: 'Order placed successfully', 
    orderId: newOrder.id 
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
