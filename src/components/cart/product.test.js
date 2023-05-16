import { cleanup } from '@testing-library/react';
import React, {useState} from 'react';
import renderer from 'react-test-renderer'
import { Product } from './product';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from '../../services/reducers';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';


afterEach(cleanup);

const productProps = {
  src: '',
  id: '1',
  text: '222',
  qty: 1,
  price: 123
}

const ProductTestComponent = () => {
  const [localQty, setLocalQty] = useState(1);
  const increase = ()=>setLocalQty(localQty + 1);
  const decrease = ()=>setLocalQty(localQty - 1);
  const combinedProps = {
    ...productProps,
    qty: localQty,
    increase,
    decrease
  }
  return <Product {...combinedProps}/>
}

it('should render and Match Snapshot', () => {
  const ProductComponent = renderer.create(<Product {...productProps}/>);
  expect(ProductComponent).toMatchSnapshot();
});

describe('Testing whether the quantity of items changed', () => {
  it('Checking the quantity and the total', async ()=>{
  const {getByTestId} = render(
    <ProductTestComponent />,
  );
  const increaseFirst = getByTestId('increase-1')
  expect(increaseFirst).toBeTruthy()
  const decreaseFirst = getByTestId('decrease-1')
  expect(decreaseFirst).toBeTruthy()
  const productAmount = getByTestId('product-amount-1');
  expect(productAmount).toBeTruthy()
  const productFinalPrice = getByTestId('price-amount-1');
  expect(productFinalPrice).toBeTruthy()
  // Test if '+' is a button
  expect(increaseFirst.tagName).toBe('BUTTON')
  // Check the base amount
  expect(productFinalPrice).toHaveTextContent('123')
  // Check the base quantity of items
  expect(productAmount).toHaveTextContent('1')
  // Click on increase
  await fireEvent.click(increaseFirst);
  // Test if the quantity changed
  expect(productAmount).toHaveTextContent('2')
  // Test if the total changed
  expect(productFinalPrice).toHaveTextContent(2*123)
  // Decrease the quantity of items
  await fireEvent.click(decreaseFirst);
  // Test if the quantity changed
  expect(productAmount).toHaveTextContent('1')
  // Check the base amount
  expect(productFinalPrice).toHaveTextContent('123')
  expect(productFinalPrice).not.toHaveTextContent(2*123)
})
})
