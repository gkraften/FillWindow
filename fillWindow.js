(function($) {
    $.fn.fullscreen = function(ratio) {
        var $ele = this;
        if ($ele.data("fullscreen") === undefined) {
            $ele.data({
                width: $ele.width(),
                height: $ele.height(),
                overflow: $ele.css("overflow")
            });
            console.log("hej");
        }
        $ele.data("fullscreen", true)
        
        $ele.css({
            overflow: "hidden",
            position: "absolute",
            top: "0px",
            left: "0px"
        });
        $(window).on("resize", null,  {ratio: ratio, ele: $ele}, resized).trigger("resize");
        return this;
    };
    
    $.fn.exitFullscreen = function() {
        var $ele = this;
        $ele.css({
            overflow: $ele.data("overflow"),
            position: "initial"
        });
        $ele.data("fullscreen", false);
        $(window).off("resize", resized);
        $ele.attrWidth($ele.data("width"));
        $ele.attrHeight($ele.data("height"));
        return this;
    };
    
    $.fn.toggleFullscreen = function(ratio) {
       if (this.data("fullscreen"))
            this.exitFullscreen();
        else
            this.fullscreen(ratio);
    };
    
    $.fn.attrWidth = function(w) {
        return this.attr("width", w);
    };
    
    $.fn.attrHeight = function(h) {
        return this.attr("height", h);
    };
})(jQuery);

function resized(e) {
    var canv = e.data.ele;
    var win = $(window);
    if (e.data.ratio === -1) {
        canv.attrWidth(win.width());
        canv.attrHeight(win.height());
        return;
    }
    
    var winRatio = win.width() / win.height();
    if (winRatio > e.data.ratio) {
        canv.attrHeight(win.height());
        canv.attrWidth(win.height() * e.data.ratio);
        canv.css({
            top: "0px",
            left: (win.width() - parseInt(canv.attr("width"))) / 2 + "px"
        });
    } else {
        canv.attrHeight(win.width() / e.data.ratio);
        canv.attrWidth(win.width());
        canv.css({
            left: "0px",
            top: (win.height() - parseInt(canv.attr("height"))) / 2 + "px"
        });
    }
}