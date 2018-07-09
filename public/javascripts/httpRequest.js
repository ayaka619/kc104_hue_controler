$('#send').on('click', function() {
    let data = {
        startAm: $("#startAm").val(),
        endAm: $("#endAm").val(),
        amColorTmp: $("#amColorTmp").val(),
        startPm: $("#startPm").val(),
        endPm: $("#endPm").val(),
        pmColorTmp: $("#pmColorTmp").val()
    }
    alert(data.startAm);

    $.post( 'https://radiant-reaches-45097.herokuapp.com/1en6hl61', $('form').serialize() )
    .done(function( data ) {
        console.log( data.form );
    })

    // // 通信実行
    // $.ajax({
    //     type:"post",                // method = "POST"
    //     url:"https://radiant-reaches-45097.herokuapp.com/1en6hl61",        // POST送信先のURL
    //     data:JSON.stringify(data),  // JSONデータ本体
    //     contentType: 'application/json', // リクエストの Content-Type
    //     dataType: "json",        // レスポンスをJSONとしてパースする
    // }).done(function(json_data) {   // 200 OK時
    //     // JSON Arrayの先頭が成功フラグ、失敗の場合2番目がエラーメッセージ
    //     if (!json_data[0]) {    // サーバが失敗を返した場合
    //         alert("Transaction error. " + json_data[1]);
    //         return;
    //     }
    //     // 成功時処理
    //     location.reload();
    // }).fail(function(jqXHR, textStatus, errorThrown) { 
    //     alert("XMLHttpRequest : " + jqXHR.status);
    //     alert("textStatus : " + textStatus);
    //     alert("errorThrown : " + errorThrown);  
    // }).always(function() {      // 成功・失敗に関わらず通信が終了した際の処理
    //     button.attr("disabled", false);  // ボタンを再び enableにする
    // })
});
