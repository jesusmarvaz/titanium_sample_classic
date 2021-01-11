Titanium.UI.setBackgroundColor('#000');
var tabGroup = Ti.UI.createTabGroup();
var Util = require('lib/Util');

tabGroup.addTab(require('ui/tabs/location/Location'));
if(Util.isAndroid() == true) {tabGroup.addTab(require('ui/tabs/notifications/NotificationsAndroid'));}
else {tabGroup.addTab(require('ui/tabs/notifications/NotificationsIOS'));}
tabGroup.addTab(require('ui/tabs/web/Web'));
tabGroup.addTab(require('ui/tabs//advanced/Advanced'));
tabGroup.addTab(require('ui/tabs/crud/Crud'));

/**
 * Open the tabGroup	
 */
tabGroup.open();

module.exports = tabGroup;


// added during app creation. this will automatically login to
// ACS for your application and then fire an event (see below)
// when connected or errored. if you do not use ACS in your
// application as a client, you should remove this block
/*(function () {
	const ACS = require('ti.cloud');
	const env = Ti.App.deployType.toLowerCase() === 'production' ? 'production' : 'development';
	const username = Ti.App.Properties.getString(`acs-username-${env}`);
	const password = Ti.App.Properties.getString(`acs-password-${env}`);

	// if not configured, just return
	if (!env || !username || !password) {
		return;
	}
	ACS.Users.login({
		login: username,
		password: password,
	}, function (result) {
		if (env === 'development') {
			Ti.API.info(`ACS Login Results for environment ${env}`);
			Ti.API.info(result);
		}
		if (result && result.success && result.users && result.users.length) {
			Ti.App.fireEvent('login.success', result.users[0], env);
		} else {
			Ti.App.fireEvent('login.failed', result, env);
		}
	});

}());*/

