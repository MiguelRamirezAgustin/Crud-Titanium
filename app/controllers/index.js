$.index.open();
var DB = require('/db');
var dataEditt =require('/dataEdit');

//var dataEditt = require('ui/common/dataEdit');

$.index.addEventListener("open", function() {
	if (Ti.Platform.osname === "android") {
		if (!$.index.activity) {
			Ti.API.error("acceo a aplicacion");
		} else {
			actionBar = $.index.activity.actionBar;
			if (actionBar) {
				//actionBar.backgroundImage = "/bg.png";
				actionBar.title = "Crud App";
				actionBar.icon = "/images/icon.png";
				actionBar.displayHomeAsUp = true;
				actionBar.onHomeIconItemSelected = function() {
					alert("Home icon clicked!");
				};
			}
		}
	}
});

var search = Ti.UI.Android.createSearchView({
	hintText : "Buscar Personal",
	hintTextColor :'#DCDEDE',
	borderColor:'#298FB2',
	borderRadius:2,
	backgroundColor:'#25A9D6'
});

$.index.activity.onCreateOptionsMenu = function(e) {
	var menu = e.menu;

	var menuItem0 = menu.add({
		title : 'Table Search',
		actionView : search,
		icon : (Ti.Android.R.drawable.ic_menu_search ? Ti.Android.R.drawable.ic_menu_search : "my_search.png"),
		showAsAction : Ti.Android.SHOW_AS_ACTION_IF_ROOM | Ti.Android.SHOW_AS_ACTION_COLLAPSE_ACTION_VIEW
	});

	var menuItem001 = menu.add({
		title : "LiVE",
		icon : "images/compose_icon.png",
		showAsAction : Ti.Android.SHOW_AS_ACTION_IF_ROOM,
		color:'black'
	});

	var menuItem1 = menu.add({
		title : "Refress",
		//icon : "images/compose_icon.png",
		showAsAction : Ti.Android.SHOW_AS_ACTION_IF_ROOM
	});
	menuItem1.addEventListener("click", function(e) {
		Ti.API.info("Action Item Clicked!");
	});

	var menuItem2 = menu.add({
		title : "Help",
		//icon : "images/compose_icon.png",
		showAsAction : Ti.Android.SHOW_AS_ACTION_IF_ROOM
	});
	menuItem2.addEventListener("click", function(e) {
		Ti.API.info("Action Item Clicked!");
	});

	var menuItem3 = menu.add({
		title : "Check for updates",
		//icon : "images/compose_icon.png",
		showAsAction : Ti.Android.SHOW_AS_ACTION_IF_ROOM
	});
	menuItem3.addEventListener("click", function(e) {
		Ti.API.info("Action Item Clicked!");
	});
};

// crear Button.
var save = Ti.UI.createButton({
	title : 'Guardar',
	height : '40dp',
	width : '100dp',
	left : '37%',
	top:15,
	backgroundColor:'#298FB2',
	borderRadius:3

});

var textArea = Ti.UI.createTextArea({
	height : 50,
	maxLength:45,
	backgroundColor : "#fff",
	top : 27,
	color : '#000',
	left : 10,
	right : 10,
	width : Titanium.UI.FILL,
	hintText : 'Nombre',
	hintTextColor : '#8BCBE1',
	borderColor:'#298FB2',
	borderWidth:1,
	borderRadius:3,
	hintType :Titanium.UI.HINT_TYPE_STATIC,
	//softKeyboardOnFocus : Ti.UI.Android.SOFT_KEYBOARD_DEFAULT_ON_FOCUS, 
	//keyboardType : Ti.UI.KEYBOARD_DEFAULT,
	//returnKeyType : Ti.UI.RETURNKEY_DEFAULT,
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});

$.index.add(textArea);

var details = Ti.UI.createTextArea({
	height : Titanium.UI.SIZE,
	maxLength:150,
	top : 10,
	color : '#000',
	left : 10,
	right : 10,
	width : Titanium.UI.FILL,
	hintText : 'Description',
	backgroundColor : "#fff",
	hintTextColor : '#8BCBE1',
	borderColor:'#298FB2',
	borderWidth:1,
	borderRadius:3,
	hintType :Titanium.UI.HINT_TYPE_ANIMATED,
	//softKeyboardOnFocus : Ti.UI.Android.SOFT_KEYBOARD_DEFAULT_ON_FOCUS, // Android only
	keyboardType : Ti.UI.KEYBOARD_DEFAULT,
	returnKeyType : Ti.UI.RETURNKEY_DEFAULT,
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});

