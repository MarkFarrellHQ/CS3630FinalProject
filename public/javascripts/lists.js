$('#navigation-list').addClass('active');

// const ViewModel = (() => {
// 	const _lists = new WeakMap();
//     const _id = new WeakMap();

// 	class ViewModel {
// 		get Lists() {return _lists.get(this);}
//         get Id() {return _lists.get(this);}

// 		constructor(list){
// 			const mappedList = list.map(l => {
// 				return { name: ko.observable(l.name) };
// 			});
// 			_lists.set(this, ko.observableArray(mappedList));
// 		}
// 	}
// 	return ViewModel;
// })();

// ko.applyBindings(new ViewModel());