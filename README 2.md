# test-matching-route
Test a location against a list of possible routes. This is a simple way to test routes.

## Example

This works for both socket servers and clients
```javascript
// SERVER CODE
import { findMatchingRoutePath, } from 'test-matching-route';

const routesObject = {
  '/collections/:collection/products/:product': { page:'data1', },
  '/products/:product': { page:'data2',  },
  '/somedata/:collection/products/:id': { page:'data3', },
  '/:product': { page:'data4',  },
  '/:id': { page:'data5', },
};
const routesArray = ['/collections/:collection/products/:product',  '/products/:product',  '/somedata/:collection/products/:id',  '/:product',  '/:id',];

findMatchingRoutePath(routesObject, '/products/cool-shoes'); // => '/products/:product'
findMatchingRoutePath(routesArray, '/collections/luxury/products/fancy-watch'); // => '/collections/:collection/products/:product'
```
