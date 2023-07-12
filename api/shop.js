 // 模拟CS架构
 const _products = [
     {
         'id': 1,
         'title': '汉堡',
         'price': 20,
         'inventory': 2,
         'sales': 100,
         'img': 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
     },
     {
         'id': 2,
         'title': '螺蛳粉',
         'price': 10.99,
         'inventory': 10,
         'sales': 100,
         'img': 'https://img.zcool.cn/community/015cf45c7f8bc3a80120af9a59dc02.jpg@3000w_1l_0o_100sh.jpg',
     },
     {
         'id': 3,
         'title': '米饭',
         'price': 1.9,
         'inventory': 5,
         'sales': 100,
         'img': 'https://ts1.cn.mm.bing.net/th/id/R-C.6f37fdcc5213a4190af64f12c745fcb7?rik=3ltzmpSX%2fZcoqw&riu=http%3a%2f%2fimg.feibisi.com%2f2016%2f08%2fmifan-014.jpg&ehk=gupcEWQc%2fy17CIg74lBjMhVjhlyilqLdL9tDkSNhrao%3d&risl=&pid=ImgRaw&r=0',
     }
 ]
 export default {
     async getProducts () {
         await wait(0)
         return _products
     },

     async buyProducts (products) {
         await wait(0)
         if (
             // simulate random checkout failure.
             (Math.random() > 0.5 || navigator.webdriver)
         ) {
             return
         } else {
             throw new Error('Checkout error')
         }
     }
 }

 function wait (ms) {
     return new Promise(resolve => {
         setTimeout(resolve, ms)
     })
 }