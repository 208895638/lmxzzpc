$(function(){
	var index={
		i:1,//定义ul
		j:0,//定义.box
		init:function(){
			
			this.bindEvent();
			this.render();
		},
		bindEvent:function(){
			var that=this;
			//顶部nav点击变色and运动到相应的位置
			$(".topBar li a").on("click",function(){
				$(this).find("h4").addClass("on").parents().siblings().find("h4").removeClass("on");
				var k=$(this).parents().index();
				if(k==1){
					var top=$(".banner").offset().top;
					$("body").animate({"scrollTop":top});
				};
				if(k==2){
					var top=$(".roles").offset().top;
					$("body").animate({"scrollTop":top});
				};
				if(k==3){
					var top=$(".part3").offset().top;
					$("body").animate({"scrollTop":top});
				}
			});
			//点击新闻中心切换对应的颜色
			$(".info .title li").on("click","a",function(){
				$(this).addClass("active").parent().siblings().find("a").removeClass("active");
			})
			/***************************************************************/
			//重新定位li
			for(var m=0;m<$('.boxs ul li').length;m++){
				$('.boxs ul li').eq(m).css({"left":m*114});
			};
			//点击切换觉醒和未觉醒
			$(".con").on("click",".pagination span",function(){
				var i=$(this).index();
				$(this).addClass("roleActive").siblings().removeClass("roleActive");
				$(this).parent().siblings().find("img").eq(i).show().siblings().hide();
				
			});
			//点击塔防 对战切换
			$(".con").on("click",".page li",function(){
				var pageIndex=$(this).index();
				$(this).addClass("pageOn").siblings().removeClass("pageOn");
				$(this).parent().siblings().find(".common").addClass("hide").eq(pageIndex).removeClass("hide");//这个是塔防 对战的切换
				$(this).parents(".skill").siblings().find("ul").addClass("hide").eq(pageIndex).removeClass("hide");//这个是下面图标的切换
			});
			//点击技能小图标切换对应的说明
			$(".con").on("click",".skills li",function(){
				$(this).addClass("liOn").siblings().removeClass("liOn");
				var ulIndex=$(this).parent().index();
//				console.log(ulIndex)
				var liIndex=$(this).index();
				if(ulIndex==0){
					$(this).parents(".skills").siblings().find(".common").addClass("hide");
					$(this).parents(".skills").siblings().find(".tafang").removeClass("hide").find(".perSkill").eq(liIndex).removeClass("hide").siblings().addClass("hide");
				}else{
					$(this).parents(".skills").siblings().find(".common").addClass("hide");
					$(this).parents(".skills").siblings().find(".duizhan").removeClass("hide").find(".perSkill").eq(liIndex).removeClass("hide").siblings().addClass("hide");
				}
				
			});
			//获取角色的个数
			
			//第二栏角色详情
			$(".next").on("click",function(){//点击next切换下一个
                var left=$('.box').position().left;//获取遮罩框距离定位上的父级
				var w=76+3+3+16+16;//img的宽度加border加margin
				var ulL=$(".boxs ul").position().left;//获取ul定位上的父级	
				var length=$(".con").find(".perRoles").length;
				
				if(left>=w*7){//当box运动到第八个头像时就停止
					
					
					if(that.i>=length){
						that.i=length;//到最右边的时候初始化
						alert("没有更多了");
						
					}else{
						that.i++;
//						console.log(that.i)
						$('.boxs ul').stop().animate({"left":-(that.i-8)*w});
						$(".perRoles").eq(that.i-1).show().siblings().hide();
					}
					
				}else{
					if(that.j>=7){
						
					}else{
						that.i++;
						that.j++;
						$('.box').stop().animate({"left":(that.j)*w});
						$(".perRoles").eq(that.i-1).show().siblings().hide();
						
//						console.log(that.i,left,that.j)
					}					
				};								
			});
			$(".prev").on("click",function(){//点击切换上一个
            	var left=$('.box').position().left;//获取遮罩框距离定位上的父级
				var w=76+3+3+16+16;//img的宽度加border加margin
				var ulL=$(".boxs ul").position().left;//获取ul定位上的父级
				
				if(left<=0){//当.box运动到左边时停止
					if(that.i<=1){
						alert("亲！没有更多了哦")
					}else{						
							that.i--;
//							console.log(that.i)
							$('.boxs ul').stop().animate({"left":-(that.i-1)*w});
							$(".perRoles").eq(that.i-1).show().siblings().hide();	
					}								
				}else{
					
					if(that.j<=0){
						
					}else{
						that.j--;				
						$('.box').stop().animate({"left":(that.j)*w});	
						
						that.i--;
						$(".perRoles").eq(that.i-1).show().siblings().hide();
//						console.log(that.i,left,that.j)
					}
					
				}	
			});
			//角色头像点击跳转到对应的信息
			$(".boxs ul").on("click","li",function(){	
				var w=76+3+3+16+16;//img的宽度加border加margin
				var liIndex=$(this).index()+1;
				that.i=liIndex;					
//				console.log(that.i,that.j);
				var ul1=parseInt($(".boxs ul").position().left);
				var liL=parseInt($(this).attr("style").split(":")[1].split("px")[0]);
				that.j=(ul1+liL)/114;
//				console.log(that.i,that.j)
				$(".perRoles").eq(that.i).fadeIn().siblings().fadeOut();				
				var left1=parseInt($(this).position().left);
				var boxLeft=ul1+left1;
				$('.box').stop().animate({"left":boxLeft});
				$(".perRoles").eq(that.i-1).show().siblings().hide();
			})
			/*****************************************************************/
			//游戏特色效果
			$(".part3 .info ul li").hover(function(){
				$(this).siblings().stop().animate({"width":"138px"});
				$(this).find("h5").stop().animate({"opacity":"0","filter":"alpha(opacity=0)"}).parent().siblings().find("h5").stop().animate({"opacity":"0.5","filter":"alpha(opacity=500)"});
				$(this).stop().animate({"width":"524px"});
			},function(){
			})
		},
		render:function(){
			var that=this;
			$.ajax({
				url:"info.json",
				type:'get',
                dataType: "json",
                success:function(res){
//              	console.log(res.length);
                	var str='';
                	var juexing="",dian="",roles="",bot="";//分别对应任务是否觉醒、他对应的小点、top上面的塔防对战、下面的角色小头像
                	for(var k=0;k<res.length;k++){
                		var juexing="";
                		if(res[k].roles[4].juexing.length==1){
                			juexing='<img src="'+res[k].roles[4].juexing[0].img+'" class=""/>'   
                			dian='<span class="roleActive"></span>'
                		}else{
                			juexing+='<img src="'+res[k].roles[4].juexing[0].img+'" class=""/>'
                					+'<img src="'+res[k].roles[4].juexing[1].imgOn+'" class="hide "/>'
                			dian+='<span class="roleActive"></span>'
                					+'<span></span>'
                		};
                		if(res[k].roles[2].tafang[0].title.length==4){//判断塔防有三个技能还是四个技能
                			roles+='<div class="skill">'
							+'				<div class="content">'
							+'					<div class="tafang common">'
							+'						<div class="perSkill">'
							+'							<div class="top">'
							+								res[k].roles[2].tafang[0].title[0].title1
							+'							</div>'
							+'							<div class="center">'
							+'								技能效果'
							+'							</div>'
							+'							<div class="bottom">'
							+								res[k].roles[2].tafang[1].info1
							+'							</div>'
							+'						</div>'
							+'						<div class="perSkill hide">'
							+'							<div class="top">'
							+								res[k].roles[2].tafang[0].title[1].title2
							+'							</div>'
							+'							<div class="center">'
							+'								技能效果'
							+'							</div>'
							+'							<div class="bottom">'
							+								res[k].roles[2].tafang[1].info2
							+'							</div>'
							+'						</div>'
							+'						<div class="perSkill hide">'
							+'							<div class="top">'
							+								res[k].roles[2].tafang[0].title[2].title3
							+'							</div>'
							+'							<div class="center">'
							+'								技能效果'
							+'							</div>'
							+'							<div class="bottom">'
							+								res[k].roles[2].tafang[1].info3
							+'							</div>'
							+'						</div>'
							+'						<div class="perSkill hide">'
							+'							<div class="top">'
							+								res[k].roles[2].tafang[0].title[3].title4
							+'							</div>'
							+'							<div class="center">'
							+'								技能效果'
							+'							</div>'
							+'							<div class="bottom">'
							+								res[k].roles[2].tafang[1].info4
							+'							</div>'
							+'						</div>'
							+'					</div>'
							+'					<div class="duizhan hide common">'
							+'						<div class="perSkill">'
							+'							<div class="top">'
							+								res[k].roles[3].duizhan[0].title1
							+'							</div>'
							+'							<div class="center">'
							+'								技能效果'
							+'							</div>'
							+'							<div class="bottom">'
							+								res[k].roles[3].duizhan[1].info1
							+'							</div>'
							+'						</div>'
							+'						<div class="perSkill hide">'
							+'						    <div class="top">'
							+								res[k].roles[3].duizhan[0].title2
							+'							</div>'
							+'							<div class="center">'
							+'								技能效果'
							+'							</div>'
							+'							<div class="bottom">'
							+								res[k].roles[3].duizhan[1].info2
							+'							</div>'
							+'						</div>'
							+'					</div>'
							+'				</div>'																	
							+'				<ul class="page">'
							+'					<li class="pageOn">'
							+'						塔防'
							+'					</li>'
							+'					<li>'
							+'						对战'
							+'					</li>'
							+'				</ul>'
							+'			</div>'
							+'			<div class="skills">'
							+'				<ul class="clearfix tafangs">'
							+'					<li class="l liOn">'
							+						'<img src="'+res[k].roles[2].tafang[1].img1+'" alt="" />'
							+'					</li>'
							+'					<li class="l">'
							+						'<img src="'+res[k].roles[2].tafang[1].img2+'" alt="" />'
							+'					</li>'
							+'					<li class="l">'
							+						'<img src="'+res[k].roles[2].tafang[1].img3+'" alt="" />'
							+'					</li>'
							+'					<li class="l">'
							+						'<img src="'+res[k].roles[2].tafang[1].img4+'" alt="" />'
							+'					</li>'
							+'				</ul>'
							+'				<ul class="clearfix duizhans hide">'
							+'					<li class="l liOn">'
							+						'<img src="'+res[k].roles[3].duizhan[1].img5+'" alt="" />'
							+'					</li>'
							+'					<li class="l">'
							+						'<img src="'+res[k].roles[3].duizhan[1].img6+'" alt="" />'
							+'					</li>'												
							+'				</ul>'
							+'			</div>'
                		}else{
                			roles+='<div class="skill">'
							+'				<div class="content">'
							+'					<div class="tafang common">'
							+'						<div class="perSkill">'
							+'							<div class="top">'
							+								res[k].roles[2].tafang[0].title[0].title1
							+'							</div>'
							+'							<div class="center">'
							+'								技能效果'
							+'							</div>'
							+'							<div class="bottom">'
							+								res[k].roles[2].tafang[1].info1
							+'							</div>'
							+'						</div>'
							+'						<div class="perSkill hide">'
							+'							<div class="top">'
							+								res[k].roles[2].tafang[0].title[1].title2
							+'							</div>'
							+'							<div class="center">'
							+'								技能效果'
							+'							</div>'
							+'							<div class="bottom">'
							+								res[k].roles[2].tafang[1].info2
							+'							</div>'
							+'						</div>'
							+'						<div class="perSkill hide">'
							+'							<div class="top">'
							+								res[k].roles[2].tafang[0].title[2].title3
							+'							</div>'
							+'							<div class="center">'
							+'								技能效果'
							+'							</div>'
							+'							<div class="bottom">'
							+								res[k].roles[2].tafang[1].info3
							+'							</div>'
							+'						</div>'
							+'					</div>'
							+'					<div class="duizhan hide common">'
							+'						<div class="perSkill">'
							+'							<div class="top">'
							+								res[k].roles[3].duizhan[0].title1
							+'							</div>'
							+'							<div class="center">'
							+'								技能效果'
							+'							</div>'
							+'							<div class="bottom">'
							+								res[k].roles[3].duizhan[1].info1
							+'							</div>'
							+'						</div>'
							+'						<div class="perSkill hide">'
							+'						    <div class="top">'
							+								res[k].roles[3].duizhan[0].title2
							+'							</div>'
							+'							<div class="center">'
							+'								技能效果'
							+'							</div>'
							+'							<div class="bottom">'
							+								res[k].roles[3].duizhan[1].info2
							+'							</div>'
							+'						</div>'
							+'					</div>'
							+'				</div>'																	
							+'				<ul class="page">'
							+'					<li class="pageOn">'
							+'						塔防'
							+'					</li>'
							+'					<li>'
							+'						对战'
							+'					</li>'
							+'				</ul>'
							+'			</div>'
							+'			<div class="skills">'
							+'				<ul class="clearfix tafangs">'
							+'					<li class="l liOn">'
							+						'<img src="'+res[k].roles[2].tafang[1].img1+'" alt="" />'
							+'					</li>'
							+'					<li class="l">'
							+						'<img src="'+res[k].roles[2].tafang[1].img2+'" alt="" />'
							+'					</li>'
							+'					<li class="l">'
							+						'<img src="'+res[k].roles[2].tafang[1].img3+'" alt="" />'
							+'					</li>'
							+'					<li class="l">'
							+'					</li>'
							+'				</ul>'
							+'				<ul class="clearfix duizhans hide">'
							+'					<li class="l liOn">'
							+						'<img src="'+res[k].roles[3].duizhan[1].img5+'" alt="" />'
							+'					</li>'
							+'					<li class="l">'
							+						'<img src="'+res[k].roles[3].duizhan[1].img6+'" alt="" />'
							+'					</li>'												
							+'				</ul>'
							+'			</div>'
                		}
                			
						if(k==0){
							str='<div class="perRoles">'
							+'		<div class="l introduces">'
							+'			<dl>'
							+'				<dt>'
							+'					<img src="'+res[k].roles[1].introduce+'" alt="喜扑游戏" />'
							+'				</dt>'
							+'				<dd>'
							+'					<a href="javascript:;">'
							+'						<img src="images/part1_more.png" alt="" />'
							+'					</a>'
							+'				</dd>'
							+'			</dl>'
							+'		</div>'
							+'		<div class="l rolesCen">'
							+'			<div class="role">'
							+				juexing
							+'			</div>'
							+'			<!--角色觉醒和未觉醒，未觉醒没点  觉醒有点-->'
							+'			<div class="pagination">'
							+				dian
							+'			</div>'						
							+'		</div>'
							+'		<div class="r skiAndDui">'
							+			roles
							+'		</div>'
							+'	</div>'						
						}else{
							str+='<div class="perRoles hide">'
							+'		<div class="l introduces">'
							+'			<dl>'
							+'				<dt>'
							+'					<img src="'+res[k].roles[1].introduce+'" alt="喜扑游戏" />'
							+'				</dt>'
							+'				<dd>'
							+'					<a href="javascript:;">'
							+'						<img src="images/part1_more.png" alt="" />'
							+'					</a>'
							+'				</dd>'
							+'			</dl>'
							+'		</div>'
							+'		<div class="l rolesCen">'
							+'			<div class="role">'
							+				juexing
							+'			</div>'
							+'			<!--角色觉醒和未觉醒，未觉醒没点  觉醒有点-->'
							+'			<div class="pagination">'
							+				dian
							+'			</div>'						
							+'		</div>'
							+'		<div class="r skiAndDui">'
							+			roles
							+'		</div>'
							+'	</div>'		
						}
						
						bot+='<li class="l" style="left:'+k*114+'px">'//这是小头像
							+	'<img src="'+res[k].roles[0].rolesPic+'" alt="" />'
							+'</li>'							

							$(".con .glzx").append(str);//这个是上面的角色塔防对战
							$(".boxs .parent").append(bot);//这个是小头像
//							console.log(res[k].roles[1]);
							juexing='';
							dian="";
							roles="";
							str="";
							bot="";
                	}
                	$(".boxs ul").css({"width":114*res.length+"px"});
//					console.log($(".boxs .parent ul"))
                }
			})
		}
	};
	index.init();
})