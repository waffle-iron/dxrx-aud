#import "BACtrack.h"
#import "BACTrackPluginDelegate.h"

@implementation BACTrackPluginDelegate
NSString *const keyCall = @"call";
NSString *const keyArg1 = @"arg1";
NSString *const keyArg2 = @"arg2";
NSString *const keyArg3 = @"arg3";
NSString *const keyBacTrackAPIKeyDeclined =  @"BacTrackAPIKeyDeclined";
NSString *const keyBacTrackAPIKeyAuthorized =  @"BacTrackAPIKeyAuthorized";
NSString *const keyBacTrackConnectedOld =  @"BacTrackConnectedOld";
NSString *const keyBacTrackConnected =  @"BacTrackConnected";
NSString *const keyBacTrackDisconnected =  @"BacTrackDisconnected";
NSString *const keyBacTrackCountdown =  @"BacTrackCountdown";
NSString *const keyBacTrackStart =  @"BacTrackStart";
NSString *const keyBacTrackBlow =  @"BacTrackBlow";
NSString *const keyBacTrackAnalyzing =  @"BacTrackAnalyzing";
NSString *const keyBacTrackResults =  @"BacTrackResults";
NSString *const keyBacTrackError =  @"BacTrackError";
NSString *const keyBacTrackConnectTimeout =  @"BacTrackConnectTimeout";
NSString *const keyBacTrackGetTimeout =  @"BacTrackGetTimeout";
NSString *const keyBacTrackFoundBreathalyzer =  @"BacTrackFoundBreathalyzer";
NSString *const keyBacTrackSerial =  @"BacTrackSerial";
NSString *const keyBacTrackBatteryLevel =  @"BacTrackBatteryLevel";

//Initialize the Delegate with callback_id and command delegate
//This callbackid will be reused multiple times for calls back into javascript.
-(id)initWithCallbackId: (NSString*) callback_id 
     withCommandDelegate: (id<CDVCommandDelegate>) command_delegate
     withTimeout: (NSTimeInterval) t {
  _callbackID = callback_id;
  _commandDelegate = command_delegate;
  _pluginTimeout = t;
  _breathalyzers = [NSMutableDictionary dictionaryWithCapacity:10];
  return self;
}

//Return result to Javascript, keeping the callback passed in at initialization active.
- (void) returnResult: (NSDictionary *) resultDict {

  CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:resultDict];
  [pluginResult setKeepCallbackAsBool:YES];
  [_commandDelegate sendPluginResult:pluginResult callbackId:self.callbackID];
  return;
}

-(void)BacTrackAPIKeyDeclined:(NSString *)errorMessage {
  NSDictionary *resultDict = [NSDictionary dictionaryWithObjectsAndKeys: keyBacTrackAPIKeyDeclined, keyCall, errorMessage, keyArg1, nil];
    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:resultDict];
    [pluginResult setKeepCallbackAsBool:YES];
    [_commandDelegate sendPluginResult:pluginResult callbackId:self.callbackID];
  return;
}

-(void)BacTrackAPIKeyAuthorized {
  NSDictionary *resultDict = [NSDictionary dictionaryWithObjectsAndKeys: keyBacTrackAPIKeyAuthorized, keyCall, nil];
    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:resultDict];
    [pluginResult setKeepCallbackAsBool:YES];
    [_commandDelegate sendPluginResult:pluginResult callbackId:self.callbackID];
  return;
}

-(void)BacTrackConnected __attribute__((deprecated)) {
  NSDictionary *resultDict = [NSDictionary dictionaryWithObjectsAndKeys: keyBacTrackConnectedOld, keyCall, nil];
    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:resultDict];
    [pluginResult setKeepCallbackAsBool:YES];
    [_commandDelegate sendPluginResult:pluginResult callbackId:self.callbackID];
  return;
}

-(void)BacTrackConnected:(BACtrackDeviceType)device {
  NSNumber *myDevice = @(device);
  NSDictionary *resultDict = [NSDictionary dictionaryWithObjectsAndKeys: keyBacTrackConnected, keyCall, myDevice, keyArg1, nil];
    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:resultDict];
    [pluginResult setKeepCallbackAsBool:YES];
    [_commandDelegate sendPluginResult:pluginResult callbackId:self.callbackID];
  return;
}

-(void)BacTrackDisconnected {
  NSDictionary *resultDict = [NSDictionary dictionaryWithObjectsAndKeys: keyBacTrackDisconnected, keyCall, nil];
    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:resultDict];
    [pluginResult setKeepCallbackAsBool:YES];
    [_commandDelegate sendPluginResult:pluginResult callbackId:self.callbackID];
  return;
}

-(void)BacTrackCountdown:(NSNumber*)seconds executionFailure:(BOOL)error {
  NSDictionary *resultDict = [NSDictionary dictionaryWithObjectsAndKeys: keyBacTrackCountdown, keyCall, seconds, keyArg1,[NSNumber numberWithBool:error],keyArg2,nil];
    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:resultDict];
    [pluginResult setKeepCallbackAsBool:YES];
    [_commandDelegate sendPluginResult:pluginResult callbackId:self.callbackID];
  return;
}

