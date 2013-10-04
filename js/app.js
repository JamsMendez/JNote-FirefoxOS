$(document).ready(init);

function init () {
	// Agregar los Eventos a los Componentes
	$('#btn_add').on('click', addNote);
  $('#btn_back').on('click', home);
  // Llama a la funcion getItems
  getItems();
}

function getItems () {
	/*
	 * Si no esta definida Notes sera igual
	 * a un Arreglo Vacio
	*/
	if (localStorage.Notes === "undefined") {
		localStorage.Notes = '[]';
	}
	
	// Borra los Elementos de la Lista 
	$('#list_note').empty();

	// Convierte String a JSON
	var Notes = JSON.parse(localStorage.Notes);
	/*
	 * Recorre los elementos del Arreglo resultante
	 * y los agregar a la lista de notas
	*/
	for (var i = 0; i < Notes.length; i++) {
		var Note = Notes[i]; 
		var item = $('<li><p>' + Note.text + '</p></li>');
		// Se le asigna el evento al elemento de la lista
		item.on('click', getIndex);
		$('#list_note').append(item);
	}
}

function home () {
	// Se agregan y eliminan las Clases para la Animación
	$('#note').addClass('right');
  $('[data-position="current"]').addClass('current');
  $('#note').removeClass('current');
  $('[data-position="current"]').removeClass('left');
  getItems();
}

function note () {
	$('#note').addClass('current');
  $('[data-position="current"]').addClass('left');
  $('#note').removeClass('right');
  $('[data-position="current"]').removeClass('current');
  getNote();
}

function getNote () {
	$('#buttons').empty();
	var item = localStorage.item
	if (!(item === "undefined")) {
		/*
		* Se obtiene el indice de la lista de 
		* Notas, se obtiene el Objeto que responde 
		* a indice y se agrega la propiedad text al
		* textarea
		*/
		var item = localStorage.item;
		var Notes = JSON.parse(localStorage.Notes);
		var Note = Notes[item];
		$('textarea').val(Note.text);
		//Se crear un Buton y se agregar el evento
		var btn_delete = $('<button><span class="icon icon-close"></span></button>');
		btn_delete.on('click', deleteNote);
		$('#buttons').append(btn_delete);
	} else {
		/*
		 * Se crear un Buton y se agregar el evento
		 * y se borrar el contenido del textarea
		*/
		var btn_save = $('<button><span class="icon icon-edit"></span></button>');
		btn_save.on('click', saveNote);
		$('#buttons').append(btn_save);
		$('textarea').val('');
	}
}

function addNote () {
	var item = localStorage.item
	if (!(item === "undefined")) {
		localStorage.item = undefined;
	}
	note();
}

function saveNote () {
	var text = $('textarea').val();
	var content = text.replace(' ', '');  
	if (content == '') {
		//Status de Vacio
	} else{
		var Note = { text: text, color: '#FFFF99' };
		var Notes = JSON.parse(localStorage.Notes);
		Notes.push(Note);
		localStorage.Notes = JSON.stringify(Notes);
		home();
	}
}

function deleteNote () {
	var item = localStorage.item;
	if (!(item === "undefined")) {
		if (item != -1) {
			var Notes = JSON.parse(localStorage.Notes);
			Notes.splice(item, 1);
			localStorage.Notes = JSON.stringify(Notes);
		}
	}
	home();
}

function getIndex () {
	var item = $(this).index();
	localStorage.item = item;
	note();
}
