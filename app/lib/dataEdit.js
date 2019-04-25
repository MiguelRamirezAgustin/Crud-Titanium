exports.edit = function(title, details, id) {

	var mainView = Ti.UI.createView({
		width : Ti.UI.FILL,
		height : 200,
		layout : 'vertical',
	      borderRadius:3,
		
	});
	var titleData = Ti.UI.createTextField({
		right : 10,
		left : 10,
		top : 5,
		backgroundColor : "#fff",
		color:'black',
		borderColor:'white',
		borderWidth:1,
		height : Ti.UI.SIZE,
		maxLength:85,
		borderRadius:3,
		softKeyboardOnFocus : Ti.UI.Android.SOFT_KEYBOARD_DEFAULT_ON_FOCUS, 
		keyboardType : Titanium.UI.KEYBOARD_ASCII,
		returnKeyType : Ti.UI.RETURNKEY_NEXT,
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	mainView.add(titleData);
	var description = Ti.UI.createTextField({
		top : 10,
		right : 10,
		left : 10,
		bottom : 5,
		backgroundColor : "#fff",
		color:'black',
		borderColor:'white',
		borderWidth:1,
		height : Ti.UI.SIZE,
		maxLength:85,
		borderRadius:3,
		softKeyboardOnFocus : Ti.UI.Android.SOFT_KEYBOARD_DEFAULT_ON_FOCUS, 
		keyboardType : Titanium.UI.KEYBOARD_ASCII,
		returnKeyType : Ti.UI.RETURNKEY_NEXT,
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
	});

	mainView.add(description);
	var dialog = Ti.UI.createAlertDialog({
		title : 'Actualizar Information ',
		buttonNames : ['Actualizar', "Cancelar"],
		androidView : mainView,
		tintColor:'#298FB2',
	});
	titleData.setValue(title);
	description.setValue(details);
	dialog.addEventListener('click', function(e) {
		if (e.index == 0) {
			Ti.API.info('actualizacion ' + JSON.stringify(e));
			var db = require('/db');
			db.updateinfo(titleData.value, description.value, id);
			Ti.App.fireEvent('tableUpdate');
			alert('Actualizacion correcta');
		}

	});

	dialog.show();

}; 