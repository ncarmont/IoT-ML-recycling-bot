#include <CurieBLE.h>
#include <Servo.h>

Servo arm;

BLEPeripheral blePeripheral;
BLEService garbageService("ABCD");

int recievedConnection = 0;
int count = 0;
int lightOn = 0;

BLECharCharacteristic isRecycleCharacteristic("ABCD", BLERead | BLEWrite);

void setup() {
  Serial.begin(9600);
  pinMode(LED_BUILTIN, OUTPUT);

  blePeripheral.setLocalName("GarbageThing");
  blePeripheral.setAdvertisedServiceUuid(garbageService.uuid());

  blePeripheral.addAttribute(garbageService);
  blePeripheral.addAttribute(isRecycleCharacteristic);
  
  blePeripheral.begin();

  arm.attach(9);
  arm.write(90);
  digitalWrite(LED_BUILTIN, HIGH);

  Serial.println("Device active");
}

void loop() {
  blePeripheral.poll();
  
  count++;
  Serial.println(count);

  if(recievedConnection == 0){
    if(count > 2000){
      if(!lightOn){
        digitalWrite(LED_BUILTIN, HIGH);
        count = 0;
        lightOn = 1;
      }
      else{
        digitalWrite(LED_BUILTIN, LOW);
        count = 0;
        lightOn = 0;
      }
    }   
  }
  
  
  if(isRecycleCharacteristic.written()){
    recievedConnection = 1;
    if(isRecycleCharacteristic.value()){
      Serial.println("recyclable");
      digitalWrite(LED_BUILTIN, HIGH);
      arm.write(180);
    }
    else{
      Serial.println("garbage");
      digitalWrite(LED_BUILTIN, LOW);
      arm.write(0);
    }
  }
}
