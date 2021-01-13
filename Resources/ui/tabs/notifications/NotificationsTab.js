var Util = require('lib/Util');

if(Util.isAndroid()) { module.exports = require('ui/tabs/notifications/android/NotificationsAndroidTab');}
else { module.exports = require('ui/tabs/notifications/ios/NotificationsIOSTab'); }
