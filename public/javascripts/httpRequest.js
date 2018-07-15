$('#send').on('click', function() {
    $.post( 'http://localhost:3000', $('#data').serialize() )
    .done(function( data ) {
        alert("送信しました！in done")
    })
});
$('#lightOn').on('click', function() {
    $.post( 'http://localhost:3000/realtime', $('#lightData').serialize() )
    .done(function( lightData ) {
        alert("送信しました！in done")
    })
});
