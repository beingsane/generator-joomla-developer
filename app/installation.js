
var casper = require('casper').create({
	viewportSize: {
		width: 1920,
		height: 1080
	},
	verbose: true,
	logLevel: "debug",
	onError: errorEvent
});

function errorEvent(e) {
	this.echo('CasperJS Script Error');
	this.echo(e);
	this.exit();
}

var page_1_maps = {
	jform_site_name: 'joomla-dev',
	jform_site_description: 'This is a description of my site.',
	jform_admin_email: 'brian.bolli@arctg.com',
	jform_admin_user: 'admin',
	jform_admin_password: 'test',
	jform_admin_password2: 'test'
};

var page_2_maps = {
	jform_db_type: 'mysqli',
	jform_db_host: 'localhost',
	jform_db_user: 'joomla-dev',
	jform_db_pass: 'joomla-dev',
	jform_db_name: 'joomla-dev',
	jform_db_prefix: 'jdev_'
}

var page_3_maps = {

}

casper.start('http://joomla-developer/', function() {

	// pull token value from DOM
	var token = this.getElementAttribute('form#adminForm input[type="hidden"][name="task"] + input[type="hidden"][value="1"]', 'name');

	this.fill('form#adminForm', {
		'jform[site_name]': 'Joomla Developer Instance',
		'jform[admin_email]': 'info@arctg.com',
		'jform[admin_user]': 'admin',
		'jform[admin_password]': 'test',
		'jform[admin_password2]': 'test',
		'jform[site_metadesc]': '',
		'jform[site_offline]': '0',
	}, false);

});

casper.then(function() {
	this.capture('joomla_installation_page_one.png')
	this.click('div#container-installation div.btn-toolbar div.btn-group a.btn.btn-primary');

})

casper.thenEvaluate(function() {
	this.echo(document.body.innerText);
	return /message sent/.test(document.body.innerText);
});

casper.then(function() {
	this.capture('joomla_installation_page_two.png');
});

casper.run(function() {
	this.echo('Installation Complete').exit();
});