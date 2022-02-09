

let initialState = {
    products: [

    ],
    cart: {
        products: [
            // {
            //     id: 1,
            //     name: 'stolik kawowy',
            //     img: 'https://meblowa1.pl/1676-large_default/okragly-nowoczesny-stolik-kawowy-diament-czarny.jpg',
            //     price: 1230,
            //     amount: 1,
            // },
            // {
            //     id: 2,
            //     name: 'stolik czarny',
            //     img: "https://a.allegroimg.com/original/038030/4e128be0469db48ff02ea169cb2a/PIKO-LAWA-STOLIK-KAWOWY-LOFT-RETRO-INDUSTRIALNY",
            //     price: 890,
            //     amount: 2,
            // }
        ],
        items: 0,
        price: 0,
        delivery: 32,
    }
}

function productsReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_PRODUCTS':
            // console.log(...action.products)
            return {
                ...state,
                products: action.products
            }
        case 'ADD_ITEM_TO_CART':
            // console.log(state.cart.products)
            let item = state.products.find(item => item.id === action.payload.id);
            let inCartItem = state.cart.products.find((item) => item.id === action.payload.id ? true : false);
            // console.log(item)
            // console.log(inCartItem)
            return {
                ...state,
                cart: {
                    ...state.cart,
                    products: inCartItem ? state.cart.products.map(
                        item => item.id === action.payload.id ?
                            { ...item, amount: item.amount + 1 } :
                            item) : [...state.cart.products, { ...item, amount: 1 }],
                    items: state.cart.items + 1,
                }
            }
        case 'INCREASE':
            let increasedAmount = state.cart.products.map(item => {
                if (item.id === action.payload.id) {
                    item = { ...item, amount: item.amount + 1 }
                }
                return item;
            })
            return {
                ...state,
                cart: {
                    ...state.cart,
                    items: state.cart.items + 1,
                    products: increasedAmount
                }
            }
        case 'DECREASE':
            let decreasedAmount = state.cart.products.map(item => {
                if (item.id === action.payload.id) {
                    // console.log(item)
                    item = { ...item, amount: item.amount - 1 }
                }
                return item;
            })
            // console.log(decreasedAmount)
            return {
                ...state,
                cart: {
                    ...state.cart,
                    items: state.cart.items - 1,
                    products: decreasedAmount
                }
            }
        case 'REMOVE':
            return {
                ...state,
                cart: {
                    ...state.cart,
                    products: state.cart.products.filter(item => item.id !== action.payload.id),
                }
            }
        case 'CLEAR_CART':
            return {
                ...state,
                cart: {
                    ...state.cart,
                    products: [],
                    items: 0,
                    price: 0,
                }
            }
        case 'GET_TOTALS':
            return {
                ...state,
                cart: {
                    ...state.cart,
                    price: 121,
                }
            }
        default:
            return state
    }
}

export default productsReducer;