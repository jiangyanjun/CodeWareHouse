
jQuery(function ($) {
    var url = 'http://chaxun.1616.net/s.php?type=ip&output=json&callback=?&_=' + Math.random();
    $.getJSON(url, function (data) {
        CallbackIp(data.Ip);
    });
});
jQuery(function ($) {
    $.getScript('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js', function (_result) {
        if (remote_ip_info.ret == '1') {
            CallbackClientAddress(remote_ip_info);
        }
    })
});
function CallbackIp(Ip) {
    $("#hidip").val(Ip);
}
function CallbackClientAddress(json) {
    $("#hidClientAddress").val(JSON.stringify(json));
}
function Alert(result) {
    layer.alert(result, {
        skin: 'layui-layer-lan'
               , closeBtn: 0
               , shift: 4
    });
}
function CheckIsNull(exp) {
    if (exp != null && exp != "" && exp != "undefined") {
        return true;
    } else {
        Alert("带红色星为必填项")
        return false;
    }
}
$(document).ready(function () {
    $("#btnNewKnow").click(function () {
        var KnowModel = {
            Ip: $("#hidip").val(),
            ClientAddressJson: $("#hidClientAddress").val(),
            Info: $("#KnowName").val(),
            Text: $("#KnowAnswer").val(),
            Code: $("#KnowType").val()
        }
        if (CheckIsNull(KnowModel.Info) && CheckIsNull(KnowModel.Text) && CheckIsNull(KnowModel.Code)) {
            $.ajax({
                type: "POST", url: "/Home/PostNewKnow/", data: KnowModel, success: function (result) {
                    Alert(result.result);
                    if (result.status > 0) {
                        $("#KnowName").val("");
                        $("#KnowAnswer").val("");
                    }
                }
            });
        }
    })
})
