import {
    sel
} from '../../data/selectdata'

import {
    timer
} from '../../data/times'

const db = wx.cloud.database()

Page({
    /**
     * 页面的初始数据
     */
    data: {
        // 商品图片
        imgs: '',
        // 菜品名称
        foodname: '',
        // 下拉框的菜品选择
        selShow: false,
        // 下拉框的列表
        selData: [],
        // 选择后的商品类型
        selname: {
            name: '全部商品',
            froolId: 0,
            title: 'zero'

        },
        // 日期时间数组
        timeous: [],
        // 描述
        textareName: '',
        // 菜品价格
        foodmony: 0
    },


    onLoad: function () {
        // console.log(this.data.foodname);
        // console.log(this.data.imgs);
        // console.log(timer());
        this.setData({
            selData: sel,
            // timeous: timer(new Date().getTime())
        })

    },
    bindUpload: function (e) {
        let that = this;
        console.log(e);
        wx.chooseMedia({
            count: 1,
            mediaType: ['image'],
            sourceType: ['album', 'camera'],
            maxDuration: 30,
            camera: 'back',
            success(res) {
                // console.log(res.tempFiles[0].tempFilePath)
                // console.log(res.tempFiles.size)
                console.log(res);
                that.setData({
                    // 获取零时路劲
                    imgs: res.tempFiles[0].tempFilePath
                })
            }
        })
        if (this.data.selShow == true) {
            this.setData({
                selShow: !this.data.selShow
            })
        }
    },
    // 菜品名称
    foodinputone: function (e) {
        console.log(e.detail.value);
        let val = e.detail.value
        this.setData({
            foodname: val
        })
        if (this.data.selShow == true) {
            this.setData({
                selShow: !this.data.selShow
            })
        }
    },
    // 提交到云开发数据库
    tianjai: function (e) {


        this.setData({
            timeous: timer(new Date().getTime())
        })

        let self = this

     
        //   foodname: self.data.foodname,
        //   selname: self.data.selname,
        //   timeous: self.data.timeous,
        //   textareName: self.data.textareName,
        //   foodmony: self.data.foodmony,
        if(self.data.foodname == ''){
            wx.showToast({
                title: '请输入菜品名称',
                icon: 'none',
                duration: 2000
              })
              return
        }else if(self.data.selname.froolId == 0){
            wx.showToast({
                title: '请选择菜品类型',
                icon: 'none',
                duration: 2000
              })
              return
        }else if( self.data.textareName == ''){
            wx.showToast({
                title: '请输入菜品描述',
                icon: 'none',
                duration: 2000
              })
              return
        }else if( self.data.foodmony == ''){
            wx.showToast({
                title: '请输入菜品价格',
                icon: 'none',
                duration: 2000
              })
              return
        }


        wx.showModal({
            title: '提示',
            content: '确定提交吗',
            success: function (res) {
                if (res.confirm) { //这里是点击了确定以后
                    console.log('用户点击确定');

                    wx.showLoading({
                        title: '加载中',
                    })

                    // 生成图片
                    const time = new Date().getTime();
                    console.log(time);
                    console.log(self.data.imgs);
                    wx.cloud.uploadFile({
                        cloudPath: time + '.jpg',
                        // 临时图片路劲
                        filePath: self.data.imgs, // 文件路径
                    }).then(res => {
                        // get resource ID
                        console.log(res);
                        console.log(res.fileID)
                        // 添加数据到云数据库
                        db.collection('books').add({
                            // data 字段表示需新增的 JSON 数据
                            data: {
                                img: res.fileID,
                                foodname: self.data.foodname,
                                selname: self.data.selname,
                                timeous: self.data.timeous,
                                textareName: self.data.textareName,
                                foodmony: self.data.foodmony,
                            },
                            success: function (res) {
                                console.log(res)
                                setTimeout(function () {
                                    wx.hideLoading()
                                }, 2000)
                                self.setData({
                                    imgs:'',
                                    foodname:'',
                                    selname:{
                                        name: '全部商品',
                                        froolId: 0,
                                        title: 'zero'
                                    },
                                    textareName:'',
                                    foodmony:0
                                })
                                console.log(self.data);
                            }
                        })
                    }).catch(error => {
                        // handle error
                    })



                } else { //这里是点击了取消以后
                    console.log('您点击取消');
                }
            }
        })



    },

    // 选择类型
    caileixin: function () {

        this.setData({
            selShow: !this.data.selShow
        })
    },

    tofroo: function (e) {
        console.log(e.currentTarget.dataset.name);
        this.setData({
            selname: e.currentTarget.dataset.name,
            selShow: !this.data.selShow

        })
    },
    // 菜品描述
    textare: function (e) {
        console.log(e.detail.value);
        let val = e.detail.value
        const reg2 = /<[^>]+>/;
        if (reg2.test(val) == true) {
            console.log('您不能输入<>内容的字');

            return
        } else if (reg2.test(val) == false) {
            this.setData({
                textareName: e.detail.value
            })
        }
    },
    // 菜品价格
    CommoditypPrices: function (e) {
        console.log(e.detail.value);
        let num1 = e.detail.value;
        const reg = /^[0-9]+$/;
        // console.log(reg.lastIndex);
        // console.log(reg.test(num1));
        // console.log(reg.lastIndex);
        if (reg.test(num1)) {
            console.log('正常');
            setTimeout(function () {
                wx.hideLoading()
            }, 0)
            this.setData({
                foodmony: num1
            })
        } else {
            this.setData({
                foodmony: ''
            })
        }
    }


})