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
        success: loadProducts,
    })
}

function loadProducts(data) {
    console.log(data)
    data.forEach(function(product) {
        $('#products').append(`<div class='item'><img class='item-image' src='${ product.image_link }'><p>${ product.name }</p></div>`)
    })
}