$.index.add(details);


//Listener para guardar

save.addEventListener('click', function() {
	if (textArea.value == '') {
		alert('El campo nombre es obrigatorio  \y no pueden estar vacio');

	} else {
		Ti.API.info('guardar datos ');
		var title = textArea.value;
		var detailsValue = details.value;
		if(detailsValue.length > 149){
			alert('La informacion del campo detalle \contiene muchos datos');
		}else{
			textArea.setValue('');
			details.setValue('');
			DB.add(title, detailsValue);
			Ti.App.fireEvent('tableUpdate');
			alert('Registro con exito');
		}
		
	}

	textArea.blur();

});

$.index.add(save);

//crear tableView
var tableData = [];
var tableView = Ti.UI.createTableView({
	data : tableData,
	top : 5,
	search : search,
	borderColor:'#298FB2'
});

Ti.App.addEventListener('tableUpdate', refresh);
refresh();
function refresh() {
	tableData = [];
	var db = require('/db');
	var infoData = db.getinfo();
	for (var i = 0; i < infoData.length; i++) {
		var row = Ti.UI.createTableViewRow({
			className : 'forumEvent', 
			selectedBackgroundColor : 'red',
			rowIndex : i, 
			height : 'auto',
			title : infoData[i].title,
			id : infoData[i].id,
			details : infoData[i].description,
			borderColor:'#30C6FA'

		});
		//alert(infoData[i].id);

		var img = Ti.UI.createImageView({
			width:'11%',
			height:'30%',
			image:'/images/chico.png',
			top : 8,
			left : 10,
			right : 75

		});
		row.add(img);
		var title = Ti.UI.createLabel({
			color : 'black',
			font : {
				fontFamily : 'Arial',
				fontSize : 15,
				fontWeight : 'normal'
			},
			text : infoData[i].title,
			top : 48,
			left : 10,
			right : 75,

		});
		row.add(title);

		var discription = Ti.UI.createLabel({
			color : '#C2C1C1',
			font : {
				fontFamily : 'Arial',
				fontSize : 13,
				fontWeight : 'normal'
			},
			text : infoData[i].description,
			top : 67,
			left : 10,
			right : 60,

		});
		row.add(discription);

		var del = Ti.UI.createButton({
			title : 'Eliminar ',
			right : 10,
			height : '32dp',
			id : "delrow",
			width : '75dp',
			myrow : row,
			backgroundColor:'#298FB2',
			color:'white',
			borderRadius:3,
			font : {
				fontFamily : 'Arial',
				fontSize : 10,
				fontWeight : 'normal'
			     },
		});
		row.add(del);

		var vista = Ti.UI.createView({
		  width: Ti.UI.FILL,
		  height:2,
		  backgroundColor:'#298FB2',
		  top:2
		});
		row.add(vista);

		tableData.push(row);

	}
	tableView.setData(tableData);
}

tableView.addEventListener('click', function(e) {
	if (e.source.id == "delrow") {
		var id = e.rowData.id;
		//Ti.App.Properties.setString('id', id);
		//alert('id='+newData);
		var dialog = Ti.UI.createAlertDialog({
			cancel : 1,
			buttonNames : ['Confirmar', 'Cancelar'],
			message : 'Esta seguro de eliminar el registro ?',
			title : 'Borrar elemento'
		});

		dialog.addEventListener('click', function(e) {
			if (e.index === e.source.cancel) {

			} else {
				//  tableView.deleteRow(e.source.myrow);
				var db = require('/db');
				//alert(e.source);
				//var cu_id = Ti.App.Properties.getString('id');
				db.deletinfo(id);
				Ti.App.fireEvent('tableUpdate');
				alert('Se elimino un registro');
				Ti.API.info('Eliminacion ' + JSON.stringify(e));

			}
		});
		dialog.show();
	}
	// working here for update data
	else {

		var dataEditt = require('/dataEdit');
		dataEditt.edit(e.rowData.title, e.rowData.details, e.rowData.id);

	}
});

$.index.add(tableView);
