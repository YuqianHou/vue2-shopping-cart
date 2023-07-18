<template>
  <div>
    <el-input
        placeholder="请输入想找的食物"
        prefix-icon="el-icon-search"
        v-model="searchProduct"
        style="width: 50%"
        @keydown.enter = "handleSearch"
    >
    </el-input>
    <div style="margin: 20px 0 20px 0;">

<!--      分类筛选-->
<!--      <div style="margin: 0 0 20px 0;">-->
<!--        <el-tabs-->
<!--            v-model="activeTabName"-->
<!--            @tab-click="handleSelectType"-->
<!--            style="display: grid; place-items: center;"-->
<!--        >-->
<!--          <el-tab-pane label="全部" name="first"></el-tab-pane>-->
<!--          <el-tab-pane label="炒菜" name="second"></el-tab-pane>-->
<!--          <el-tab-pane label="主食" name="third"></el-tab-pane>-->
<!--          <el-tab-pane label="甜点" name="fourth"></el-tab-pane>-->
<!--        </el-tabs>-->
<!--      </div>-->
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
                style="width: 240px; margin: 20px 24px 0 24px;text-align: left; cursor:pointer;"
                @click="openDetail(p)"
            >
              <div
                  style="width: 240px; height: 240px; display: flex;justify-content: center; align-items: center;"
              >
                <el-image
                    style="width: 240px; height: 240px;"
                    :src="p.img"
                    fit="cover"
                >
                </el-image>
<!--                <img style="width: 100%" :src="p.img" class="image" >-->
              </div>
              <div style="padding: 14px;">
                <div style="display: flex; justify-content:space-between;">
                  <div style="color: cornflowerblue; font-size: 24px; font-weight: bold">¥{{p.price}}        </div>
                  <div style="color: grey; font-size: 10px; margin-top: 12px">销量 {{p.sales}}</div>
                </div>
                <div style="font-weight: bold">{{ p.title }}</div>
                <div style="color: grey; font-size: 10px">库存 {{p.inventory}}</div>

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
<!--    <div class="block">-->
<!--      <el-pagination-->
<!--          background-->
<!--          :page-size="8"-->
<!--          @current-change="handleCurrentChange"-->
<!--          :current-page="cardPage.curPage"-->
<!--          layout="prev, pager, next"-->
<!--          :total="products.length">-->
<!--      </el-pagination>-->
<!--    </div>-->
<!--    显示购物车商品总数的提示-->
    <el-badge :value="totalCount" style="position: fixed; right: 40px; bottom: 72px;">
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
import {mapState, mapActions, mapMutations, mapGetters} from "vuex";
import products from "@/store/modules/products";

export default {
    name: 'Home',
    components: {myCartDrawer:()=>import('@/components/myCartDrawer.vue')},
    computed: {
      // ...mapState('products', ['all']),
      ...mapState({products: state => state.products.all}),
      ...mapGetters('cart', ['totalCount']),

    },
        // mapState({products: state => state.products.all}),
    data() {
      return {
        searchProduct: '',
        activeTabName: 'first',
        // cardPage:{
        //   curPage:1,
        //   totalCount:9,
        //   pageSize:8,
        // },
      }
    },
    methods: {
      // 分类选择（未开发）
      handleSelectType(tab, event) {
        console.log(tab, event);
      },
      // 查看商品详情（未开发）
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
      ...mapActions('products', ['getAllProducts']),
      ...mapMutations('cart', ['addToCart']),
    },
    created() {
        // this.$store.dispatch('products/getAllProducts')
      this.getAllProducts()
    }
}
</script>

<style scoped>

</style>