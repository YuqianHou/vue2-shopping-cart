import shop from "../../../api/shop";
import nested from './nested'

const state = () => ({
    items:[],
    checkoutStatus: null
})

const getters = {
    cartProducts: (state, getters, rootState) => {
        return state.items.map(({ id, quantity }) => {
            const product = rootState.products.all.find(product => product.id === id)
            return {
                id: product.id,
                title: product.title,
                price: product.price,
                img: product.img,
                quantity
            }
        })
    },

    cartTotalPrice: (state, getters) => {
        return getters.cartProducts.reduce((total, product) => {
            return total + product.price * product.quantity
        }, 0)
    }
}

const actions = {
    async checkout ({ commit, state }, products) {
        const savedCartItems = [...state.items]
        commit('setCheckoutStatus', null)
        // empty cart
        commit('setCartItems', { items: [] })
        try {
            await shop.buyProducts(products)
            commit('setCheckoutStatus', 'successful')
        } catch (e) {
            console.error(e)
            commit('setCheckoutStatus', 'failed')
            // rollback to the cart saved before sending the request
            commit('setCartItems', { items: savedCartItems })
        }
    },
    addToCart ({ state, commit }, product) {
        commit('setCheckoutStatus', null)
        if (product.inventory > 0) {
            const cartItem = state.items.find(item => item.id === product.id)
            if (!cartItem) {
                commit('pushProductToCart', { id: product.id })
            } else {
                commit('increItemQuantity', cartItem)
            }
            // remove 1 item from stock
            commit('products/decreProdInventory', { id: product.id }, { root: true })
        }
    },

}

const mutations = {
    pushProductToCart (state, { id }) {
        state.items.push({
            id,
            quantity: 1
        })
    },
    increItemQuantity (state, { id }) {
        const cartItem = state.items.find(item => item.id === id)
        cartItem.quantity++
    },
    updateItemQuantity (state, { id, quantity }){
        const cartItem = state.items.find(item => item.id === id)
        if (cartItem) {
            if (quantity <= 0){
                // 删除商品
                // 使用数组的findIndex获取索引
                const index = state.items.findIndex(item => item.id === id)
                // 判断这个是不是等于-1，如果不是说明有这个商品，就执行后面的删除该元素
                // splice接收删除元素的索引，第二个元素是删除几个元素，这里写1
                index !== -1 && state.items.splice(index, 1)
                cartItem.quantity = quantity
            } else {
                cartItem.quantity = quantity
                cartItem.cartTotalPrice = quantity * cartItem.price
            }
        }
    },
    setCartItems (state, { items }) {
        state.items = items
    },

    setCheckoutStatus (state, status) {
        state.checkoutStatus = status
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
    modules: {
        nested
    }
}