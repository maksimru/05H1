$.fn.getAbsolute = function () {
    $element = $(this);
    var sTop = $(window).scrollTop();
    var sLeft = $(window).scrollLeft();
    var w = $element.width();
    var h = $element.height();
    var offset = $element.offset();
    var $p = $element;
    while (typeof $p == 'object') {
        var pOffset = $p.parent().offset();
        if (typeof pOffset == 'undefined') break;
        offset.left = offset.left + (pOffset.left);
        offset.top = offset.top + (pOffset.top);
        $p = $p.parent();
    }
    var pos = {
        left: offset.left + sLeft,
        right: offset.left + w + sLeft,
        top: offset.top + sTop,
        bottom: offset.top + h + sTop
    };
    pos.tl = {x: pos.left, y: pos.top};
    pos.tr = {x: pos.right, y: pos.top};
    pos.bl = {x: pos.left, y: pos.bottom};
    pos.br = {x: pos.right, y: pos.bottom};
    return pos;
};