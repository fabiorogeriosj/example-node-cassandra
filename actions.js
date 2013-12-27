module.exports = {
	InsertContact : function (req, res, pool){
		pool.connect(function(err, keyspace){
		    if(err){
		    	throw(err);
		    } else {
		    	var post = req.body;
				pool.cql("INSERT INTO contact (email, name, phone, address, city) VALUES (?,?,?,?,?)", [post.email, post.name, post.phone, post.address, post.city], function(err, results){
					res.redirect('/');
				});
		    }
		});
	},
	UpdateContact : function (req, res, pool){
		pool.connect(function(err, keyspace){
		    if(err){
		    	throw(err);
		    } else {
		    	var post = req.body;
				pool.cql("UPDATE contact SET name = ?, phone = ?, address = ?, city = ? WHERE email = ?", [post.name, post.phone, post.address, post.city, post.contactEdit], function(err, results){
					res.redirect('/');
				});
		    }
		});
	},
	DeleteContact : function (req, res, pool){
		pool.connect(function(err, keyspace){
		    if(err){
		    	throw(err);
		    } else {
		    	var post = req.body;
				pool.cql("DELETE FROM contact WHERE email = ?", [post.contactDel], function(err, results){
					res.redirect('/');
				});
		    }
		});
	},
	LoadContacts : function (req, res, pool){
		pool.connect(function(err, keyspace){
		    if(err){
		    	throw(err);
		    } else {
		    	var post = req.body;
		    	var query = "SELECT * FROM contact";
		    	if(typeof(req.query.email) != "undefined"){
		    		query += " WHERE email = '"+req.query.email+"'";
		    	}
				pool.cql(query, [], function(err, results){
					var data = [];
					results.forEach(function(row){
						var obj = {};
					  	row.forEach(function(name,value,ts,ttl){
					    	obj[name] = value;
					  	});
					  	data.push(obj);
					});
					res.send(data);
				});
		    }
		});
	}
}