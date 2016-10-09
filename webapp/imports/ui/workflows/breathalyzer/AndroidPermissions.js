

function checkPermissionCallback(permissionNeeded,status) {
  if(!status.hasPermission) {
    console.log('Permission is not on: ' + permissionNeeded);
    var errorCallback = function() {
      console.warn('Permission is not turned on: ' + permissionNeeded);
    };
    window.cordova.plugins.permissions.requestPermission(
		permissionNeeded,
    function(status) {
      console.log('Permission was granted: ' + status.hasPermission);
      if(!status.hasPermission) errorCallback();
    },
		errorCallback);
  }
}

export function isAndroid() {
  return navigator.userAgent.toLowerCase().indexOf('android') > -1;
}

export function checkAndroidPermissions() {
  console.log('In checkAndroid premissions with ' + Meteor.isCordova + ',' + Meteor.isAndroid);
  if (! (Meteor.isCordova && isAndroid())) return;

  var permissionsNeeded = [window.cordova.plugins.permissions.ACCESS_COARSE_LOCATION,
    window.cordova.plugins.permissions.BLUETOOTH,
    window.cordova.plugins.permissions.BLUETOOTH_ADMIN,
    window.cordova.plugins.permissions.CAMERA,
    window.cordova.plugins.permissions.INTERNET
  ];

  for (var i = 0; i < permissionsNeeded.length; ++i) {
    console.log('Checking on permission ' + permissionsNeeded[i]);
    window.cordova.plugins.permissions.hasPermission(permissionsNeeded[i],
      checkPermissionCallback.bind(this,permissionsNeeded[i]),
      null);
  }
}
