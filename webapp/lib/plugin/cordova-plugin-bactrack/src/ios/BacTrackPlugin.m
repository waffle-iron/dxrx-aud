#import <Cordova/CDVPlugin.h>
#import "BACtrack.h"
#import "BACTrackPlugin.h"
#import "BACTrackPluginDelegate.h"

@implementation BACTrackPlugin : CDVPlugin

-(void)initWithDelegate: (CDVInvokedUrlCommand*)command {
  NSString* api_key= [command argumentAtIndex:0];
  NSTimeInterval timeout=  [[command argumentAtIndex:1] doubleValue];
    _delegate = [BACTrackPluginDelegate alloc];
    _delegateId = [_delegate initWithCallbackId:command.callbackId withCommandDelegate:self.commandDelegate withTimeout:timeout];
    _bacTrack = [BacTrackAPI alloc];
    _bacTrackId= [_bacTrack initWithDelegate:_delegateId AndAPIKey:api_key];
  if (_bacTrackId == nil) {
    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    return;
  }
  CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
  [pluginResult setKeepCallbackAsBool:YES];
  [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
  return;
}

-(void)connectToNearestBreathalyzer: (CDVInvokedUrlCommand*)command {
  [_bacTrack connectToNearestBreathalyzer];
  CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
  [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
  return;
 }

-(void)connectBreathalyzer:(CDVInvokedUrlCommand*) command; {
  //uuid and timeout.
  NSString* uuid= [command argumentAtIndex:0];
  if (uuid == nil) {
      CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
      [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
      return;
  }
  NSTimeInterval timeout=  [[command argumentAtIndex:1] doubleValue];
  Breathalyzer *breathalyzer = [_delegate.breathalyzers objectForKey:uuid];
  if (breathalyzer == nil) {
      CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
      [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
      return;
  }
  [_bacTrack connectBreathalyzer: breathalyzer withTimeout:timeout];
  CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
  [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    return;
    
}

-(void)startScan:(CDVInvokedUrlCommand*) command {
  [_bacTrack startScan];
  CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
  [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
  return;
}
-(void)stopScan:(CDVInvokedUrlCommand*) command {
  [_bacTrack stopScan];
  CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
  [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
  return;
}
 -(void)disconnect:(CDVInvokedUrlCommand*) command {
  [_bacTrack disconnect];
  CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
  [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
  return;
}
-(void)startCountdown:(CDVInvokedUrlCommand*) command {
  BOOL success = [_bacTrack startCountdown];
    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsBool:success];
  [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
  return;
}

-(void)getBreathalyzerBatteryLevel:(CDVInvokedUrlCommand*) command {
  [_bacTrack getBreathalyzerBatteryLevel];
  CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
  [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
  return;
}

@end
 

 
