import shop from "../../../api/shop";
import products from "@/store/modules/products";

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

const actions = {}

const mutations = {
    addToCart (state, product) {
        if (product.inventory > 0) {
            const cartItem = state.cartProducts.find(item => item.id === product.id)
            if (!cartItem) {
                // 添加新商品
                state.cartProducts.push({
                    ...product,
                    count: 1,
                    isChecked: true,
                    totalPrice: product.price
                })
            } else if(cartItem.count >= cartItem.inventory){
                console.log(cartItem.title, '库存不足')
            } else {
                // 已有商品数量+1
                cartItem.count++
                cartItem.isChecked = true
                cartItem.totalPrice = (cartItem.count * cartItem.price).toFixed(2)
            }
        }
    },
    // 更新商品，并且更新商品数量和总价
    updateItem (state, { prodId, count }){
        const cartItem = state.cartProducts.find(item => item.id === prodId)
        if (cartItem) {
            if (count <= 0) {
                const itemIndex = state.cartProducts.findIndex(item => item.id === prodId)
                itemIndex !== -1 && state.cartProducts.splice(itemIndex, 1)
            }else if(count >= cartItem.inventory){
                console.log(cartItem.title,'库存不足')
            } else {
                cartItem.count = count
                cartItem.totalPrice = (count * cartItem.price).toFixed(2)
            }
        }
    },
    // 删除商品
    deleteCartItem (state, prodId) {
        // 使用数组的findIndex获取索引
        const itemIndex = state.cartProducts.findIndex(item => item.id === prodId)
        // 判断这个是不是等于-1，如果不是说明有这个商品，就执行后面的删除该元素
        // splice接收删除元素的索引，第二个元素是删除几个元素，这里写1
        itemIndex !== -1 && state.cartProducts.splice(itemIndex, 1)
    },
    // 改变勾选状态
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
    // 结算，库存减少，已结算的从购物车删除
    checkout (state) {
        state.cartProducts.forEach(product => {
            product.inventory -= product.count
        })
        state.cartProducts = state.cartProducts.filter(product => !product.isChecked)
        // this.$refs.drawer.closeDrawer()

    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}