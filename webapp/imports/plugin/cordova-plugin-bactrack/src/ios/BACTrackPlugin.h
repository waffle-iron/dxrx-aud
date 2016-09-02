#import <Foundation/Foundation.h>
#import <Cordova/CDV.h>
#import "BACtrack.h"
#import "BACTrackPluginDelegate.h"

@interface BACTrackPlugin : CDVPlugin {

}

-(void)connectToNearestBreathalyzer: (CDVInvokedUrlCommand*)command;
-(void)connectBreathalyzer:(CDVInvokedUrlCommand*) command;
-(void)startScan:(CDVInvokedUrlCommand*) command;
-(void)stopScan:(CDVInvokedUrlCommand*) command;
-(void)disconnect:(CDVInvokedUrlCommand*) command;
-(void)startCountdown:(CDVInvokedUrlCommand*) command;
-(void)getBreathalyzerBatteryLevel:(CDVInvokedUrlCommand*) command;

@property id delegateId;
@property BACTrackPluginDelegate *delegate;
@property BacTrackAPI *bacTrack;
@property id bacTrackId;

@end
