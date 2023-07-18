 // 模拟CS架构
 const _products = [
     {
         'id': 1,
         'title': '汉堡',
         'price': 20,
         'inventory': 2,
         'sales': 100,
         'type': '主食',
         'img': 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
     },
     {
         'id': 2,
         'title': '螺蛳粉',
         'price': 10.99,
         'inventory': 10,
         'sales': 100,
         'type': '主食',
         'img': 'https://img.zcool.cn/community/016cce5cfcbf9aa801205e4b6a2fea.jpg@2o.jpg',
     },
     {
         'id': 3,
         'title': '米饭',
         'price': 1.9,
         'inventory': 5,
         'sales': 100,
         'type': '主食',
         'img': 'https://pic.ntimg.cn/20140215/9885883_230152403000_2.jpg',
     },
     {
         'id': 4,
         'title': '番茄炒蛋',
         'price': 30,
         'inventory': 5,
         'sales': 100,
         'type': '炒菜',
         'img': 'https://ts1.cn.mm.bing.net/th/id/R-C.eb915b5c41b0d15ae94f6780ad5c6224?rik=eSJBTL7T47pG2Q&riu=http%3a%2f%2fi3.meishichina.com%2fattachment%2frecipe%2f2015%2f07%2f13%2f2015071313e6c7d4588ab99b.jpg%40!p800&ehk=U2EPVfq82EOSXBIPGdv8k%2byDS1uZ8P9lgLWf0%2byjmrk%3d&risl=&pid=ImgRaw&r=0',
     },
     {
         'id': 5,
         'title': '腐乳通菜',
         'price': 1.9,
         'inventory': 5,
         'sales': 100,
         'type': '炒菜',
         'img': 'https://ts1.cn.mm.bing.net/th/id/R-C.080fdb450d746ea7a6b5eaa8096e3a8c?rik=TJySJPqApvGnDw&riu=http%3a%2f%2fi3.meishichina.com%2fattachment%2fr%2f2011%2f06%2f30%2fc240_201106301148230.jpg&ehk=hMGCp3kohRs5eUh1agYeBL6ADaBMeb3eRRuuDN2mrW8%3d&risl=&pid=ImgRaw&r=0',
     },
     {
         'id': 6,
         'title': '奶茶',
         'price': 15,
         'inventory': 5,
         'sales': 100,
         'type': '饮品',
         'img': 'https://cbu01.alicdn.com/img/ibank/2020/404/486/13303684404_1435474035.jpg',
     },
     {
         'id': 7,
         'title': '清蒸鲈鱼',
         'price': 30,
         'inventory': 5,
         'sales': 100,
         'type': '海鲜',
         'img': 'https://tse4-mm.cn.bing.net/th/id/OIP-C.tLngqKZkY3kBX75QMC3z9QHaHa?pid=ImgDet&rs=1',
     },
     {
         'id': 8,
         'title': '鸡汤',
         'price': 1.9,
         'inventory': 5,
         'sales': 100,
         'type': '汤',
         'img': 'https://tse3-mm.cn.bing.net/th/id/OIP-C.zlS2Huqioacw2qv9_2zsjwHaGa?pid=ImgDet&rs=1',
     },
     {
         'id': 9,
         'title': '拿铁',
         'price': 15,
         'inventory': 5,
         'sales': 100,
         'type': '饮品',
         'img': 'https://ts1.cn.mm.bing.net/th/id/R-C.ec27e3d6f10987f293f05ecc02bfd306?rik=moM3oLsjFVj6VA&riu=http%3a%2f%2fwww.xinmengfood.com%2fuploads%2fallimg%2f20190522%2fbe9a6b7606cc3ff6da0459893e43b7c4.jpg&ehk=oBBmJ50RSD%2bv8mxGlJz7F%2bTl%2f3uWS%2fYoWUd4k4f6NO8%3d&risl=&pid=ImgRaw&r=0',
     },
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