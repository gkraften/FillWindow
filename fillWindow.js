(function($) {
    $.fn.fullscreen = function(ratio, background) {
        var $ele = this;
        if (background) {
            var eles = [];
            $("body").find("*").not($ele).each(function(index, ele) {
                var $elem = $(ele);
                if ($elem.css("display") !== "none") {
                    $elem.data("display", $elem.css("display"));
                    eles.push($elem);
                    $elem.css("display", "none");
                }
            });
            
            var bg = $("body").css("background");
            $("body").css("background", background);
            
            $ele.data({
                hidden: eles,
                background: bg
            });
        }
        
        if ($ele.data("fullscreen") === undefined) {
            $ele.data({
                width: $ele.width(),
                height: $ele.height(),
                overflow: $ele.css("overflow")
            });
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
        if (typeof $ele.data("hidden") !== 'undefined' || typeof $ele.data("background") !== 'undefined') {
            $("body").css("background", $ele.data("background"));
            $ele.data("hidden").forEach(function(ele) {
                ele.css("display", ele.data("display"));
                ele.removeData("display");
            });
            $ele.removeData("hidden");
            $ele.removeData("background");
        }
        
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
    
    $.fn.toggleFullscreen = function(ratio, background) {
       if (this.data("fullscreen"))
            return this.exitFullscreen();
        else
            return this.fullscreen(ratio, background);
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
    var winRatio = win.width() / win.height();
    
    if (e.data.ratio === -1) {
        canv.attrWidth(win.width());
        canv.attrHeight(win.height());
        return;
    }
    
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