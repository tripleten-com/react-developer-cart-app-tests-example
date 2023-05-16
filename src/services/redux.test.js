import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';
import { increaseItem, getItemsRequestAction, getItemsSuccess } from './actions'

const initStore = {
    step: 'cart',
    cart: {
      featured: [],
      postponed: [],
      items: [],
      itemsRequest: false,
      itemsFailed: false,
      recommendedItems: [],
      recommendedItemsRequest: false,
      recommendedItemsFailed: false,
      postponedItems: [],
      promoCode: '',
      promoDiscount: null,
      promoRequest: false,
      promoFailed: false,
      currentTab: 'items'
    },
    delivery: {
      deliveryMethods: [],
      deliveryMethodsRequest: false,
      deliveryMethodsFailed: false,
      selectedDeliveryId: null,
      deliveryForm: {
        name: '',
        phone: '',
        address: '',
        unitNumber: '',
        intercom: '',
        floor: ''
      }
    },
    checkout: {
      orderCheckoutFailed: false,
      order: null,
      orderCheckoutRequest: false
    }
  }

const sourceItems = [
    {
      id: 1,
      src: '/static/media/prod-1.945fea17.jpg',
      qty: 2,
      text: 'similar to real red soft worm bait silicone artificial bait fishy shrimp smell',
      price: 1,55
    },
    {
      id: 2,
      src: '/static/media/prod-2.9a2c7860.jpg',
      qty: 2,
      text: 'Smart stainless steel ring with body temperature sensor, fashionable display',
      price: 5,83
    }
  ]

const resStoreWithItems = {
    ...initStore,
    cart: {...initStore.cart, items: sourceItems}
}

const resStoreWithIncreasedItem = {
    ...initStore,
    cart: {...initStore.cart, items: [{
        id: 1,
        src: '/static/media/prod-1.945fea17.jpg',
        qty: 3,
        text: 'similar to real red soft worm bait silicone artificial bait fishy shrimp smell',
        price: 1,55
      },
      {
        id: 2,
        src: '/static/media/prod-2.9a2c7860.jpg',
        qty: 2,
        text: 'Smart stainless steel ring with body temperature sensor, fashionable display',
        price: 5,83
      }]}
}
describe('Testing actions and reducers', () => {
    const enhancer = applyMiddleware(thunk);
    const store = createStore(rootReducer, enhancer);
    it('Dispatch the action for obtaining items and compare with the desired state', async ()=>{
        const {getState} = store
        expect(getState()).toStrictEqual(initStore)
        store.dispatch(getItemsSuccess(sourceItems))
        expect(getState()).toStrictEqual(resStoreWithItems)
    })
    it('Add elements and increment the quantity by 1', ()=>{
        const {getState} = store
        store.dispatch(getItemsSuccess(sourceItems))
        expect(getState()).toStrictEqual(resStoreWithItems)
        store.dispatch(increaseItem(1))
        expect(getState()).toStrictEqual(resStoreWithIncreasedItem)
    })
})
