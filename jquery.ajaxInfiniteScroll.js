(function($){ 

	var AjaxInfiniteScroll = function(element, options)
	{
		var $elem = $(element);
		var obj = this;
		var settings = $.extend({
			initialLoad: false,
			page: 0,
			pageLimit: 5,
			distanceToTrigger: 30,
			loadLag:2000,
			loadingHTML: '<div class="InfiniteScrollLoading">Loading...</div>',
			stopOnEmpty: true
		}, options || {});
		
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
			if($elem[0].scrollHeight - $elem.scrollTop() - settings.distanceToTrigger <= $elem.outerHeight() && $elem.scrollTop() != 0){
				if(!loading && settings.page <= settings.pageLimit && !stop)
					load();
			}		
		}
		
		if(settings.initialLoad)
			load();

		$elem.scroll(function (){
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
