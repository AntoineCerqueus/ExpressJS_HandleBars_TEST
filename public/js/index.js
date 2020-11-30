const $inputSearch = $('#input-search');
// const $document = $(document);
let $tableBody =  $('#table-body');


$(document).on('click', '#button-search', () => {
    console.log('button click');
})

$(document).on('keyup', '#input-search', () => {
    const searchValue = $inputSearch.val();
    // recupere mon template
    const templateHtml = $('#template-products').html();
    console.log(templateHtml);

    // Parametre de la recherche + les parametres de la fonction de callback
    $.get('/products?search=' + searchValue, (products) => {

        // compile et execute le template compilé et l'affiche dans la console
        const template = Handlebars.compile(templateHtml);
        console.log({templateHtml});
        
        const renderHtml = template({ products : products });

        // products : products = products

        // Insert les données dans notre HTML
        $tableBody.html(renderHtml);
    })
})



// todo send ajoax raquest with the search value

