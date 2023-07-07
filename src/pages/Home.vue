<template>
  <div>
    <div
        style="margin: 0 0 20px 24px; background-color: skyblue; display: grid; place-items: center;"
    >
      <el-tabs
          v-model="activeTabName"
          @tab-click="handleSelectType"
          style="width: 70%;"
      >
        <el-tab-pane label="全部" name="first"></el-tab-pane>
        <el-tab-pane label="炒菜" name="second"></el-tab-pane>
        <el-tab-pane label="主食" name="third"></el-tab-pane>
        <el-tab-pane label="甜点" name="fourth"></el-tab-pane>
      </el-tabs>
      <div>
        <el-row>
          <el-col
              :span="4"
              v-for="p in productList"
              :key="p.id"
              :offset="1"
              style="width: 220px;display: flex;justify-content: center;">
            <div style="margin-top:15px;">
              <el-card
                  shadow="hover"
                  :body-style="{ padding: '0px' }"
                  style="width: 220px; text-align: left; cursor:pointer"
                  @click="openDetail(p)"
              >
                <div style="width: 220px; height: 220px; display: flex;justify-content: center; align-items: center;">
                  <img style="width: 100%" :src=p.prodImg class="image" >
                </div>
                <div style="padding: 14px;">
                  <div>
                    <span style="color: red; font-size: 24px; font-weight: bold">¥{{p.prodPrice}}</span>
                    <span style="color: grey; font-size: 10px">销量 {{p.sales}}</span>
                  </div>
                  <span style="font-weight: bold">{{ p.prodName }}</span>

                  <div class="bottom clearfix">
                    <el-button
                        icon="el-icon-plus"
                        circle
                        size="mini"
                        style="float: right; margin-bottom: 10px"
                    ></el-button>
                  </div>
                </div>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </div>

    </div>
    <div class="block">
      <el-pagination
          background
          layout="prev, pager, next"
          :total="1000">
      </el-pagination>
    </div>

    <el-button
        icon="el-icon-shopping-cart-2"
        type="primary"
        circle
        style="float: right; margin-bottom: 10px;"
    ></el-button>
    <myCartDrawer ref="myCartDrawer" @addScene="addScene"/>
    <router-view></router-view>

  </div>
</template>

<script>
  export default {
    name: 'Home',
    components: {myCartDrawer:()=>import('@/components/myCart.vue')},
    data() {
      return {
        productList:[
          {
            id:'001',
            prodName:'汉堡',
            prodPrice: 10,
            prodImg: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
            sales: 100,
            isInCart: false,
          },
          {
            id:'002',
            prodName:'螺蛳粉',
            prodPrice: 10,
            prodImg: 'https://img.zcool.cn/community/015cf45c7f8bc3a80120af9a59dc02.jpg@3000w_1l_0o_100sh.jpg',
            sales: 100,
            isInCart: false,
          },
          {
            id:'003',
            prodName:'米饭',
            prodPrice: 10,
            prodImg: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
            sales: 100,
            isInCart: false,
          },
          {
            id:'004',
            prodName:'米饭',
            prodPrice: 10,
            prodImg: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
            sales: 100,
            isInCart: false,
          },
          {
            id:'005',
            prodName:'米饭',
            prodPrice: 10,
            prodImg: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
            sales: 100,
            isInCart: false,
          },
          {
            id:'006',
            prodName:'米饭',
            prodPrice: 10,
            prodImg: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
            sales: 100,
            isInCart: false,
          },
          {
            id:'007',
            prodName:'米饭',
            prodPrice: 10,
            prodImg: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
            sales: 100,
            isInCart: false,
          },
        ],
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
            name: p.prodName
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>