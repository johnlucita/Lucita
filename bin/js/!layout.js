/*!
 * !layout v2.0.0 (https://github.com/johnlucita/Lucita)
 * Copyright 2015-2016 Lucita, Private.
 * Licensed under MIT (https://github.com/johnlucita/Lucita/blob/master/LICENSE)
 */
$(window).resize(function () {
    var _$objs = $('div[descriptive-text]');

    if (_$objs.length) {
        $.each(_$objs, function (i, obj) {
            var _$obj = $(obj);
            var _descriptive_text = JSON.parse($(obj).attr('descriptive-text'));

            if (isJson(_descriptive_text)) {
                _$obj.addClass('layout_width');
                if (_descriptive_text['layout-owner']
                    && !isEmpty(_descriptive_text['layout-owner'])) {
                    _$obj.attr('layout-owner', _descriptive_text['layout-owner']);
                }
                _$obj.attr('layout-width', _descriptive_text['layout-width']);
                _$obj.attr('layout-width-unit', _descriptive_text['layout-width-unit']);
                _$obj.removeAttr('descriptive-text');
            }
        });
    }

    layout.initialization();
});

$.fn.extend({
    hasAttr: function (a) {
        var _result = false;
        var _$this = $(this);

        if (_$this.length) {
            _result = 'undefined' === typeof (_$this.attr(a)) ? false : true;
        }

        return _result;
    }, 
    setBorderStyle: function () {
        var _$this = $(this);

        if (_$this.length) {
            var _borderstyle = layout.getBorderStyleDefault();

            if (_$this.hasAttr('border-style')) {
                _borderstyle = _$this.attr('border-style') || _borderstyle;
            }

            _$this.css('border-style', _borderstyle);
        }
    }, 
    setBorderColor: function () {
        var _$this = $(this);

        if (_$this.length) {
            var _bordercolor = layout.getBorderColorDefault();

            if (_$this.hasAttr('border-color')) {
                _bordercolor = _$this.attr('border-color') || _bordercolor;
            }

            _$this.css('border-color', _bordercolor);
        }
    }, 
    setBackgroundColor: function () {
        var _$this = $(this);

        if (_$this.length) {
            var _backgroundcolor = layout.getBackgroundColorDefault();

            if (_$this.hasAttr('background-color')) {
                _backgroundcolor = _$this.attr('background-color') || _backgroundcolor;
            }

            _$this.css('background-color', _backgroundcolor);
        }
    }, 
    setDividerStyle: function () {
        var _$this = $(this);

        if (_$this.length) {
            _$this.css('border-style', _$this.attr('layout-border-style') || 'solid');
        }
    },
    setDividerColor: function () {
        var _$this = $(this);

        if (_$this.length) {
            _$this.css('border-color', _$this.attr('layout-border-color') || 'black');
        }
    },
    setWidth: function () {
        var _$this = $(this);
        var _descriptive_text = {
            'layout-width': '100', 
            'layout-width-unit': '%'
        };

        if (_$this.length) {
            // 获取父容器
            var _$space = _$this.parent();

            // 判断是否指定所有者，如果指定所有者，则取所有者为父容器
            if (_$this.hasAttr('layout-owner')) {
                $.extend(_descriptive_text, { 'layout-owner': _$this.attr('layout-owner') });
                var _$owner = _$this.closest(_$this.attr('layout-owner'));

                if (_$owner.length) {
                    _$space = _$owner
                }
                _$this.removeAttr('layout-owner');
            }

            // 执行宽度换算
            if (_$space.length) {
                // 获取容器内部宽度（排除掉容器的margin、border、padding宽度）
                var _space = _$space.width();

                // 获取自定义宽度、单位
                var _width = _$this.attr('layout-width') || '100';
                var _unit = _$this.attr('layout-width-unit') || '%';
                $.extend(_descriptive_text, { 'layout-width': _width, 'layout-width-unit': _unit });

                // 单位为百分比时，换算成像素（容器内部宽度*自定义百分比宽度）
                if ('%' == _unit) {
                    _width = parseInt(_space * _width / 100);
                    _unit = 'px';
                }

                // 自定义宽度大于容器宽度时，等于容器内部宽度
                if (_width > _space) {
                    _width = _space;
                }

                // 设置目标总宽度（包括margin、border、padding宽度）
                _$this.outerWidth(_width + _unit).attr('descriptive-text', JSON.stringify(_descriptive_text)).removeClass('layout_width').removeAttr('layout-width').removeAttr('layout-width-unit');
            }
        }
    },
    setHide: function() {
        var _$this = $(this);

        if (_$this.length) {
            _$this.addClass('layout_hidden');
        }
    },
    setShow: function() {
        var _$this = $(this);

        if (_$this.length) {
            _$this.removeClass('layout_hidden');
        }
    }, 
    setTextAlign: function () {
        var _$this = $(this);

        if (_$this.length) {
            _$this.css('text-align', _$this.attr('layout-align') || 'left');
            if ('justify' == _$this.attr('layout-align')) {
                _$this.css('text-justify', _$this.attr('layout-justify') || 'auto');
            }
        }
    },
    setVerticalAlign: function () {
        var _$this = $(this);

        if (_$this.length) {
            _$this.css('vertical-align', _$this.attr('layout-align') || 'baseline');
        }
    }
});

