( function($){
    $.fn.galeria = function( datos){
    var elemento = {
        'class': $( this).attr( 'class')
    }
//    console.log( datos);
    
    // saber dimensines de la pantalla
    function pantalla(){
        var resolucion = $( 'body').width();
        var tipoPantalla;
        if( resolucion <= 640)
            tipoPantalla = 'movil';
        if( resolucion > 640 && resolucion < 1024)
            tipoPantalla = 'tablet';
        if( resolucion >= 1024)
            tipoPantalla = 'escritorio';
        return tipoPantalla;
    }     
    
    function asignarTamanio( contenedor, totalImgRelativo, capa){
        return parseFloat(( capa.width() / capa.height()) / totalImgRelativo) * 100;
    }
        
    function regilla(){
        var resolucion = pantalla();        
        // dimencion del contenedor
        var img = $( '.'+elemento.class+' '+datos.capa);
        var totalImg = 0;
        var totalImgRelativo = 0;
        var contarImg = -1;
        var ultimaLinea = 0;
        var contenedor = $( '.'+elemento.class).css('width').replace( 'px', '');
        
        for( var x = 0; x < img.length; x++){
            // seleccionando columnas segun la resolucion
            if( contarImg < ( datos[resolucion]-1)){
                contarImg++;
                totalImg += img.eq( x).width(); 
                totalImgRelativo += img.eq( x).width() / img.eq( x).height(); 
            }else{
                // asignar tamaños para las imagines
                contarImg = 0;
                for( y = datos[resolucion]; y > 0; y--)
                    img.eq( x-y).width( asignarTamanio( contenedor, totalImgRelativo, img.eq(x-y)) + '%');
                // limpando atributos
                totalImg = img.eq( x).width();
                totalImgRelativo = img.eq( x).width() / img.eq( x).height();
                // ultima imagen que se asignao 
                var ultimo = x;
            }
            // imagenes restantes
            if( (x+1) == img.length){
                // asignado tamaño imagenes restantes
                if( ( img.length - ultimo) > 1){
                    for( y = ultimo; y < img.length; y++)
                        img.eq(y).width( asignarTamanio( contenedor, totalImgRelativo, img.eq(y))+'%');
                }else img.eq( ultimo).width( ( 100 / datos[resolucion])+'%');
            }
                
        }
    }
    
    $( '.'+elemento.class+' '+datos.capa).hide();
    // ejecutar cuando la pagina a cargado totalmente
    $( window).load( function(){
        regilla();
        $( '.'+elemento.class+' '+datos.capa).show();
    });
        
    // ejecutar en caso de cambio de tamaños
    $( window).resize( function(){ regilla();});
        
//    console.log( elemento);
    }
})(jQuery);
