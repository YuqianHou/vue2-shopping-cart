import Vue from 'vue'
import Vuex from 'vuex'
import cart from './modules/cart'
import products from './modules/products'

Vue.use(Vuex)

// 本地存储
const myPlugin = store => {
    store.subscribe((mutation, state) => {
        // mutation 的格式为 { type, payload }
        // type里面的格式是cart/cartProducts
        // state 的格式为 { cart, products }
        if (mutation.type.startsWith('cart/')) {
            // 本地存储cartProducts
            window.localStorage.setItem('cart-products', JSON.stringify(state.cart.cartProducts))
        }
    })
}

export default new Vuex.Store({
    modules: {
        cart,
        products
    },
    plugins: [myPlugin]
})