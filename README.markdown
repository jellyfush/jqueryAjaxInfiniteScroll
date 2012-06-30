I couldn't find a simple infinite scrolling jquery plugin(that I could get to work) so I decided to make my own, it could be helpful to someone else so thought I may as well release in into the wild.

It will send "page" as a get variable... default is 0 so it will call off your-url?page=0, your-url?page=1 and so on.

### Basic Usage:

    $('element').ajaxInfiniteScroll({
        url: 'url you want to load'
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