//index.js
const app = getApp()

const regeneratorRuntime = require('../../lib/regenerator-runtime/runtime.js')

Page({
  data: {
    isClose:true, //判断当前页面是打开还是返回页
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    list: [],
    sentence: {},
    page: 2,
    num: 5,
    loading: false,
    isOver: false,
  },

  onLoad: function() {
    // this.getSentence()
    this.getList()
  },

  async getSentence() {
    let sentencePage = await this.asyncGetSentencePage()
    let res = await this.asyncGetSentence(sentencePage)
    let {_id, paragraphs, dynasty, title, author} = res.data[0]
    let content = paragraphs.join(' ')

    this.setData({
      sentence: {
        _id,
        content,
        dynasty,
        title,
        author
      },
    })
  },

  asyncGetSentence(page) {
    return new Promise((resolve, reject) => {
      wx.cloud.callFunction({
        name: 'collection_get',
        data: {
          database: 'gushici',
          page: 1,
          num: 1,
          condition: {}
        },
      }).then(res => {
        wx.hideLoading()
        resolve(res.result)
      }).catch(err=>{
        reject(err)
      })
    })
  },

  asyncGetSentencePage() {
    return new Promise((resolve, reject) => {
      wx.cloud.callFunction({
        name: 'collection_get',
        data: {
          database: 'gushici_data',
          page: 1,
          num: 1,
          condition: {
            type: 'setencePage'
          }
        },
      }).then(res => {
          let pageNum = res.result.data[0].pageNum
          resolve(pageNum)
        })
        .catch(err=>{
          reject(err)
        })
    })

  },


  lower(e) {
    if (!this.data.loading) {
      this.getList()
    }
  },

  getList () {
    if (!this.data.isOver) {
      let {list, page, num} = this.data
      let that = this
      this.setData({
        loading: true
      })
      wx.cloud.callFunction({
        name: 'collection_get',
        data: {
          database: 'gushici',
          page,
          num,
          condition: {}
        },
      }).then(res => {
          if(!res.result.data.length) {
            that.setData({
              loading: false,
              isOver: true
            })
          } else {
            let res_data = res.result.data
            list.push(...res_data)
            that.setData({
              list,
              page: page + 1,
              loading: false
            })
          }
        })
        .catch(console.error)
    }
  },

  goDetail (e) {
    let _id = e.currentTarget.dataset.id
    wx.cloud.callFunction({
      name: 'collection_update',
      data: {
        id: _id
      },
    }).then(res => {
        this.setData({
          isClose: false
        })
        wx.navigateTo({
          url: `/pages/detail/detail?id=${e.currentTarget.dataset.id}`,
        })
      })
      .catch(console.error)
  },

  onShareAppMessage(res) {
    return {
      title: '一起欣赏诗词之美',
      path: `pages/index/index`
    }
  },


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('onHide')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

    console.log('onUnload')
  },

})