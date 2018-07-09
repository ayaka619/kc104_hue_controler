$('#send').on('click', function() {
    $.post( 'http://localhost:3000', $('form').serialize() )
    .done(function( data ) {
        alert("送信しました！in done")
    })
});