var layout = {
    initialization: function () {
        layout.initLinkNotFocus();
        layout.initLayoutBorder();
        layout.initLayoutBackground();
        layout.initLayoutWidth();
        layout.initLayoutDivider();
        layout.initLayoutTextAlign();
        layout.initLayoutVerticalAlign();
        layout.initLayoutPattern();
        layout.initLayoutTabs();
        layout.initLayoutSearchbox();

        return false;
    }, 
    initLinkNotFocus: function() {
        $('a').on('focus', function () {
            $(this).blur();
        });
    }, 
    initLayoutBorder: function () {
        var _$layout_border_objs = $('body.layout .layout_border');

        if (_$layout_border_objs.length) {
            $.each(_$layout_border_objs, function (i, layout) {
                $(layout).setBorderStyle();
                $(layout).setBorderColor();
            });
        }
    }, 
    initLayoutBackground: function() {
        var _$layout_backgroud_objs = $('body.layout .layout_backgroundcolor');

        if (_$layout_backgroud_objs.length) {
            $.each(_$layout_backgroud_objs, function (i, layout) {
                $(layout).setBackgroundColor();
            });
        }
    }, 
    initLayoutWidth: function() {
        var _$layout_width_objs = $('.layout_width');

        if (_$layout_width_objs.length) {
            $.each(_$layout_width_objs, function (i, layout) {
                $(layout).setWidth();
            });
        }
    }, 
    initLayoutDivider: function() {
        var _$layout_divider_objs = $('.layout_divider');

        if (_$layout_divider_objs.length) {
            $.each(_$layout_divider_objs, function (i, layout) {
                if ($(layout).hasAttr('layout-border-style')) {
                    $(layout).setDividerStyle();
                }
                if ($(layout).hasAttr('layout-border-color')) {
                    $(layout).setDividerColor();
                }
            });
        }
    }, 
    initLayoutTextAlign: function() {
        var _$textaligns = $('.layout_textalign');

        if (_$textaligns.length) {
            $.each(_$textaligns, function (i, align) {
                $(align).setTextAlign();
            });
        }
    }, 
    initLayoutVerticalAlign: function() {
        var _$verticalaligns = $('.layout_verticalalign');

        if (_$verticalaligns.length) {
            $.each(_$verticalaligns, function (i, align) {
                $(align).setVerticalAlign();
            });
        }
    }, 
    initLayoutPattern: function() {
        var _$patterns = $('.layout_pattern');

        if (_$patterns.length && !supportCSS3('background-size', 'contain')) {
            $.each(_$patterns, function (i, pattern) {
                var _bkurl = $(pattern).css('backgroundImage');
                var _bkhurl = '';

                if (_bkurl) {
                    _bkurl = _bkurl.substring(5, _bkurl.length - 2);
                    _bkhurl = _bkurl;

                    if ($(pattern).hasClass('layout_pattern_hover')) {
                        _bkhurl = _bkurl.substring(0, _bkurl.lastIndexOf('/')) + '/hover/' + _bkurl.substring(_bkurl.lastIndexOf('/') + 1);
                    }

                    var _imgW = $(pattern).width();
                    var _imgH = $(pattern).height();
                    var _$html = $('<img alt="" src="' + _bkurl + '?' + Math.random() + '" width="' + _imgW + '" height="' + _imgH + '" />').css('border', '0');

                    _$html.on('onmouseover', function () {
                        $(this).attr('src', _bkhurl + '?' + Math.random());
                    });

                    _$html.on('onmouseout', function () {
                        $(this).attr('src', _bkurl + '?' + Math.random());
                    });

                    $(pattern).css('background', '').html(_$html);
                }
            });
        }
    }, 
    initLayoutTabs: function() {
        var _$navtabs = $('.layout_tabs .layout_nav_tabs > li');

        if (!_$navtabs.length) {
            return false;
        }

        _$navtabs.on('click', function (e) {
            var _$this = $(this);
            var _targetId = _$this.attr('data-target') || '';
            var _index = _$this.index();

            _$navtabs.removeClass('layout_active');
            _$this.addClass('layout_active');

            var _$tabcontents = $('.layout_content > *');

            if (_$tabcontents.length) {
                _$tabcontents.removeClass('layout_active');
                
                if (_targetId !== '') {
                    _$tabcontents.parent().find('#' + _targetId).addClass('layout_active');
                } else {
                    _$tabcontents.eq(_index).addClass('layout_active');
                }
            }
        });

        if (!$('.layout_nav_tabs li.layout_active').length) {
            $('.layout_nav_tabs li.layout_active').eq(0).click();
        }
    }, 
    initLayoutSearchbox: function() {
        var _$searchbox = $('.layout_searchbox');

        if (_$searchbox.length) {
            $.each(_$searchbox, function (i, searchbox) {
                var _$searchTxt = $(this).find('input');
                var _$searchBtn = $(this).find('a');

                
                if (_$searchTxt.length &&
                _$searchBtn.length) {
                    var _btnWidth = parseInt(_$searchBtn.width());
                    var _txtWidth = parseInt(_$searchTxt.width());

                    if (isIE()) {
                        var _$searchIE = $('<div class="searchIE"></div>').outerWidth(_txtWidth + _btnWidth + 40 + 'px');

                        _$searchIE.append('<span class="fa fa-search"></span>').append(_$searchTxt).append(_$searchBtn);

                        if (_$searchTxt.hasAttr('altfocus')) {
                            _$searchTxt.on('focus', function () {
                                _$searchIE.addClass('altfocus');
                            });
                            _$searchTxt.on('blur', function () {
                                _$searchIE.removeClass('altfocus');
                            });
                        }

                        $(this).html(_$searchIE);
                    } else {
                        if (_txtWidth <= _btnWidth + 60) {
                            _txtWidth = _btnWidth + 60;
                            _$searchTxt.outerWidth(_txtWidth + 'px');
                        }

                        _$searchTxt.css('padding-left', '25px');
                        _$searchTxt.css('padding-right', (_btnWidth + 5) + 'px');
                    }
                }
            });
        }
    }, 
    getBorderStyleDefault: function () {
        var _result = '';
        var _$body = $('body.layout');

        if (_$body.length) {
            if (_$body.hasClass('layout_display')) {
                _result = _$body.attr('layout-border-style') || 'dashed';
            }
        }

        return _result;
    }, 
    getBorderColorDefault: function () {
        var _result = '';
        var _$body = $('body.layout');

        if (_$body.length) {
            if (_$body.hasClass('layout_display')) {
                _result = _$body.attr('layout-border-color') || 'crimson';
            }
        }

        return _result;
    }, 
    getBackgroundColorDefault: function () {
        var _result = '';
        var _$body = $('body.layout');

        if (_$body.length) {
            if (_$body.hasClass('layout_display')) {
                _result = _$body.attr('layout-background-color') || '#afafaf';
            }
        }

        return _result;
    }
};
