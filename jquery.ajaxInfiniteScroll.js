(function($){ 

	var AjaxInfiniteScroll = function(element, options)
	{
		var $elem = $(element);
		var $scrollElem;
		var obj = this;
		var settings = $.extend({
			initialLoad: false,
			page: 0,
			pageLimit: 5,
			distanceToTrigger: 30,
			loadLag:2000,
			loadingHTML: '<div class="InfiniteScrollLoading">Loading...</div>',
			stopOnEmpty: true,
			scrollElem: $elem,
			beforeAdd: function($data){ return $data; }
		}, options || {});
		
		if(settings.scrollElem == "window")
			var $scrollElem = $(window);
		else
			var $scrollElem = $(settings.scrollElem);
		
		var stop = false;
		var loading = false;
		var $loading = $(settings.loadingHTML);
		
		var showLoading = function(){
			$elem.append($loading);
		}
		var removeLoading = function(){
			$loading.remove();
		}		
		
		var startLoading = function(){
			loading = true;
			showLoading();
		}
		var stopLoading = function(){
			removeLoading();
			setTimeout(function(){
				loading = false;
				checkAndLoad();
			},settings.loadLag)
		}
		
		var load = function(){
			startLoading();
			$.ajax({
				url: settings.url,
				data: {page: settings.page},
				success: function(response){
					if(response == '' && settings.stopOnEmpty){
						stop = true
						stopLoading();
					}else{
						$response = $(response);
						$response = settings.beforeAdd($response);
						$response.hide();
						$elem.append($response);
						$response.slideDown();
						stopLoading();
						settings.page++;					
					}
				}
			})	
		}
		
		var checkAndLoad = function(){
			if(settings.scrollElem == "window")
				tryLoad = checkWindow();
			else
				tryLoad = checkElem();
			if(tryLoad){
				if(!loading && settings.page <= settings.pageLimit && !stop)
					load();
			}		
		}
		
		var checkElem = function(){
			return (settings.scrollElem[0].scrollHeight - settings.scrollElem.scrollTop() - settings.distanceToTrigger <= settings.scrollElem.outerHeight() && settings.scrollElem.scrollTop() != 0);
		}
		
		var checkWindow = function(){
			return ($(window).height() + $(window).scrollTop() + settings.distanceToTrigger >= $(document).height() && $(window).scrollTop() != 0);
		}
			
		if(settings.initialLoad)
			load();

		$scrollElem.scroll(function(){
			checkAndLoad();
		});
			
   };
	$.fn.ajaxInfiniteScroll = function(options) {  
		return this.each(function() {
			$this = $(this);
			if ($this.data('ajaxInfiniteScroll')) return;
			var ajaxInfiniteScroll = new AjaxInfiniteScroll(this, options);
			$this.data('ajaxInfiniteScroll', ajaxInfiniteScroll);					
		});	
	};	
	  
})(jQuery);
