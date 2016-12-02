$('#navigation-create').addClass('active');

let listItems = [];
let isNewList;

//check whether edit/create
if(id !== ''){
	isNewList = false;
	getList();
} else {
	isNewList = true;
}


const ViewModel = {
	listName: ko.observable(),
	observableListItems: ko.observableArray(),
	itemBeingAdded: ko.observable(),
	isEditing: false,
	addItem: function(){
		if(this.itemBeingAdded() !== ''){
			this.observableListItems.push(ko.observable(this.itemBeingAdded()));
			this.itemBeingAdded('');
		} else {
			//TODO: Yell at user for being an idiot
		}
	},
	save: function(){
		console.log(this.observableListItems());
		if(isNewList){
			operation = 'save';
		} else {
			operation = 'update';
		}
		$.ajax ({
			type: 'POST',
			url: '/list/api/save',
			data: {
				operation: operation,
				listId: id,
				listName: this.listName(),
				listItems: this.observableListItems()
			}
		});
		
	},
	changeEditMode: function(){
		this.isEditing = this.isEditing ? false : true;
		if(this.isEditing){
			$('.create-list-item').prop('disabled', false);
			$('.btn-delete').show();
		} else {
			$('.create-list-item').prop('disabled', true);
			$('.btn-delete').hide();
		}
		return true;
	},
	startDelete: function(deletedItem){
		deleteItem(deletedItem);
	}
};

function deleteItem(deletedItem){
	ViewModel.observableListItems.splice(ViewModel.observableListItems().findIndex(item => {
			return item === deletedItem;
		}), 1);
}


function handleData(data){
	const list = JSON.parse(JSON.stringify(data));
	ViewModel.listName(list[0].name);
	for(let i = 0; i < list[0].items.length; i++){
		ViewModel.observableListItems.push(ko.observable(list[0].items[i]));
	}
	console.log(ViewModel.observableListItems());
}

function getList(){
	$.ajax({
		url: `/list/getlist/${id}`,
		type: 'GET',
		success: handleData
	});
}

ko.applyBindings(ViewModel);