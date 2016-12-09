var util = require('../../utils/util.js');
var list = require('../../utils/list.js');
Page({
	data: {
		hidden:false,
		title: "人数设置",
		tips: "(请自行指点法官)",
		_number: 7, //默认人数
		player: []//角色数据,
		
	},
	// 监听slider
	setswitch:function(e){
		  	var that = this;
			var _swich = e.detail.value;
			if(_swich == true){
			   that.add(e);
			}else{
 			   that.sub(e);
			}
	},
	setnumber: function(e) {
		var that = this;
		// var defnumber = new list;
		// var n = e.detail.value;
		// defnumber.pos = n;	
		// var data = util.player(defnumber.pos)
		// defnumber.setdata(data);
		// if(n>=8){
		// 	defnumber.pos=5;
		// 	defnumber.getElement().checked = true;
		// };
        // if(n>=12 && n<=17){
		// 	defnumber.pos=6;
		// 	defnumber.getElement().checked = true;
		// };
		// that.setData({
		// 	_number: e.detail.value,
		// 	player:defnumber.dataStore
		// });
		 var n = e.detail.value;
		var data = util.player(n);
		if(n>=8){
			data[5]["checked"] = true;
		};
        if(n>=12 && n<=17){
			data[6]["checked"] = true;
		};
		that.setData({
			_number: e.detail.value,
			player:data

		});
	},
	sub:function(event){
		var that = this;	
		var name = event.target.dataset.name;//获取传递的数据名称;
		that.data.player.map(function(item){
			if(item.name ==name && item.number >=1){
				if(item.name =="狼人" && item.number == 1) return false;
				item.number--;
				that.data.player[2].number++;
				item["checked"] = false;
				item["disabled"] = false;
			};
		
				if(item["checked"] != true ){
					item["disabled"] = false;			
				}
	
			
		});
		that.setData({
			player: that.data.player
		});
		console.log(that.data.player)
	},
	add:function(event){
		var that = this;	
		var name = event.target.dataset.name;//获取传递的数据名称;
		console.log("that.data.player[2].number =",that.data.player[2].number )
		if(that.data.player[2].number ==1){	
			that.data.player.map(function(item){
				if(item.name ==name ){
					item.number++;
					item["checked"] = true;
				}
				if(item["checked"]!= true ){
					item["disabled"] = true;
					item["checked"] = false;
				}
			
			})
		};
		that.data.player.map(function(item){	
			if(item.name ==name ){
				item.number++;
				item["checked"] = true;
			}
			if(item.name =="平民" && item.number>=1){
				item.number--;
			}	
		})
		that.setData({
			player: that.data.player
		});
	},
	start:function(){
		var that = this;
		wx.setStorage({
			key:"player",
			data:that.data.player
		});
	   wx.redirectTo({
		url: '../card/card'
		})
	},
	playerset: function() {
		var that = this;
		var newhidden =that.data.hidden===true?false:true;
		that.setData({		
			hidden:newhidden
		})

	},
	onLoad: function() {
		this.setData({
			player: util.player(7)
		})
	}
})