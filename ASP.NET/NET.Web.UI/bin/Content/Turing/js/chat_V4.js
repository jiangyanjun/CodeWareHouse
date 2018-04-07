
var ServerHub_chat = $.connection.serverHub;
$(document).ready(function () {
    $.getScript('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js', function (_result) {
        var cip = returnCitySN["cip"];
        $.post("../Home/ChatVerification", { UserAgent: navigator.userAgent, Ip: cip, Token: $("#userToken").val(), Data: JSON.stringify(remote_ip_info) }, function (result) { CallBack(); $('#hidCip').val(cip); })
    })
    window.setInterval(flage, 1000);
    //setInterval("flage", 1000);

});
function CallBack() {
    var t = $("#userToken").val();
    if (window.screen.availHeight < 100) {
        $("#discussions").css("height", window.screen.availHeight - 30);
    }
    else if (window.screen.availHeight < 200) {
        $("#discussions").css("height", window.screen.availHeight - 60);
    }
    else {
        $("#discussions").css("height", window.screen.availHeight - 300);
    }
    ServerHub_chat.client.sendMessage = function (message, count, htmlContext, tk, flage) {
        if (t == tk && flage != null && flage.length > 0) {
            $("#hidflage").val(flage);
        }
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
function send() {
    var t = $("#userToken").val();
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
        if (t == null || t.length < 5) return;
        ServerHub_chat.server.send(message,t,$('#hidCip').val());
        $('#sendmessage').attr('disabled', "true");
        $('#message').attr('disabled', "true");
        $('#message').val('').focus();
    }
}
function flage() {
    var x = $("#hidflage").val();
    if (x != null && x.length > 1) {
        alert(x);
        return window.location.href = 'http://kebue.com/';
    }
}
