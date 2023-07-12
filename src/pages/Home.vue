<template>
  <div>
    <div
        style="margin: 0 0 20px 0;">
<!--      分类筛选-->
      <div style="margin: 0 0 20px 0;">
        <el-tabs
            v-model="activeTabName"
            @tab-click="handleSelectType"
            style="width: 100%;display: grid; place-items: center;"
        >
          <el-tab-pane label="全部" name="first"></el-tab-pane>
          <el-tab-pane label="炒菜" name="second"></el-tab-pane>
          <el-tab-pane label="主食" name="third"></el-tab-pane>
          <el-tab-pane label="甜点" name="fourth"></el-tab-pane>
        </el-tabs>
      </div>
<!--      商品展示卡片列表-->
      <div>
        <el-row>
          <el-col
              :span="6"
              v-for="p in products"
              :key="p.id"
              style="display: flex;justify-content: center; "
          >
            <el-card
                shadow="hover"
                :body-style="{ padding: '0px' }"
                style="width: 220px; margin: 20px 24px 0 24px;text-align: left; cursor:pointer;"
                @click="openDetail(p)"
            >
              <div style="width: 220px; height: 220px; display: flex;justify-content: center; align-items: center;">
                <img style="width: 100%" :src="p.img" class="image" >
              </div>
              <div style="padding: 14px;">
                <div>
                  <span style="color: cornflowerblue; font-size: 24px; font-weight: bold">¥{{p.price}}        </span>
                  <span style="color: grey; font-size: 10px">销量 {{p.sales}}</span>
                </div>
                <span style="font-weight: bold">{{ p.title }}</span>

                <div class="bottom clearfix">
                  <el-button
                      :disabled="!p.inventory"
                      icon="el-icon-plus"
                      circle
                      size="mini"
                      style="float: right; margin-bottom: 10px"
                      @click="addToCart(p)"
                  ></el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>

    </div>
<!--    分页-->
    <div class="block">
      <el-pagination
          background
          layout="prev, pager, next"
          :total="1000">
      </el-pagination>
    </div>
    <el-badge :value="12" style="position: fixed; right: 40px; bottom: 72px;">
      <el-button
          icon="el-icon-shopping-cart-2"
          type="primary"
          circle
          style="position: fixed; right: 40px; bottom: 40px;"
          @click="openCartDrawer"
          size="large"
      ></el-button>
    </el-badge>
    <myCartDrawer ref="myCartDrawer"/>
    <router-view></router-view>
  </div>
</template>

<script>
import {mapState, mapActions} from "vuex";
import { currency } from '../currency'

export default {
    name: 'Home',
    components: {myCartDrawer:()=>import('@/components/myCartDrawer.vue')},
    computed: mapState({
      products: state => state.products.all
    }),
    data() {
      return {
        activeTabName: 'first'
      }
    },
    methods: {
      handleSelectType(tab, event) {
        console.log(tab, event);
      },
      openDetail(p) {
        this.$router.push({
          name: 'productDetail',
          params: {
            id: p.id,
            name: p.title
          }
        })
      },
      //显示购物车抽屉
      openCartDrawer(){
        this.$refs.myCartDrawer.view()
      },
      ...mapActions('cart', ['addToCart']),
      currency
    },
    created() {
        this.$store.dispatch('products/getAllProducts')
    }
}
</script>

<style scoped>

</style>