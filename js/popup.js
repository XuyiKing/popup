USER_STATIC =  './';
var Popup = (function () {
    /**
     * 内容弹窗
     *
     * @param options
     * @param options el {string} 弹窗容器类或ID
     * @param options title {string} 弹窗标题
     * @param options templateData {object} 提供渲染的模版数据
     * @param options templateId {string} 渲染模版ID
     * ...
     */
    var contentPopup = function (options) {
        var settings = $.extend(true, {
            el: '#editItem',
            title: "内容弹窗",
            height: 330,
            width: 658,
            templateData: {},
            templateId: null,
            callback: null,
            bind: null,
            okFunc: null
        }, options);
        var formLabel = "popupForm";

        // 渲染数据
        // var templateData = settings.templateData;
        // Common.render($(settings.el), templateData, settings.templateId);

        // 确保form
        var formMv = $(settings.el).find("form");
        if (formMv.length > 0) {
            if (formMv.attr("id")) {
                formLabel = formMv.attr("id");
            } else {
                formMv.attr("id", formLabel);
            }
        } else {
            $(settings.el).html('<form id="' + formLabel + '">' + $(settings.el).html() + '</form>');
        }

        var subObj = null;
        var temp = settings.okFunc;
        var okFunc = function (ele) {
            // if (!subObj.check(false)) {
            //     return false;
            // }
            var formData = $("#" + formLabel).serializeArray();
            temp(formData);
        };

        settings.okFunc = okFunc;
        $.openMode(settings);

        // subObj = $("#" + formLabel).submitForms({});
    };

    var confirm = function (options) {
        var settings = $.extend(true, {
            title: "确认操作",
            width: 300,
            height: 180,
            model: 'confirm'
        }, options);

        // content 修饰
        settings.content = '<div class="layui-row flexcenter padding-top-10">' +
            '<img src= "' + USER_STATIC + '/image/invalid-name.svg" alt="">' +
            '<span>' + settings.content + '</span>' +
            '</div>';

        $.openMode(settings);
    }

    return {
        contentPopup: contentPopup,
        confirm: confirm
    }
})();

/**
 * 内容模态弹窗弹窗
 */
(function ($) {
    /* 存取各个页面model内容 */
    // TODO 开发完可关闭
    // var htmlModel = (function () {
    //     var Modelstring = htmlModel || {};
    //     $.each($('#modeHtml').children(), function (i, v) {
    //         if ($(v).attr('id') || $(v).attr('id') != '') {
    //             Modelstring['#' + $(v).attr('id')] = $(v).html();
    //         }
    //     });
    //     // $('#modeHtml').remove();
    //     return Modelstring
    // })();

    var optiondefault = {
        el: '',   // 获取的弹窗内容html容器  例如： #editButon
        title: '模态框',
        centerTitle: '',
        content: false,
        width: 600,
        height: 320,
        surebtn: '确认',
        delebtn: '取消',
        // redbtn:'警告',
        model: 'content',  // [content, confirm] 模式
        // 确认按钮回调函数
        okFunc: function () {
            return true;
        }
    };
    var element = this,
        sureColor = {
            'content': "",
            'confirm': 'red-btn'
        };
    // 填充内容区域
    var realHtml = '';

    var modeObj = {
        addback: function () {
            $('body').append('<div id="modelback"></div>')
        },
        hideback: function () {
            $('#modelback').fadeOut(200)
        },
        getbtn: function (option) {
            var btnstring = '';
            btnstring += '<span class="sure-btn ' + sureColor[option.model] + '">' + option.surebtn + '</span>';
            btnstring += '<span class="dele-btn">' + option.delebtn + '</span>';
            return btnstring
        },
        openMode: function (option) {
            if ($('#modelback').length == 0) {
                $.addback()
            }
            $('#modelback').css('display', 'block');
            for (var key in option) {
                if (option[key]) {
                    optiondefault[key] = option[key];
                }
            }

            /*htmlModel[option.el]*/
            $('body').append(
                '<div id="animateModelBox">' +
                '<div class="animate-model-head">' +
                '<span>' + optiondefault.title + '</span>' +
                '<span>' + optiondefault.centerTitle + '</span>' +
                '<span class="close-model"></span>' +
                '</div>' +
                '<div id="modelSureBtn" class="animate-model-content">' + '</div>' +
                '<div class="animate-model-footer">' + $.getbtn(optiondefault) + '</div></div>'
            );// htmlModel[optiondefault.el]
            $('#animateModelBox').css({
                'width': optiondefault.width + 'px',
                'height': optiondefault.height + 'px',
            })
            $('#animateModelBox').css({
                'transform': 'translateX(' + (-optiondefault.width / 2) + 'px)'
            })
            $('#animateModelBox .animate-model-content').css({
                'height': optiondefault.height - 88 + 'px',
            });

            // 填充内容区域
            if (optiondefault.el) {
                realHtml = $(optiondefault.el).html();
                $(optiondefault.el).html("");
            } else if (optiondefault.content) {
                realHtml = '<div>' +
                    optiondefault.content +
                    '</div>';
            }
            $("#animateModelBox #modelSureBtn").html(realHtml);

            $('#animateModelBox').slideDown(function () {
                optiondefault.callback && optiondefault.callback()
            });
            /* 关闭弹窗 */
            $('#animateModelBox .dele-btn').off('click').on('click', function () {
                $.closeModel()
            })
            $('#animateModelBox .close-model').off('click').on('click', function () {
                $.closeModel()
            })
            $('#modelback').off('click').on('click', function (e) {
                /*$.closeModel()*/
            });
            /* 提交弹窗 */
            $('#animateModelBox .sure-btn').off('click').on('click', function () {
                $.sureModel()
            })
        },
        closeModel: function () {
            optiondefault.el && $(optiondefault.el).html(realHtml);
            $('#animateModelBox').slideUp(function () {
                $('#animateModelBox').remove()
            });
            $.hideback();
        },
        sureModel: function () {
            var res = false;
            if (optiondefault.okFunc) {
                res = optiondefault.okFunc.call(element);
            }
            res && $.closeModel();
        }
    };
    $.extend(modeObj)
})(jQuery, window, document);