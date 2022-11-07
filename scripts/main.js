const API_URL = 'https://makeup-api.herokuapp.com/api/v1/products.json?product_type='

$(window).bind("load", function() {
    $('.nav-btn').on('click', function() {
        console.log('test')
        requestProducts($(this).attr('category'))
    })
})

function requestProducts(category) {
    $.ajax({
        url: `${ API_URL }${ category }`,
        method: 'GET',
        dataType: "json",
        success: function(data) {
            console.log('t')
            data.forEach(function(product) {
                $('#products').append('<p>' + product.name + '</p>')
            })
        }
    })
}

function loadProducts(data) {
    console.log('t')
    data.forEach(function(product) {
        $('#products').append('<p>' + product.name + '</p>')
    })
}