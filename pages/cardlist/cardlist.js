Page({
     data:{
         hidden:true,
        cardlist:[],
     },
    onLoad:function(){
         wx.showToast({
            title: '手机交给法官',
            icon: 'success',
            duration: 2000,
            success:function(){
            }
        })
     },
     onReady: function() {
         var that= this;
         wx.getStorage({
            key: 'newdata',
            success: function(res) { //对数据进行重新整理，只显示被设置的角色
                 console.log("res==",res.data);
                 that.setData({
                     cardlist:res.data
                 })
            }
        });
         setTimeout(function(){},2000)

     },
     backindex:function(){ //返回首页
        var that= this;
            wx.getStorage({
                key: 'cameralist',
                success: function(res) { 
                    for(var i=0; i<res.data.length;i++){
                        wx.removeSavedFile({
                            filePath:res.data[i],
                            success: function(res) {
                                console.log(res)
                                console.log("除成功")
                                wx.redirectTo({
                                    url: '../index/index'
                                })
                            }
                        })
                    }
                }
            });

     },
     showcard:function(){
         var that= this;
         that.setData({
                hidden:false,
         })
     },
     hidecard:function(){
         var that= this;
        that.setData({
            hidden:true,
        })
     }
})