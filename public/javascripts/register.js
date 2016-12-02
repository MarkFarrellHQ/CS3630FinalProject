$('#navigation-signup').addClass('active');


function CheckFields(){
	if(ViewModel.username() !== '' 
		&& ViewModel.password() !== '' 
		&& ViewModel.confirmPassword() !== '' 
		&& ViewModel.displayName() !== '' 
		&& ViewModel.password() === ViewModel.confirmPassword()){
			return true;
		}
	else
		return false;
}

function SaveUser(username, password, displayName){
	$.ajax({
		url: '/user/api/save',
		type: 'POST',
		data: {
			username: username,
			password: password,
			displayName: displayName
		}
	});
		
}

const ViewModel = {
	username: ko.observable(),
	password: ko.observable(),
	confirmPassword: ko.observable(),
	displayName: ko.observable(),
	register: function(){
		if(CheckFields())
			SaveUser(this.username(), this.password(), this.displayName());
		else
			//TODO: Tell user invalid input
			console.log('Invalid input');

	}
};

ko.applyBindings(ViewModel);