import { USER_STATE_CHANGE, GET_PRODUCTS, DECREASE, INCREASE, REMOVE, GET_TOTALS, ADD_ITEM_TO_CART } from '../reducer/constants';
import firebase from 'firebase';

export function fetchUser() {
    console.log('FETCH USER')
    return ((dispatch) => {
        firebase.firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then((snapshot) => {
                // console.log(firebase.auth().currentUser.uid)
                // console.log(snapshot.data())
                if (snapshot.exists) {
                    dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() })
                }
                else {
                    console.log('user does not exist')
                }
            })
    })
}


export function fetchProducts() {
    // console.log('FETCH PRODUCTS')
    return ((dispatch) => {
        firebase.firestore()
            .collection("products")
            .get()
            .then((querySnapshot) => {
                let products = [];
                querySnapshot.forEach(doc => products.push(doc.data()))
                // console.log(products)
                // if (querySnapshot) {

                dispatch({
                    type: GET_PRODUCTS, products
                })
                // }
                // else {
                //     console.log('user does not exist')
                // }
            })
        // .catch((error) => {
        //     console.log(error)
        // })
    })
}

export const increase = (id) => {
    return ((dispatch) => {
        dispatch({
            type: INCREASE,
            payload: { id: id }
        })
    })
}

export const decrease = (id) => {
    return ((dispatch) => {
        dispatch({
            type: DECREASE,
            payload: { id: id }
        })
    })
}

export const remove = (id) => {
    // console.log(id)
    return ((dispatch) => {
        // console.log(id)
        dispatch({
            type: REMOVE,
            payload: { id: id }
        })
    })
}

export const getTotals = (items, price) => {
    console.log('get totals')
    return ((dispatch) => {
        dispatch({
            type: GET_TOTALS,
            payload: {
                items: items,
                price: price
            }
        })
    })
}

export const addItemToCart = (product) => {
    console.log(product)
    return ((dispatch) => {
        dispatch({
            type: ADD_ITEM_TO_CART,
            payload:
            {
                id: product.id,
                name: product.name,
                img: product.img,
                price: product.price,
                amount: 1,
            }
        })
    })
}