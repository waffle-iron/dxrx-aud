#import <Foundation/Foundation.h>
#import <Cordova/CDV.h>
#import "BACtrack.h"

@interface BACTrackPluginDelegate : NSObject

  -(void)BacTrackAPIKeyDeclined:(NSString *)errorMessage;
  -(void)BacTrackAPIKeyAuthorized;
  -(void)BacTrackConnected:(BACtrackDeviceType)device;
  -(void)BacTrackDisconnected;
  -(void)BacTrackCountdown:(NSNumber*)seconds executionFailure:(BOOL)error;
  -(void)BacTrackStart;
  -(void)BacTrackBlow;
  -(void)BacTrackAnalyzing;
  -(void)BacTrackResults:(CGFloat)bac;
  -(void)BacTrackError:(NSError*)error;
  -(void)BacTrackConnectTimeout;
  -(NSTimeInterval)BacTrackGetTimeout;
  -(void)BacTrackFoundBreathalyzer:(Breathalyzer*)breathalyzer;
  -(void)BacTrackSerial:(NSString *)serial_hex;
  -(void)BacTrackBatteryLevel:(NSNumber *)number;
  -(id)initWithCallbackId: (NSString*) callback_id withCommandDelegate: (id<CDVCommandDelegate>)  command_delegate withTimeout: (NSTimeInterval) t;

@property NSString *callbackID; //Cordova Callback ID
@property id<CDVCommandDelegate> commandDelegate; //Cordova Command Delegate
@property NSMutableDictionary *breathalyzers; //Records breathalyzers found in a scan
@property NSTimeInterval pluginTimeout;				  
@end


