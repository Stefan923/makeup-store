const API_URL = 'https://makeup-api.herokuapp.com/api/v1/products.json?product_type='
const DEFAULT_DESCRIPTION = 'No description was provided.'

const lastActive = null

$(window).bind("load", function() {
    $('.nav-btn').on('click', function() {
        $("a").removeClass("active")
        $(this).addClass("active")

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
    $('#products').empty()
    data.forEach(function(product) {
        $('#products').append(`
            <div class='card center'>
                <img class='card-image' src='${ product.image_link }'>
                <div class='card-header'>
                    <h3>${ product.name }</h3>
                    <span class='card-price'>${ product.price_sign ? product.price_sign : "$" }${ product.price ? product.price : "0.0" }</span>
                    <div class='card-description'>
                        <p>${ product.description ? product.description : DEFAULT_DESCRIPTION }</p>
                        <p>Category: ${ product.product_type ? product.product_type : "unknown" }</p>
                        <p>Brand: ${ product.brand ? product.brand : "unknown" }</p>
                    </div>
                </div>
            </div>
        `)
    })
}