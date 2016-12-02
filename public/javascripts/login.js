$('#navigation-login').addClass('active');

function Authenticate(username, password){
	$.ajax({
		url: '/user/api/login',
		type: 'POST',
		data: {
			username: username,
			password: password,
		},
		success: function(data){
			alert('Successfully Logged In');
		},
		error: function(){
			alert('Error logging in');
		}
	});
}

const ViewModel = {
	username: ko.observable(),
	password: ko.observable(),
	login: function(){
		Authenticate(this.username(), this.password());
	}
};

ko.applyBindings(ViewModel);