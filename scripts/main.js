const API_URL = 'https://makeup-api.herokuapp.com/api/v1/products.json?product_type='
const DEFAULT_DESCRIPTION = 'No description was provided.'

const lastActive = null

$(window).bind("load", function() {
    $('.nav-btn').on('click', function() {
        $('a').removeClass('active')
        $(this).addClass('active')

        $('#load-wrapper').show()
        requestProducts($(this).attr('category'))
    })

    $('#products').removeClass('container')
    $('#products').addClass('text-box')

    $('#products').append(`
        <p>Lista de produse este goala.</p>
        <p>Selectati o categorie din meniu pentru a vedea lista de produse.
    `)

    $('#load-wrapper').hide()
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

    $('#products').removeClass('container')
    $('#products').removeClass('text-box')
    $('#products').addClass('container')
    $('#products').empty()

    let index = 0;
    data.forEach(function(product) {
        $('#products').append(`
            <div id='card-${ index }' class='card center'>
                <img class='card-image' src='${ product.image_link }'>
                <div class='card-header'>
                    <h3>${ product.name }</h3>
                    <span class='card-price'>${ product.price_sign ? product.price_sign : "$" }${ product.price ? product.price : "0.0" }</span>
                    <div class='card-description'>
                        <p>${ product.description ? product.description : DEFAULT_DESCRIPTION }</p>
                        <p>Category: ${ product.product_type ? product.product_type : "unknown" }</p>
                        <p>Brand: ${ product.brand ? product.brand : "unknown" }</p>
                    </div>
                    <div class='flex-container'>
                        <button class='btn btn-primary' onClick='showConfirmationCard(${ index }, "apply")'>Apply</button>
                        <button class='btn btn-outline' onClick='showConfirmationCard(${ index }, "mark")'>Mark</button>
                    </div>
                </div>
                <div id='card-confirmation-${ index }' class='card-confirmation'>
                    <div class='flex-column'>
                        <div><button class='btn btn-primary' onClick='confirmCard(${ index })'>Confirm</button></div>
                        <div><button class='btn btn-outline' onClick='hideConfirmationCard(${ index })'>Cancel</button></div>
                    </div>
                </div>
            </div>
        `)
        ++index;
    })

    if (data.length == 0) {
        $('#products').removeClass('container')
        $('#products').addClass('text-box')
        $('#products').append(`
            <p>Lista de produse este goala.</p>
            <p>Selectati o categorie din meniu pentru a vedea lista de produse.
        `)
    }

    $('#load-wrapper').hide()
}

function confirmCard(index) {
    if ($(`#card-${ index }`).hasClass('apply')) {
        applyCard(index)
    } else {
        markCard(index)
    }
}

function applyCard(index) {
    $(`#card-${ index }`).removeClass('card-marked')
    $(`#card-${ index }`).addClass('card-applied')
    hideConfirmationCard(index, 'apply')
}

function markCard(index) {
    $(`#card-${ index }`).removeClass('card-applied')
    $(`#card-${ index }`).addClass('card-marked')
    hideConfirmationCard(index)
}

function showConfirmationCard(index, className) {
    $(`#card-confirmation-${ index }`).addClass('card-show')
    $(`#card-${ index }`).addClass(className)
}

function hideConfirmationCard(index) {
    $(`#card-confirmation-${ index }`).removeClass('card-show')
    $(`#card-${ index }`).removeClass('apply')
    $(`#card-${ index }`).removeClass('mark')
}