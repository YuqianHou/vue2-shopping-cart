<template>
  <div>
    <el-drawer
        title="购物车"
        :visible.sync="drawer"
        :direction="direction"
        :append-to-body="true"
    >
      <template style="margin-left:auto; margin-right:auto;">
        <el-table
            :data="myCartData"
            border
            show-summary
            style="width: 90%">
          <el-table-column
              :prop=prodImg
              label="图片"
              width="100"
          >
            <template v-slot="scope">
              <img :src="scope.row.prodImg" style="width:100%;">
            </template>
          </el-table-column>
          <el-table-column
              prop="prodName"
              label="产品名">
          </el-table-column>
          <el-table-column
              prop="prodPrice"
              label="价格">
          </el-table-column>
          <el-table-column
              prop="prodNum"
              label="数量">
          </el-table-column>
          <el-table-column label="操作">
            <template v-slot="scope">
              <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-drawer>
  </div>
</template>

<script>
  export default {
    name: 'myCartDrawer',
    data() {
      return {
        drawer: false,
        direction: 'rtl',
        myCartData: [
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
        ],

      };
    },
    methods: {
      // handleClose(done) {
      //   this.$confirm('确认关闭？')
      //       .then(_ => {
      //         done();
      //       })
      //       .catch(_ => {});
      // },
      view() {
        this.drawer = true
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总价';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += ' 元';
          } else {
            sums[index] = 'N/A';
          }
        });

        return sums;
      }
    }
  }

</script>

<style scoped>

</style>