
var db = Ti.Database.open('people');
db.execute('CREATE TABLE IF NOT EXISTS customer(id  integer PRIMARY KEY autoincrement not null,title TEXT,description TEXT)');
db.close();

exports.add = function(title, description) {
	var db = Ti.Database.open('people');
      db.execute('INSERT INTO customer (title,description) VALUES(?,?)',title,description);
      Ti.API.info('crea base de datos' + JSON.stringify(db));
	db.close();
};


exports.getinfo = function() {
	var customerInfo = [];
	var db = Ti.Database.open('people');
	var result = db.execute('select * from customer');

	while (result.isValidRow()) {

		customerInfo.push({

			id : result.fieldByName('id'),
			title : result.fieldByName('title'),
			description:result.fieldByName('description'),
			
			
		});
		result.next();
	}

	result.close();
	db.close();
	//Ti.API.info('stuInfo'+ stuInfo);
	return customerInfo;
};


exports.updateinfo = function(title,description,id) {
	var db = Ti.Database.open('people');
	db.execute('UPDATE customer set title=?,description=? where id=?', title,description,id);
	db.close();
};


exports.deletinfo = function(id) {
	var db = Ti.Database.open('people');
	db.execute('DELETE FROM customer where id=?', id);
      Ti.API.info('Eliminar registro ' +id);
	db.close();
};