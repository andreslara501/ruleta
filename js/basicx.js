var rotation            		= 0;
const mermar_inicial       		= 5;
var mermar              		= mermar_inicial;
var cuanto_mermar       		= 0.05;
var	contador_imagenes 			= 0;
var velocidad_animacion_monedas = 50;

$(document).ready(function(){
	jQuery.fn.rotate = function(degrees) {
		degrees = 360 - degrees;
		$(this).css({'-webkit-transform' : 'rotate('+ degrees +'deg)',
					 '-moz-transform' : 'rotate('+ degrees +'deg)',
					 '-ms-transform' : 'rotate('+ degrees +'deg)',
					 'transform' : 'rotate('+ degrees +'deg)'});
	};

	$('#boton_parar').click(function(){
		if($(this).attr('value')=='true'){
			activar_mermar_velocidad();
			$('#boton_parar').attr('src','img/boton_inactivo.png');
			$('#boton_parar').attr('value','false');
		}
	});

	$('#pin').click(function(){
		mermar = mermar_inicial;
		iniciar_giro();
		$('#boton_parar').attr('src','img/boton_activo.png');
		$('#boton_parar').attr('value','true');
	});

	/* Precargar imágenes */
	for(i=0; i<= 179; i++){
		var objFoto = new Image();
		objFoto.src = 'img/monedas/monedas_ok_' + devolver_con_ceros(i) + '.png';
	}

});

function rotar(){
	if(rotation<=360){
		rotation = rotation + mermar;
	}else{
		rotation=0;
	}

	$('#ruleta_img').rotate(rotation);
}

function mermar_velocidad(){
	if(mermar>0){
		mermar = mermar - cuanto_mermar;
		if(mermar <= 0){
			posicion = ((rotation) / 6) + 1;
			activar_animacion_monedas();
		}
	}else{
		mermar = 0;
		clearInterval(intervalo_mermar_velocidad);

	}
}

function activar_mermar_velocidad(){
	intervalo_mermar_velocidad = setInterval(function(){ mermar_velocidad() }, 100);
}

function iniciar_giro(){
	intervalo = setInterval(function(){ rotar() }, 3);
}

function devolver_con_ceros(numero){
	if(numero<10){
		return '0000' + numero;
	}
	if(numero>=10 && numero<=99){
		return '000' + numero;
	}
	if(numero>=100){
		return '00' + numero;
	}
}

function animacion_monedas(){
	if(contador_imagenes<=179){
		$('#animacion_monedas').attr('src', 'img/monedas/monedas_ok_' + devolver_con_ceros(contador_imagenes) + '.png');
		contador_imagenes++;
	}else{
		$('#contenedor_animacion_monedas').hide();
		contador_imagenes = 0;
		clearInterval(intervalo_animacion_monedas);
	}
}

function activar_animacion_monedas(){
	$('#contenedor_animacion_monedas').show();
	intervalo_animacion_monedas = setInterval(function(){ animacion_monedas() }, velocidad_animacion_monedas);
	return 'Iniciando animacion';
}
