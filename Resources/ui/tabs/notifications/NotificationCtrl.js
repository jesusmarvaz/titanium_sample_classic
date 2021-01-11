if (Ti.Platform.osname === 'iphone' || Ti.Platform.osname === 'ipad') {
  module.exports = NotificationCtrl = require('ui/tabs/notifications/IOSNotificationCtrl');
} else {
  module.exports = NotificationCtrl = require('ui/tabs/notifications/AndroidNotificationCtrl');
}
