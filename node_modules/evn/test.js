//Import Evn
var Evn = require('./index.js');

function Test(id)
{
	this.id = id;
	this.call = function(arg)
	{
		console.log('ID: "' + this.id + '"');
		console.log('Arg: "' + arg + '"');
	};
}

var t1 = new Test('Test 1');

t1.call('Hey');
Evn.add('test', t1.call, t1);
Evn.send('test', 'Hello!!');
