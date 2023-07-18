import shop from "../../../api/shop";
import nested from './nested'

const state = () => ({
    // 记录购物车商品数据，从本地获取购物车商品数据，如果没有初始化为空数组
    cartProducts: JSON.parse(window.localStorage.getItem('cart-products')) || [],
    checkoutStatus: null
})

const getters = {
    // cartProducts: (state, getters, rootState) => {
    //     return state.items.map(({ id, quantity }) => {
    //         const product = rootState.products.all.find(product => product.id === id)
    //         return {
    //             id: product.id,
    //             title: product.title,
    //             price: product.price,
    //             img: product.img,
    //             quantity
    //         }
    //     })
    // },
    totalCount (state) {
        // 返回数组中某个元素的和，用reduce方法
        // reduce方法接收两个参数，第一个参数是函数，第二个参数是起始数(这里从0开始)
        // 函数内部接收两个参数，第一个参数是求和变量，第二个数组的元素
        return state.cartProducts.reduce((total, product) => total + product.count, 0)
    },
    // 计算总价
    totalPrice: (state) => {
        return state.cartProducts.reduce((total, product) => {
            return total + Number(product.price)
        }, 0).toFixed(2)
    },
    // 选中商品数量
    checkedCount (state) {
        return state.cartProducts.reduce((sum, product) => {
            if (product.isChecked) {
                sum += product.count
            }
            return sum
        }, 0)
    },
    // 选中商品的价格
    checkedPrice (state) {
        return state.cartProducts.reduce((sum, product) => {
            if (product.isChecked) {
                sum += Number(product.totalPrice)
            }
            return sum
        }, 0).toFixed(2)
    }
}

const actions = {
    // async checkout ({ commit, state }, products) {
    //     const savedCartItems = [...state.items]
    //     commit('setCheckoutStatus', null)
    //     // empty cart
    //     commit('setCartItems', { items: [] })
    //     try {
    //         await shop.buyProducts(products)
    //         commit('setCheckoutStatus', 'successful')
    //     } catch (e) {
    //         console.error(e)
    //         commit('setCheckoutStatus', 'failed')
    //         // rollback to the cart saved before sending the request
    //         commit('setCartItems', { items: savedCartItems })
    //     }
    // },
}

const mutations = {
    addToCart (state, product) {
        // commit('setCheckoutStatus', null)
        if (product.inventory > 0) {
            const cartItem = state.cartProducts.find(item => item.id === product.id)
            if (!cartItem) {
                // 添加新商品
                // commit('pushProductToCart', { id: product.id })
                state.cartProducts.push({
                    ...product,
                    count: 1,
                    isChecked: true,
                    totalPrice: product.price
                })
            } else {
                // 已有商品数量+1
                // commit('increItemQuantity', cartItem)
                cartItem.count++
                cartItem.isChecked = true
                cartItem.totalPrice = (cartItem.count * cartItem.price).toFixed(2)
            }
            // remove 1 item from stock
            // commit('products/decreProdInventory', { id: product.id }, { root: true })
        }
    },
    // 更新购物车商品数量
    updateItemCount (state, { prodId, count }){
        const cartItem = state.cartProducts.find(item => item.id === prodId)
        if (cartItem) {
            cartItem.count = count
            cartItem.totalPrice = (count * cartItem.price).toFixed(2)
        }
    },
    // 删除购物车商品
    deleteCartItem (state, prodId) {
        // 删除商品
        // 使用数组的findIndex获取索引
        const index = state.cartProducts.findIndex(item => item.id === prodId)
        // 判断这个是不是等于-1，如果不是说明有这个商品，就执行后面的删除该元素
        // splice接收删除元素的索引，第二个元素是删除几个元素，这里写1
        index !== -1 && state.cartProducts.splice(index, 1)
    },
    // 改变ischecked
    // 改变所有商品
    updateAllChecked (state, checked) {
        // 给每个商品的isChecked属性为checkbox状态
        state.cartProducts.forEach(product => {
            product.isChecked = checked
        })
    },
    // 改变单个商品
    updateItemChecked (state, {checked,prodId}) {
        const cartItem = state.cartProducts.find(item => item.id === prodId)
        if (cartItem){
            cartItem.isChecked = checked
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