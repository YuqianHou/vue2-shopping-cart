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
              style="width: 100%;"
              max-height="500px"
          >
            <el-table-column width="55">
              <template v-slot:header>
                <el-checkbox size="mini" v-model="checkedAll"></el-checkbox>
              </template>
              <template v-slot="scope">
                <el-checkbox
                    size="mini"
                    :value="scope.row.isChecked"
                    @change="updateItemChecked({
                      prodId: scope.row.id,
                      checked: $event
                    })"
                ></el-checkbox>
              </template>
            </el-table-column>
<!--            问题：用selection如何实现-->
<!--            <el-table-column-->
<!--                type="selection"-->
<!--                width="55"-->
<!--                :value="cartProducts.isChecked"-->
<!--            >-->
<!--            </el-table-column>-->
            <el-table-column
                label="图片"
                width="100"
            >
              <template v-slot="scope">
                <el-image
                    style="width:100%;"
                    :src="scope.row.img"
                    fit="cover"
                >
                </el-image>
<!--                <img :src="scope.row.img" alt="" style="width:100%;">-->
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
              <template v-slot="scope">
                <el-input-number
                    size="mini"
                    :value="scope.row.count"
                    @change="updateItem({
                      prodId: scope.row.id,
                      count: $event
                    })"
                    :min="1"
                    :max="cartProducts.inventory">
                </el-input-number>
              </template>
            </el-table-column>
            <el-table-column label="数量">
              <template v-slot="scope">
                <el-button
                    size="mini"
                    type="danger"
                    @click="deleteCartItem(scope.row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div
            class="drawer__footer"
            style="display: flex; justify-content:space-between;"
        >
          <div class="summary">
<!--            <span style="font-size: 16px; color: grey">合计：</span>-->
<!--            <span style="color: cornflowerblue; font-size: 24px; font-weight: bold">{{total}}</span>-->
            <p>已选 <span>{{ checkedCount }}</span> 件商品，合计：<span style="color: cornflowerblue; font-size: 24px; font-weight: bold">¥{{ checkedPrice }}</span></p>
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
      ...mapGetters('cart', ['checkedCount', 'checkedPrice']),
      // 父checkbox的状态，因为有get和set所以直接写成对象形式
      checkedAll: {
        // 返回当前购物车的商品是否都是选中状态，如果有一个没有选中直接返回false
        get () {
          return this.cartProducts.every(product => product.isChecked)
        },
        // 状态改变的时候触发的方法，需要一个参数，checkbox的状态
        set (value) {
          this.updateAllChecked(value)
        }
      },
      // ...mapState({
      //   checkoutStatus: state => state.cart.checkoutStatus,
      // })
    },
    data() {
      return {
        drawer: false,
        loading: false,
        timer: null,
      };
    },
    methods: {
      view() {
        this.drawer = true
      },
      ...mapMutations('cart', [
        'updateItem',
        'updateAllChecked',
        'updateItemChecked',
        'deleteCartItem'
      ]),
      // checkout (products) {
      //   this.$store.dispatch('cart/checkout', products)
      // },
    },

  }

</script>

<style scoped>
</style>