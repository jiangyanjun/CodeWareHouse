
var isF = false;
var ServerHub_chat = $.connection.serverHub;
var browser = {
    versions: function () {
        var u = navigator.userAgent, app = navigator.appVersion;
        return {//移动终端浏览器版本信息   
            trident: u.indexOf('Trident') > -1, //IE内核  
            presto: u.indexOf('Presto') > -1, //opera内核  
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核  
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核  
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端  
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端  
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器  
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器  
            iPad: u.indexOf('iPad') > -1, //是否iPad    
            webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部  
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
}
$(document).ready(function () {
    jQuery(function ($) {
        var modelType;
        if (browser.versions.mobile || browser.versions.ios || browser.versions.android ||
            browser.versions.iPhone || browser.versions.iPad) {
            modelType = "mb";
        } else
            modelType = "pc";
        $.post("../Home/UserlegitimacyVerification", { OS: navigator.userAgent, Ip: returnCitySN["cip"], modelType: modelType, Browser_1: navigator.appVersion }, function (result) {
            if (result == "0" || result <= 0) {
                layer.alert(decodeURIComponent("\u60a8\u6d89\u5acc\u591a\u6b21\u6076\u610f\u64cd\u4f5c\uff0c\u5c06\u9650\u5236\u8fdb\u5165\uff0c\u8bf7\u8054\u7cfb\u7ad9\u957f\uff0c\u0051\u0051\u003a\u0036\u0039\u0030\u0035\u0034\u0031\u0033\u0033\u0037"), { skin: 'layui-layer-lan', closeBtn: 0, shift: 4 });
                return location.href = " http://kebue.com/";
            } else {
                if (window.screen.availHeight < 100) {
                    $("#discussions").css("height", window.screen.availHeight - 30);
                }
                else if (window.screen.availHeight < 200) {
                    $("#discussions").css("height", window.screen.availHeight - 60);
                }
                else {
                    $("#discussions").css("height", window.screen.availHeight - 300);
                }
                ServerHub_chat.client.sendMessage = function (message, count, htmlContext) {
                    $('#countTol').text(count);
                    if (htmlContext == null || message == null) return;
                    $('#discussions').append('<li class="row"><div class="chat"><div class="chat-left col-xs-6"><div class="row"><div class="col-xs-3"><strong>科小智</strong><p><img src="../../Content/image/im.jpg" title="我是科布尔--科小智--机器人" width="35" height="35"></p></div><div class="col-xs-9"><div class="chat-context chat-left-context">' + message + '</div></div></div></div>' + htmlContext + '</div></li>');
                    if ($('#ISScraper').val() == decodeURIComponent("\u5237\u5c4f\u5173\u95ed")) {
                        lct = document.getElementById('discussions');
                        lct.scrollTop = Math.max(0, lct.scrollHeight - lct.offsetHeight);
                    }
                    $('#sendmessage').removeAttr("disabled");
                    $('#message').removeAttr("disabled");
                    $('#message').focus();
                };
                $('#message').focus();
                $.connection.hub.start().done(function () {
                    $('#sendmessage').click(function () {
                        send();
                    });
                    $('#message').keydown(function (e) {
                        if (e.keyCode == 13) {
                            send();
                        }
                    });
                    $('#ISScraper').click(function () {
                        if ($('#ISScraper').val() == decodeURIComponent("\u5f00\u542f\u5237\u5c4f")) {
                            $('#ISScraper').removeClass("btn-success");
                            $('#ISScraper').addClass("btn-default");
                            $('#ISScraper').val(decodeURIComponent("\u5237\u5c4f\u5173\u95ed"));
                        }
                        else {
                            $('#ISScraper').removeClass("btn-default");
                            $('#ISScraper').addClass("btn-success");
                            $('#ISScraper').val(decodeURIComponent("\u5f00\u542f\u5237\u5c4f"));
                        }
                    });
                    $('#NewKnow').click(function () {
                        location.href = "/Home/NewKnow";
                    });
                });
            }
        });
    });
});
function send() {
    var message = $('#message').val();
    if (message == null || message == undefined || message == '') {
        return;
    } else {
        var array = decodeURIComponent($("#hidFilterKey").val()).split(',');
        $.each(array, function (n, value) {
            if (message.indexOf(value) >= 0) {
                layer.alert(decodeURIComponent("\u4f60\u952e\u5165\u7684\u5b57\u7b26\u542b\u6709\u8fdd\u53cd\u56fd\u5bb6\u6cd5\u5f8b\u6cd5\u89c4\u4e0d\u5141\u8bb8\u7684\u5b57\u7b26\u002c\u5982\u8bfa\u591a\u6b21\u6076\u610f\u5c06\u4f1a\u9650\u5236\u8fdb\u5165\uff0c\u8bf7\u81ea\u91cd"), { skin: 'layui-layer-lan', closeBtn: 0, shift: 4 });
                return;
            }
        });
        ServerHub_chat.server.send(message);
        $('#sendmessage').attr('disabled', "true");
        $('#message').attr('disabled', "true");
        $('#message').val('').focus();
    }
}
function Alert(result) {
    layer.alert(result, {
        skin: 'layui-layer-lan'
               , closeBtn: 0
               , shift: 4
    });
}