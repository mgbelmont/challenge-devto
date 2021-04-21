/* NAVIGATION  */

$(document).ready(function () {
    $(".cont-wrapp").load('./views/home.html')
})


$('#post-btn-nav').click(ev=> {
    let view = ev.target.dataset.view;
    let url = "./views/newPost.html"
    $(".cont-wrapp").load('./views/newPost.html')
})

$('.dropdown-menu a').click(event => {
    event.preventDefault()
    let view = event.target.dataset.view
    if(view){
        let url = `./views/${view}.html`
        $(".cont-wrapp").load(url, view)
    }else {
        alert('La opcion se encuentra deshabilitada...')
    }
   /*
    console.log(event.target)
   */
})


