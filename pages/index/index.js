//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    werewolf: {
      title:"Werewolf"
    }
  },
  gameinfor:function(){
    wx.navigateTo({
	  	url: '../about/about'
		})
  },
  creatroom:function(){
     wx.navigateTo({
       url:'../room/room'
     })
  }
})
