$(document).on('ready', init);

function init () {

	$('#btn_add').on('click', note);
  $('#btn_back').on('click', home);
  $('#btn_save').on('click', saveNote);

  getItems();
}

function getItems () {
	if(!localStorage.Notes){
		localStorage.Notes = '[]';
	}

	var Notes = JSON.parse(localStorage.Notes);

	for (var i = 0; i < Notes.length; i++) {
		var Note = Notes[i]; 
		var item = $('<li><p>' + Note.text + '</p></li>');
		$('#list_note').append(item);
	}
}

function home () {
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
	 if(localStorage.item){
		var item = localStorage.item;
		var Notes = JSON.parse(localStorage.Notes);
		var Note = Notes[item];
		$('textarea').val(Note.text);
		$('#btn_save').addClass('hide');
		$('#toolbar').removeClass('hide');
	}
}

function saveNote () {
	var text = $('textarea').val();
	var content = text.replace(' ', '');  
	if(content == ''){
		//Status de Vacio
	}else{
		var Note = { text: text, color: '#FFFF99' };
		var Notes = JSON.parse(localStorage.Notes);
		Notes.push(Note);
		localStorage.Notes = JSON.stringify(Notes);
		home();
	}
}
