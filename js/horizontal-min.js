jQuery(document).ready(function(n){function i(n,i){a=!0,$("body").addClass("horizontal-slide"),$(".horizontal-slide").addClass("page-is-changing"),$(".cd-loading-bar").one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",function(){o(n,i),s=n,$(".cd-loading-bar").off("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend")}),t()||(o(n,i),s=n)}function o(n,i){n=""==n?"home.html":n;var o="cd-"+n.replace(".html",""),s=$('<div class="cd-main-content '+o+'"></div>');s.load(n+" .cd-main-content > *",function(o){$("main").html(s);var d=t()?1400:0;setTimeout(function(){s.hasClass("cd-horizontal")?$("body").addClass("cd-horizontal"):$("body").removeClass("cd-horizontal"),$("body").removeClass("page-is-changing"),$("body").removeClass(".horizontal-slide"),$(".cd-loading-bar").one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",function(){a=!1,$(".cd-loading-bar").off("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend")}),t()||(a=!1)},d),n!=window.location&&i&&window.history.pushState({path:n},"",n)})}function t(){return $("html").hasClass("csstransitions")}var a=!1,s="";firstLoad=!1,$("main").on("click",'[data-type="horizontal-page-transition"]',function(n){n.preventDefault();var o=$(this).attr("href");a||i(o,!0),firstLoad=!0}),$(window).on("popstate",function(){if(firstLoad){var n=location.pathname.split("/"),o=n[n.length-1];a||s==o||i(o,!1)}firstLoad=!0})});