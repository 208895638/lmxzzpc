$(function(){
	var activity={
		init:function(){
			this.bindEvent();
		},
		bindEvent:function(){
			//ios android按钮滑动特效
			$(".common").hover(function(){
				$(".iosActive").removeClass("hide").siblings().addClass("hide");
			},function(){
				$(".iosActive").addClass("hide").siblings().removeClass("hide");
			});
			$(".commons").hover(function(){
				$(".andActive").removeClass("hide").siblings().addClass("hide");
			},function(){
				$(".andActive").addClass("hide").siblings().removeClass("hide");
			});
			//进入官网特效
			$(".info h3 img").hover(function(){
				$(".gwActive").removeClass("hide").siblings().addClass("hide");
			},function(){
				$(".gwActive").addClass("hide").siblings().removeClass("hide");
			})
		},
		render:function(){
			var that=this;
			
		}
	};
	activity.init();
})