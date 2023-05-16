import pic1 from '../images/prod-1.jpg';
import pic2 from '../images/prod-2.jpg';
import rec1 from '../images/rec-1.png';
import rec2 from '../images/rec-2.png';
import rec3 from '../images/rec-3.png';
import rec4 from '../images/rec-4.png';

import delivery1 from '../images/express.svg';
import delivery2 from '../images/standart.svg';

export const getItemsRequest = async () => {
  return await new Promise(resolve =>
    setTimeout(() => {
      resolve({
        success: true,
        data: [
          {
            id: 1,
            src: pic1,
            qty: 1,
            text:
              'similar to real red soft worm bait silicone artificial bait fishy shrimp smell',
            price: 1,55
          },
          {
            id: 2,
            src: pic2,
            qty: 1,
            text: 'Smart stainless steel ring with body temperature sensor, fashionable display',
            price: 5,83
          }
        ]
      });
    }, 1500)
  );
};

export const getDeliveryMethodsRequest = async () => {
  return await new Promise(resolve => {
    setTimeout(() => {
      resolve({
        success: true,
        data: [
          {
            thumb: delivery1,
            id: 1,
            text: 'Express shipping',
            duration: '7-14 days',
            price: 50,57
          },
          {
            thumb: delivery2,
            id: 2,
            text: 'Standard shipping',
            duration: '30-45 days',
            price: 0
          }
        ]
      });
    }, 1500);
  });
};

export const getRecommendedItemsRequest = async () => {
  return await new Promise(resolve =>
    setTimeout(() => {
      resolve({
        success: true,
        data: [
          {
            src: rec1,
            price: 8,29,
            text: 'Wooden pillow in the form of a log, wooden stump texture for decoration'
          },
          {
            src: rec2,
            price: 6,22,
            text: 'Funny 3D simulation, snack bread, soft pillow in the shape of lower back'
          },
          {
            src: rec3,
            price: 12,43,
            text: '3D modeling of food shape plush pillow creative chicken sausage'
          },
          {
            src: rec4,
            price: 4,66,
            text: 'Funny Men\'s T-shirt Robert Pattinson standing Meme'
          }
        ]
      });
    }, 1500)
  );
};

const promoCodes = {
  PROMO10: 10,
  PROMO15: 15,
  PROMO20: 20,
  PROMO666: 100
};

export const applyPromoCodeRequest = async code => {
  const result = { success: true };
  if (~Object.keys(promoCodes).indexOf(code)) {
    result.discount = promoCodes[code];
  } else {
    result.success = false;
    result.discount = 0;
  }
  return await new Promise(resolve =>
    setTimeout(() => {
      resolve(result);
    }, 1500)
  );
};

export const orderCheckoutRequest = async order => {
  const result = { success: true, data: { id: Math.floor(Math.random() * 1000) + 2033 } };

  return await new Promise(resolve =>
    setTimeout(() => {
      resolve(result);
    }, 1500)
  );
};
