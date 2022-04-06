const express = require('express');
const inventoryRouter = express.Router();
const uuid = require('uuid');

const inventoryItems = [
  {
    id: uuid.v4(),
    name: 'banana',
    type: 'food',
    price: 200,
  },
  {
    id: uuid.v4(),
    name: 'pants',
    type: 'clothing',
    price: 2500,
  },
  {
    id: uuid.v4(),
    name: 'basket ball',
    type: 'toy',
    price: 1000,
  },
  {
    id: uuid.v4(),
    name: 'rockem sockem robots',
    type: 'toy',
    price: 1500,
  },
  {
    id: uuid.v4(),
    name: 'shirt',
    type: 'clothing',
    price: 800,
  },
  {
    id: uuid.v4(),
    name: 'soup',
    type: 'food',
    price: 300,
  },
  {
    id: uuid.v4(),
    name: 'flour',
    type: 'food',
    price: 100,
  },
];

inventoryRouter.get('/search/type', (req, res) => {
  const type = req.query.type;
  const filteredType = inventoryItems.filter((item) => item.type === type);
  res.send(filteredType);
});

inventoryRouter.get('/search/price', (req, res) => {
  const maxPrice = req.query.maxprice;
  const minPrice = req.query.minprice;
  const filteredMaxPrice = inventoryItems.filter(
    (item) => item.price <= maxPrice && item.price >= minPrice
  );
  res.send(filteredMaxPrice);
});

inventoryRouter.route('/').get((req, res) => {
  res.send(inventoryItems);
});

module.exports = inventoryRouter;
