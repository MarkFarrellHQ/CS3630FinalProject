$('#navigation-list').addClass('active');

//Query Database to populate lists[]
let lists = [];

function handleData(data){
	lists = JSON.parse(JSON.stringify(data));
	CreateUI();
}

function loadData(){
	$.ajax({
		url: '/list/load',
		type: 'GET',
		success: handleData
	});
}

loadData();


//Create the UI
function CreateUI(){
	$('.list-background').append($( `<div class='list-container data-bind='foreach: observeLists'></div>`));

	for(let i = 0; i < lists.length; i++){
		$('.list-container').append($(`<div class='row' id='list-item-${i}'>
							<div class='col-md-8'>
							<a class='list-item' href='/edit/${lists[i]._id}'>${lists[i].name}</a></div>
							<div class='col-md-4'>
							<button type='submit' class='btn-delete'>X</button></div></div>`));
	}
}

const ViewModel = {
	observeLists: ko.observableArray(lists)
};

ko.applyBindings(ViewModel);
