<template>
  <div class="cart">
    <el-drawer
        title="购物车"
        :visible.sync="drawer"
        direction="rtl"
        :append-to-body="true"
        ref="drawer"
        size="50%"
    >
      <div class="drawer__content" style="margin: 0 16px 16px 16px">
        <div style="margin-left:auto; margin-right:auto; height: 540px">
          <p v-show="!cartProducts.length">
            <span>购物车空空如也，快去点菜吧！</span>
          </p>
          <el-table
              v-show="cartProducts.length"
              :data="cartProducts"
              :key="cartProducts.id"
              border
              style="width: 100%">
            <el-table-column
                label="图片"
                width="100"
            >
              <template v-slot="scope">
                <img :src="scope.row.img" alt="" style="width:100%;">
              </template>
            </el-table-column>
            <el-table-column
                prop="title"
                label="产品名">
            </el-table-column>
            <el-table-column
                prop="price"
                label="价格"
                width="64"
            >
            </el-table-column>
            <el-table-column label="数量">
<!--              <template v-slot="scope">-->
<!--                <el-button-->
<!--                    size="mini"-->
<!--                    type="danger"-->
<!--                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
<!--              </template>-->
              <template v-slot="scope">
                <el-input-number
                    size="mini"
                    v-model="scope.row.quantity"
                    @change="updateItemQuantity({
                      id: scope.row.id,
                      quantity: $event
                    })"
                    :min="0"
                    :max="cartProducts.inventory"
                    label="描述文字">
                </el-input-number>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div
            class="drawer__footer"
            style="display: flex; justify-content:space-between;"
        >
          <div class="summary">
            <span style="font-size: 16px; color: grey">合计：</span>
            <span style="color: cornflowerblue; font-size: 24px; font-weight: bold">{{total}}</span>
          </div>
          <el-button
              type="primary"
              @click="$refs.drawer.closeDrawer()"
              :loading="loading"
              style="right: 16px"
          >
            {{ loading ? '支付中 ...' : '去结算' }}
          </el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import {mapGetters, mapMutations, mapState} from 'vuex'
  export default {
    name: 'myCartDrawer',
    computed:{
      ...mapState('cart', ['cartProducts']),
      ...mapState({
        checkoutStatus: state => state.cart.checkoutStatus,
        ...mapGetters('cart', {
          // products: 'cartProducts',
          total: 'totalPrice'
        })
      })
    },
    data() {
      return {
        drawer: false,
        loading: false,
        timer: null,
        // myCartData: [
        //   {
        //     id:'001',
        //     prodName:'汉堡',
        //     prodPrice: 10,
        //     prodImg: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
        //     sales: 100,
        //     inCartCount: 2,
        //   },
        //   {
        //     id:'002',
        //     prodName:'螺蛳粉',
        //     prodPrice: 10,
        //     prodImg: 'https://img.zcool.cn/community/015cf45c7f8bc3a80120af9a59dc02.jpg@3000w_1l_0o_100sh.jpg',
        //     sales: 100,
        //     inCartCount: 1,
        //   },
        // ],
      };
    },
    methods: {
      view() {
        this.drawer = true
      },
      ...mapMutations('cart', [
          'updateItemQuantity'
      ]),
      checkout (products) {
        this.$store.dispatch('cart/checkout', products)
      },
    },

  }

</script>

<style scoped>
</style>