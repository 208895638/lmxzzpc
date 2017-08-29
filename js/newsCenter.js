$(function(){
	var newsCenter={
		init:function(){			
			this.bindEvent();
		},
		bindEvent:function(){
			var that=this;
			//android ios划上去效果
			$(".phone a").hover(function(){
				$(this).find("img").addClass("hide").eq(1).removeClass("hide");
			},function(){
				$(this).find("img").addClass("hide").eq(0).removeClass("hide");
			});
			$(".top ul li").on("click",function(){
				var i=$(this).index();
				$(this).find("a").addClass("newsTitleOn").parent().siblings().find('a').removeClass("newsTitleOn");
				$(".infos .info").eq(i).show().siblings().hide();
			})
		},
		render:function(){
		}
	};
	newsCenter.init();
})