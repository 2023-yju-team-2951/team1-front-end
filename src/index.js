// test, is working with ESM import
import { getShoes, getShoesById } from './api/shoes';

// api fetch test
const shoes1 = await getShoes();
const shoes2 = await getShoesById(1);

// console.log test
console.log(shoes1);
console.log(shoes2);
