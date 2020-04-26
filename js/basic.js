var rotation            		= 0;
const mermar_inicial       		= 10;
var mermar              		= mermar_inicial;
var cuanto_mermar       		= 0.05;
var	contador_imagenes 			= -100;
var velocidad_animacion_monedas = 50;
var reproductor 				= document.getElementById("myAudio");

$(document).ready(function(){
	jQuery.fn.rotate = function(degrees) {
		degrees = 360 - degrees;
		$(this).css({'-webkit-transform' : 'rotate('+ degrees +'deg)',
					 '-moz-transform' : 'rotate('+ degrees +'deg)',
					 '-ms-transform' : 'rotate('+ degrees +'deg)',
					 'transform' : 'rotate('+ degrees +'deg)'});
	};

	$('#boton_parar').click(function(){
		$('#numero_ganador').fadeOut();
		mermar = mermar_inicial;
		iniciar_giro();
		activar_mermar_velocidad();

		if($(this).attr('value')=='true'){
			$('#boton_parar').attr('src','img/boton_inactivo.png');
			$('#boton_parar').attr('value','false');

			/* Sonido ruleta*/
			var reproductor = document.getElementById("myAudio");
			reproductor.setAttribute("src", "sonidos/ruleta.mp3")
			reproductor.play();
		}
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
			posicion 			= ((rotation) / 6) + 1;
			posicion_tmp 		= Math.trunc(posicion);

			if((posicion - posicion_tmp) > 0.5){
				$('#numero_ganador').text('Ganador: ' + (Math.trunc(posicion) + 1));
			}else{
				$('#numero_ganador').text('Ganador: ' + Math.trunc(posicion));
			}

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
	if(contador_imagenes==-99){
		$('#numero_ganador').fadeIn();
		var reproductor = document.getElementById("myAudio");
		reproductor.setAttribute("src", "sonidos/ganado.mp3")
		reproductor.play();
	}

	if(contador_imagenes<=179){
		if(contador_imagenes==0){
			var reproductor = document.getElementById("myAudio");
			reproductor.setAttribute("src", "sonidos/monedas.mp3")
			reproductor.play();
		}
		if(contador_imagenes>=0){
			$('#contenedor_animacion_monedas').show();
			$('#animacion_monedas').attr('src', 'img/monedas/monedas_ok_' + devolver_con_ceros(contador_imagenes) + '.png');
		}
		contador_imagenes++;
	}else{
		$('#contenedor_animacion_monedas').hide();
		contador_imagenes = -100;
		clearInterval(intervalo_animacion_monedas);
		$('#boton_parar').attr('src','img/boton_activo.png');
		$('#boton_parar').attr('value','true');
	}


}

function activar_animacion_monedas(){
	intervalo_animacion_monedas = setInterval(function(){ animacion_monedas() }, velocidad_animacion_monedas);
	return 'Iniciando animacion';
}

function sonido_ganado(){
	document.getElementById("myAudio").play();
}

function sonido_monedas(){
	reproductor.setAttribute("src", "sonidos/monedas.mp3")
	reproductor.play();
}