-(void)BacTrackStart {
  NSDictionary *resultDict = [NSDictionary dictionaryWithObjectsAndKeys: keyBacTrackStart, keyCall, nil];
    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:resultDict];
    [pluginResult setKeepCallbackAsBool:YES];
    [_commandDelegate sendPluginResult:pluginResult callbackId:self.callbackID];
  return;
}

-(void)BacTrackBlow {
  NSDictionary *resultDict = [NSDictionary dictionaryWithObjectsAndKeys: keyBacTrackBlow, keyCall, nil];
    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:resultDict];
    [pluginResult setKeepCallbackAsBool:YES];
    [_commandDelegate sendPluginResult:pluginResult callbackId:self.callbackID];
  return;
}

-(void)BacTrackAnalyzing {
  NSDictionary *resultDict = [NSDictionary dictionaryWithObjectsAndKeys: keyBacTrackAnalyzing, keyCall, nil];
    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:resultDict];
    [pluginResult setKeepCallbackAsBool:YES];
    [_commandDelegate sendPluginResult:pluginResult callbackId:self.callbackID];
  return;
}

-(void)BacTrackResults:(CGFloat)bac {
    NSNumber *myBac = [NSNumber numberWithDouble:bac];
  NSDictionary *resultDict = [NSDictionary dictionaryWithObjectsAndKeys: keyBacTrackResults, keyCall, myBac, keyArg1, nil];
    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:resultDict];
    [pluginResult setKeepCallbackAsBool:YES];
    [_commandDelegate sendPluginResult:pluginResult callbackId:self.callbackID];
  return;
}

/** Error with device. e.g. "Not Connected", "Bluetooth Unsupported", etc. */
-(void)BacTrackError:(NSError*)error {
    NSDictionary *resultDict = [NSDictionary dictionaryWithObjectsAndKeys: keyBacTrackError, keyCall, error.domain, keyArg1, [NSNumber numberWithLong:error.code], keyArg2, nil];
    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:resultDict];
    [pluginResult setKeepCallbackAsBool:YES];
    [_commandDelegate sendPluginResult:pluginResult callbackId:self.callbackID];
  return;
}

/** Attempting to connect to BACtrack timed out. */
-(void)BacTrackConnectTimeout {
  NSDictionary *resultDict = [NSDictionary dictionaryWithObjectsAndKeys: keyBacTrackConnectTimeout, keyCall, nil];
    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:resultDict];
    [pluginResult setKeepCallbackAsBool:YES];
    [_commandDelegate sendPluginResult:pluginResult callbackId:self.callbackID];
  return;
}

/** Asks for connection timeout when connecting to nearest breathalyzer. */
-(NSTimeInterval)BacTrackGetTimeout {
  NSDictionary *resultDict = [NSDictionary dictionaryWithObjectsAndKeys: keyBacTrackGetTimeout, keyCall, nil];
    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:resultDict];
    [pluginResult setKeepCallbackAsBool:YES];
    [_commandDelegate sendPluginResult:pluginResult callbackId:self.callbackID];
    return _pluginTimeout;
}

/** Found a breathalyzer. Call comes in for every breathalyzer found during scan. */
-(void)BacTrackFoundBreathalyzer:(Breathalyzer*)breathalyzer {
  // Store breathalyzer away.
  // Call back with name and uuid.
  // UUID can be used to connect to this breathalyzer by calling ConnectBreathalyzerUUID
    [_breathalyzers setObject:breathalyzer forKey:breathalyzer.uuid];
    NSDictionary *resultDict = [NSDictionary dictionaryWithObjectsAndKeys: keyBacTrackFoundBreathalyzer, keyCall, breathalyzer.uuid, keyArg1, breathalyzer.peripheral.name, keyArg2, nil];
    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:resultDict];
    [pluginResult setKeepCallbackAsBool:YES];
    [_commandDelegate sendPluginResult:pluginResult callbackId:self.callbackID];
  return;
}

/** Reports the hardware serial number. GoodAngel. */
-(void)BacTrackSerial:(NSString *)serial_hex {
  NSDictionary *resultDict = [NSDictionary dictionaryWithObjectsAndKeys: keyBacTrackSerial, keyCall, serial_hex, keyArg1, nil];
    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:resultDict];
    [pluginResult setKeepCallbackAsBool:YES];
    [_commandDelegate sendPluginResult:pluginResult callbackId:self.callbackID];
  return;
}

/** Reports battery level.  0 is low (needs to be charged). 1 is medium, 2 is high. **/
-(void)BacTrackBatteryLevel:(NSNumber *)number {
  NSDictionary *resultDict = [NSDictionary dictionaryWithObjectsAndKeys: keyBacTrackBatteryLevel, keyCall, number, keyArg1, nil];
    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:resultDict];
    [pluginResult setKeepCallbackAsBool:YES];
    [_commandDelegate sendPluginResult:pluginResult callbackId:self.callbackID];
  return;
}
@end
