$(document).ready( function () {


    if( !localStorage.getItem('temp') ) {
        localStorage.setItem('temp', Date.now())
        localStorage.setItem('likes', JSON.stringify([]))
    }
   
    let likes = $('.like-count')
    let button_like = $('#btn-like')
    let button_delete = $('#btn-delete')
    let imagen_id = button_like.data('id')
    let button_upload = $('#btn-upload')
    let formulario = $('form')
    let storage_likes = JSON.parse( localStorage.getItem('likes') )
    let liked = false
    let spinner = '<div class="spinner-border spinner-border-sm" role="status">' +
    '<span class="sr-only">Loading...</span></div>'    
    _verify_like()
     
    button_like.click( function ( e ){
       e.preventDefault( )
       
       if( !liked ) {
           
           $.post( '/image/' + imagen_id + '/like' )
           .done( resp => { 
               likes.text( resp.likes ) 
               liked = true
               button_like.removeClass('btn-outline-danger')
               button_like.addClass('btn-danger')
               
               let info = { id: imagen_id }
               
               storage_likes.push( info )
        
               localStorage.setItem('likes', JSON.stringify( storage_likes  ) )
           }
           )
   
       } else {
            $.post( '/image/' + imagen_id + '/dislike' )
            .done( resp => {
                likes.text( resp.likes ) 
                liked = false

                storage_likes = _remove_storage_like( imagen_id )
                localStorage.setItem('likes', JSON.stringify( storage_likes  ) )

                button_like.removeClass('btn-danger')
                button_like.addClass('btn-outline-danger')
            })
       }
   
   })

   button_delete.click( function( e ) {
    e.preventDefault()
    let $this = $(this)
    const respuesta = confirm('Seguro de eliminarlo?')

    if( respuesta ) {
        let id = $this.data('id')
        
        $.ajax({
            url: '/image/' + id,
            type: 'DELETE'
        })
        .done( function( resp ) {
            console.log( resp )
        })
    }

   })
   
   $('#form-comment').hide()
   $('#btn-comment').click(function( e ) {
        $('#form-comment').slideToggle()
   })   

   formulario.submit( function( e ) {
        e.preventDefault()
        let iconupload = button_upload.children()
        let card_body = $('#card-add')

        button_upload.children().remove()
        button_upload.append( spinner )

        $.ajax({
        url: formulario.attr('action'),
        type: 'POST',            
        processData: false,
        contentType: false,
        data: new FormData( this ),
        success: function ( respuesta ) {
            imagen_ok = respuesta.imagen
            button_upload.children().remove()
            button_upload.append( iconupload.removeClass('fa fa-upload').addClass('fas fa-check') )
            uniqueId = imagen_ok.archivo.split('.')[0]
            card = `<div class="col-md-4 bounceIn">
                        <div class="card">
                            <a href="/image/${ uniqueId }">
                                <img class="w-100 h-100 img-thumbnail" src="/public/upload/${imagen_ok.archivo}" alt="">
                            </a>
                        </div>
                    </div>`
            card_body.prepend( card )
            setTimeout(function (){
                iconupload.removeClass('fas fa-check').addClass('fa fa-upload')
            },3000)
        }
    })  
   })
   function _verify_like () {
    for (const iterator of storage_likes) {
        if( iterator.id === imagen_id ) {
            liked = true
            button_like.removeClass('btn-outline-danger')
            button_like.addClass('btn-danger')
            break
        }
    }
   }

   function _remove_storage_like ( id ) {
    let new_storage = []

    for (const iterator of storage_likes) {
        if( iterator.id !== id ) {
           new_storage.push( iterator )
        }
    }

    return new_storage
   }
})