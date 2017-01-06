var mypoto = require('../../utils/poto.js')
var util = require('../../utils/util.js');
var card = require('../../utils/card.js');
var _img = "http://ohcm6uzn6.bkt.clouddn.com/60a4c603918fa0ec5580f1af269759ee3c6ddb45.jpg";
Page({
   data:{
        // hidden:true, //角色图片显示/隐藏
       lock:false,  //能否生成角色
       potodata:[],//随机头像列表
       mydata:[],//重新整理角色数据
       setdata:[],//设置后的数据
       _number:1,
       imgsrc:_img,//随机头像
       card:'',
       name:''
   },
    onLoad: function() {
        let that= this;
        this.setData({
            potodata: mypoto.poto()
        });
        wx.getStorage({
            key: 'player',
            success: function(res) { //对数据进行重新整理，只显示被设置的角色
                let newdata =[];
                let _data = res.data;
                    _data.map(item => {
                        if(item.number>=1 && item.name != "法官"){
                            newdata.push(item); 
                        }
                    });

                that.setData({
                    mydata:newdata//重新整理角色数据
                })
                
            } 
        })
	},
    _setdata:[],
    animation:function(){
        var that = this;
            var animation = wx.createAnimation({
                transformOrigin: "50% 50%",
                duration: 1000,
                height:125,
                width:125,
                timingFunction: "ease",
                delay: 0
            });
             animation.opacity(1).rotate(360).scale(1.4, 1.4).step();
            that.setData({
                animationData:animation.export()     
            });
            setTimeout(function(){  //1500毫秒后恢复默认头像
                animation.rotate(0).scale(0.4, 0.4).opacity(0).step({ duration: 500 })
                that.setData({
                     animationData:animation.export()
                });
            },2000);
    },
    look:function(){
        var that = this;
        if(that.data.lock == false){ //没有设置头像tips;
            wx.showToast({
            title: '请设置头像',
            icon: 'success',
            duration: 2000,
            animationData:{}
            })
        }else{
            that.setData({  
                lock:false
            }) 
            //如果头像图片被使用了，就在图片列表中删除
            for(var i=0; i<that.data.potodata.length;i++){
                if(that.data.potodata[i].src == that.data.imgsrc){
                    that.data.potodata.splice(i,1);
                }
            }
            var _card,_name;
            var len = that.data.mydata.length; //重新整理角色数据的长度
            var index = Math.floor(Math.random()*len);
            var oneplayer = that.data.mydata[index];//随机分配角色

                if(oneplayer.number==1){
                    _name = oneplayer.name;
                    _card = that.getcard(_name); //如果数据角色名称和角色图片列表名称一致，返回角色图片链接;
                    that.setData({
                        name:_name, //显示角色名称
                        card:_card, //设置角色图片
                        hidden:false
                    });

                    setTimeout(function(){  //1500毫秒后恢复默认头像
                        that.setData({
                            imgsrc:_img,
                            _number:that.data._number+1
                        });
                    },2000);
                    that.animation();

                    var newinfo ={id:that.data._number,poto:that.data.imgsrc,name:_name,card:_card};
                    that._setdata.push(newinfo);
                    that.data.mydata.splice(index,1); 
                    if(that.data.mydata.length == 0){ //最后跳页
                        wx.setStorage({
                            key:"cameralist",
                            data:that.cameralist, //把组合后新的数据写入缓存，跳页后调用。
                            success:function(){
                                console.log("ok")
                            }
                        });

                    setTimeout(function(){
                        wx.setStorage({
                            key:"newdata",
                            data:that._setdata, //把组合后新的数据写入缓存，跳页后调用。
                            success:function(){
                                wx.redirectTo({
                                    url: '../cardlist/cardlist'
                                })
                            }
                        });
                    },3000)
            
                    };
                };
                if(oneplayer.number > 1){
                    oneplayer.number--;
                    _name = oneplayer.name;
                    _card = that.getcard(_name); //如果数据角色名称和角色图片列表名称一致，返回角色图片链接;
                    that.setData({
                        name:_name,//显示角色名称
                        card:_card, //设置角色图片.
                         hidden:false
                    });
                    setTimeout(function(){
                        that.setData({
                            hidden:true,
                            imgsrc:_img,
                            _number:that.data._number+1
                        });
                    },1500)
                     that.animation();
                    var newinfo ={id:that.data._number,poto:that.data.imgsrc,name:_name,card:_card}
                    that._setdata.push(newinfo);
                 
                }
                
        }

    },
    getcard:function(name){  //获取牌面
      
        var _src;
        var len = card.poto().length;

        for(var i = 0; i<len; i++){
            if(name == card.poto()[i].name){
                _src =card.poto()[i].src;
               
            }
        };
        return _src;
    },
    cameralist:[],
    poto:function(){
        var that= this;
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                var tempFilePaths = res.tempFilePaths[0];
                that.cameralist.push(tempFilePaths);        
                that.setData({
                        imgsrc:tempFilePaths,
                        lock:true
                });

            }
        })
    },
    myimg:function(){
            var that = this;
            var len = that.data.potodata.length;
            var index = Math.floor(Math.random()*len);
            var src = that.data.potodata[index].src;
             that.setData({
                imgsrc:src,
                lock:true
             });
            //  that.data.potodata.splice(index,1);
             
    }
})