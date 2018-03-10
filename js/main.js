(function(){
    var Util = (function(){
    	var prefix = 'html5_reader_';
        var StorageGetter = function(key){
            return localStorage.getItem(prefix+key);
        }
        var StorageSetter = function(key,val){
            return localStorage.setItem(prefix+key,val);
        }
        var getBSONP = function(url,callback){
        	return $.jsonp({
        		url : url,
        		cache:true,
        		callback:"duokan_fiction_chapter",
        		success :function(result){

        			 var data = $.base64.decode(result);
        			 var json = decodeURIComponent(escape(data));
        			 callback(data);
        		}
        	})
        }
        return{
        	getBSONP : getBSONP,
        	StorageGetter:StorageGetter,
        	StorageSetter:StorageSetter
        }
    })();
    var Dom={
    	top_nav :$('#top-nav'),
    	bottom_nav:$('#bottom-nav'),
    	night_day_toggle:$('#night-button'),
    	font_container:$('.font-container'),
    	font_button:$('#font-button'),
    	bg_toggle:$('.bk-container'),
    	bg_color1:$('#inital'),
    	bg_color2:$('#beige'),
    	bg_color3:$('#grey'),
    	bg_color4:$('#green'),
    	bg_color5:$('#black')
    }
    var Win = $(window);
    var Doc = $(document);
    var RootContainer=$('#fiction_container');
    var initFont = Util.StorageGetter('font_size');
    initFont=parseInt(initFont);
    if(!initFont){
    	initFont=14;
    }
    RootContainer.css('font-size',initFont+'px');
    var init_word_color = Util.StorageGetter("word_color");
    $('#fiction_container').css('color',init_word_color);
    var init_reader_bg_color = Util.StorageGetter("bg_color");
    $('#fiction_container').css('background',init_reader_bg_color);
    function main(){
    	//todo 整个项目的入口函数 
    	var readerModel = ReaderModel();
    	readerModel.init();
    	EventHanlder();
    }

    function ReaderModel(){
    	//todo 实现和阅读器相关的数据交互的方法
    	var Chapter_id;
    	var init = function(){
    		getFictionInfo(function(){
    			getCurchapterContent(Chapter_id,function(){

    			})
    		})
    	}
        var getFictionInfo = function(callback){
        	$.get('data/chapter.json',function(data){
        		//获得章节信息后回调
        		  Chapter_id = data.chapters[1].chapter_id;
                  callback && callback();
        	},'json');
        }
        var getCurchapterContent=function(chapter_id,data){
        	$.get('data/data'+chapter_id+'.json',function(data){
                 if(data.result == 0){
                 	var url = data.jsonp;
                    Util.getBSONP(url , function(data){
                    	debugger
                          callback && callback(data);
                    });
                 }
        	},'json')
        }
        return{
        	init :init 
        }
    }
    function ReaderBaseFrame(){
    	//todo 渲染基本的UI结构
    }
    
    function EventHanlder(){
    	//todo 交互的事件绑定
    	$('#action_mid').click(function(){
               if(Dom.top_nav.css('display')=='none'){
               	   Dom.bottom_nav.show();
               	   Dom.top_nav.show();
               }else{
               	   Dom.bottom_nav.hide();
               	   Dom.top_nav.hide();
               	   Dom.font_container.hide();
               	   $('#font-button .b-title').removeClass('current'); 
               }
    	});

        Dom.font_button.click(function(){
               if(Dom.font_container.css('display')=='none'){
               	   Dom.font_container.show(); 
               	   $('#font-button .b-title').addClass('current');          	
               }else{
               	   Dom.font_container.hide();
               	   $('#font-button .b-title').removeClass('current'); 
               }
        });

        Dom.night_day_toggle.click(function(){
               //触发背景切换事件
               if ($('.b-night').css('display')=='none') {
               	  $('.b-night').show();
               	  $('.b-day').hide();
                  $('#fiction_container').css('background','#e9dfc7');
                  $('#fiction_container').css('color','#555');
               	  
               }else{
                  $('.b-day').show();
                  $('.b-night').hide();
                  $('#fiction_container').css('background','#4f4f4f');
                  $('#fiction_container').css('color','#bebebe');
               }
        });

        Dom.bg_color1.click(function(){
        	   init_reader_bg_color='#e9dfc7';
               $('#fiction_container').css('background',init_reader_bg_color);
               $('#fiction_container').css('color','#555');
               Util.StorageSetter("bg_color", init_reader_bg_color);
               Util.StorageSetter("word_color",'#555');
        });
        Dom.bg_color2.click(function(){
        	   init_reader_bg_color='#f5f5dc';
               $('#fiction_container').css('background',init_reader_bg_color);
               $('#fiction_container').css('color','#555');
               Util.StorageSetter("bg_color", init_reader_bg_color);
               Util.StorageSetter("word_color",'#555');
        });
        Dom.bg_color3.click(function(){
        	   init_reader_bg_color='#bebebe'
               $('#fiction_container').css('background',init_reader_bg_color);
               $('#fiction_container').css('color','#555');
               Util.StorageSetter("bg_color", init_reader_bg_color);
               Util.StorageSetter("word_color",'#555');
        });
        Dom.bg_color4.click(function(){
        	   init_reader_bg_color='#c1ffe4'
               $('#fiction_container').css('background',init_reader_bg_color);
               $('#fiction_container').css('color','#555');
               Util.StorageSetter("bg_color", init_reader_bg_color);
               Util.StorageSetter("word_color",'#555');
        });
        Dom.bg_color5.click(function(){
        	   init_reader_bg_color='#4f4f4f'
               $('#fiction_container').css('background',init_reader_bg_color);
               $('#fiction_container').css('color','#bebebe');
               Util.StorageSetter("bg_color", init_reader_bg_color);
               Util.StorageSetter("word_color",'#bebebe');
        });

        $('#large').click(function(){
        	if (initFont>20) {
        		return;
        	}
             initFont++;
             RootContainer.css('font-size',initFont+'px');
             Util.StorageSetter('font_size',initFont);
        });

        $('#small').click(function(){
        	if (initFont<12) {
        		return;
        	}
             initFont--;
             RootContainer.css('font-size',initFont+'px');
             Util.StorageSetter('font_size',initFont);
        });

    	Win.scroll(function(){
               	   Dom.bottom_nav.hide();
               	   Dom.top_nav.hide();
               	   Dom.font_container.hide();
               	   $('#font-button .b-title').removeClass('current'); 
    	});
    }

    main();



})();