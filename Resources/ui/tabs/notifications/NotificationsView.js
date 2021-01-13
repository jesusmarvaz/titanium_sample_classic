var Util = require('lib/Util');

if(Util.isAndroid()) { module.exports = require('ui/tabs/notifications/android/NotificationsAndroidView'); }
else { module.exports = require('ui/tabs/notifications/ios/NotificationsIOSView'); }
