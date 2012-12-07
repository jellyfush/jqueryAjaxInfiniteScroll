I couldn't find a simple infinite scrolling jquery plugin(that I could get to work) so I decided to make my own, it could be helpful to someone else so thought I may as well release in into the wild.

It will send "page" as a get variable... default is 0 so it will call off your-url?page=0, your-url?page=1 and so on.

### Basic Usage:

	$('element').ajaxInfiniteScroll({
		url: 'url you want to load'
	});
	
### More Advanced Usage:

	Initial load of first page:
	$('element').ajaxInfiniteScroll({
		url: 'url you want to load',
		initialLoad: true
	});

	Window scroll:
	$('element').ajaxInfiniteScroll({
		url: 'url you want to load',
		scrollElem: "window", // will trigger the ajax call when the window scrollbar is at the bottom
		initialLoad: true
	});
	
	Modifiy data callback:
	$('element').ajaxInfiniteScroll({
		url: 'url you want to load',
		beforeAdd: function($data){
			$data.append('<div>beforeAdd callback triggered, you can modify the data before its added to the element</div>');
			return $data;
		}
	});    


### Options:
* url - URL you want the plugin to call
* initialLoad: defalult false - if you want it to load the first page when the plugin is activated
* page: default 0 - initial page number
* pageLimit: default 5 - maximum number of pages
* distanceToTrigger: default 30 - distance from the bottom to trigger the load
* loadLag: default 2000 - milliseconds to wait before the next load is allowed to be triggered
* loadingHTML: default &lt;div class="InfiniteScrollLoading"&gt; Loading...&lt;/div&gt; - HTML to show at the bottom while loading
* stopOnEmpty: default true - if the returned data is empty it will stop loading.
* scrollElem: default $('element') - can be used to define the trigger element, there is a special keyword 'window' for triggering on window scroll.
* beforeAdd: default function($data){ return $data; } - used to modify the data before adding to the element.
