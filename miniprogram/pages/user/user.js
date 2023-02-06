Page({

  /**
   * 页面的初始数据
   */
  data: {
    category: [{
        id: "66",
        parentId: "1006",
        img: "/images/iconone.png",
        name: '待付款',
        title:'daifukuan',

        num: 0,

      },
      {
        id: "77",
        parentId: "1007",
        img: "/images/icontwo.png",
        name: '已付款',
        title:'yifukuan',

        num: 1

      },
      {
        id: "88",
        parentId: "1008",
        img: "/images/iconthree.png",
        name: '全部订单',
        title:'qunbudindan',

        num: 3

      }
    ],
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    logged: false,
    nickName:'用户名称',
    avatarUrl:'',
    xinxi:{}


  },
  goDetail: function (e) {
    wx.navigateTo({
      url: `/pages/detail/detail?id=${e.currentTarget.dataset.id}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  // 跳转到添加菜品的地方
  tiaoCaiPin: function (e) {
    console.log(e);
    wx.navigateTo({
      url: "/pages/userContent/merchantsMenu/merchantsMenu",
    }).then(item => {
      console.log(item);
    })

  },

  onLoad: function () {
    // 查看是否授权
    // wx.getSetting({
    //   success(res) {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称
    //       wx.getUserInfo({
    //         success: function (res) {
    //           console.log(res);
    //         }
    //       })
    //     }
    //   }
    // })



  },

  onGetUserInfo: function (e) {
    let that = this
    console.log(222);
    // console.log(e);
    wx.getUserProfile({
        desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          console.log(res)
        this.setData({
            logged: true,
            // avatarUrl: e.detail.userInfo.avatarUrl,
            // username: e.detail.userInfo.nickName,
            xinxi:res.userInfo,
          })
        }
      })
  },
  shiyontiaokuan:function(){
    wx.navigateTo({
      url: '/pages/userContent/shiyontiaokuan/shiyontiaokuan',
    })
  },
  // tiaozhuan: function (e) {
  //     wx.navigateTo({
  //         url: '/pages/tiao/tiao',
  //       })
  // },
  phone: function (e) {
    wx.makePhoneCall({
      phoneNumber: '1111',
    })
  },
  gotudd: function (e) {
    console.log(e);
    let num = e.currentTarget.dataset.num;
    let title = e.currentTarget.dataset.title;
    console.log(num,title);
    wx.navigateTo({
      url: '/pages/userContent/everydingdan/everydingdan?num='+num+'&title='+title,
    })
  }
})