$('#navigation-list').addClass('active');

//Query Database to populate lists[]
let lists = [];
let currentPrimaryKey = '';

function handleData(data){
	lists = JSON.parse(JSON.stringify(data));
	for(let i = 0; i < lists.length; i++){
		lists[i].url = `/list/edit/${lists[i]._id}`;
		lists[i].confirmDelete = function(){
			$('#confirmDeleteModal').modal('show');
			setCurrentPrimaryKey(lists[i]._id);
		};
	}
	CreateUI();
}

function loadData(){
	$.ajax({
		url: '/list/load',
		type: 'GET',
		success: handleData
	});
}



function setCurrentPrimaryKey(pk){
	currentPrimaryKey = pk;
}



loadData();


//Create the UI
function CreateUI(){

	$('.list-background').append($(`<div class='list-container' data-bind='foreach: observeLists'>
										<div class='row'>
											<div class='col-md-8'>
												<a class='list-item' data-bind='attr: { href: url }, text: name'> </a>
											</div>
											<div class='col-md-4 btn-container'>
												<button type='submit' class='btn-delete' data-bind='click: confirmDelete'>X</button>
											</div>
										</div>
									</div>`));

	
	const ViewModel = {
		observeLists: ko.observableArray(lists),
		deleteList: function(){
			this.observeLists.splice(this.observeLists().findIndex(item => {
				
				return item._id === currentPrimaryKey;
			}), 1);

			console.log(this.observeLists());
			$.ajax({
				url: '/list/api/delete',
				type: 'POST',
				data: {
					id: currentPrimaryKey
				}
			});	
			$('#confirmDeleteModal').modal('hide');
		}
	};

	ko.applyBindings(ViewModel);
}


