#include "config.h" 
#include "sensors.h"
#include "modem.h"
#include <OneWire.h>
#include <DallasTemperature.h>
#include <Adafruit_Sensor.h> 
#include <Adafruit_SHT4x.h>  
#include <Wire.h>

Adafruit_SHT4x sht4 = Adafruit_SHT4x();

#define PIN_ONE_WIRE_BUS 26 // D3
OneWire oneWire(PIN_ONE_WIRE_BUS);
DallasTemperature dallas_temp(&oneWire);

#define PH_OFFSET 0.0
#define DO_OFFSET 0.0
#define EC_OFFSET 0.0
#define TURB_OFFSET 0.0
#define ORP_OFFSET 0.0

bool sensors_init() {
    Serial.println("Initializing sensors...");
    
    // Initialize I2C for SHT40 (uses default Wire pins on the shield)
    Wire.begin();
    if (!sht4.begin(&Wire)) {
        Serial.println("Warning: SHT40 sensor not found or failed to initialize!");
    } else {
        Serial.println("SHT40 initialized successfully.");
        sht4.setPrecision(SHT4X_HIGH_PRECISION);
    }

    // Initialize DS18B20
    dallas_temp.begin();
    
    // Set ADC pins to INPUT
    pinMode(PIN_PH, INPUT);
    pinMode(PIN_DO, INPUT);
    pinMode(PIN_EC, INPUT);
    pinMode(PIN_TURBIDITY, INPUT);
    pinMode(PIN_ORP, INPUT);
    pinMode(PIN_BATTERY, INPUT);

    Serial.println("Sensors initialized.");
    return true;
}

void sensors_get_initial_data(SensorReadings& session_data) {
    Serial.println("Getting initial data (GPS, Time, Leak)...");
    session_data.session_id = modem_get_utc_time();

    float lat = 0.0, lon = 0.0;
    bool gpsFix = false;
    
    Serial.print("Waiting for GPS fix (up to 60 Seconds)");
    unsigned long startGPS = millis();
    
    while (millis() - startGPS < 60000) {
        if (modem_get_gps(lat, lon)) {
            gpsFix = true;
            break; 
        }
        Serial.print("."); 
        delay(3000);       
    }

    if (gpsFix) {
        Serial.printf("\nGPS Fix Acquired: %.4f, %.4f\n", lat, lon);
        session_data.gps_lat = lat;
        session_data.gps_lon = lon;
    } else {
        Serial.println("\nGPS timeout. Proceeding with default coordinates (0,0).");
        session_data.gps_lat = 0.0;
        session_data.gps_lon = 0.0;
    }
    
    session_data.sample_count = 0;
}

void sensors_read_all(SensorSample& sample) {
    sensors_event_t humidity, temp;
    
    // Read SHT40 Internal Air Temperature & Humidity
    if (sht4.getEvent(&humidity, &temp)) {
        sample.air_temp = temp.temperature;
        sample.humidity = humidity.relative_humidity;
    } else {
        sample.air_temp = -999.0;
        sample.humidity = -1.0;
    }
    
    // Read DS18B20 Water Temperature
    dallas_temp.requestTemperatures(); 
    sample.temp = dallas_temp.getTempCByIndex(0);
    if (sample.temp == DEVICE_DISCONNECTED_C) {
        Serial.println("Error: DS18B20 disconnected.");
        sample.temp = -999.0;
    }

    // Read Analog Sensors
    int ph_analog = analogRead(PIN_PH);
    float ph_voltage = ph_analog * (DEFAULT_VREF / 4095.0);
    sample.ph = (ph_voltage * 3.5) + PH_OFFSET; 
    
    int do_analog = analogRead(PIN_DO);
    float do_voltage = do_analog * (DEFAULT_VREF / 4095.0);
    sample.in_do = (do_voltage * 10.0) + DO_OFFSET; 

    int ec_analog = analogRead(PIN_EC);
    float ec_voltage = ec_analog * (DEFAULT_VREF / 4095.0);
    sample.ec = (ec_voltage * 2.5) + EC_OFFSET; 

    int turb_analog = analogRead(PIN_TURBIDITY);
    float turb_voltage = turb_analog * (DEFAULT_VREF / 4095.0);
    sample.turb = (turb_voltage * 1.0) + TURB_OFFSET; 

    int orp_analog = analogRead(PIN_ORP);
    float orp_voltage = orp_analog * (DEFAULT_VREF / 4095.0);
    sample.orp = (orp_voltage * 1.0) + ORP_OFFSET; 

    int bat_analog = analogRead(PIN_BATTERY);
    float pin_voltage = bat_analog * (DEFAULT_VREF / 4095.0) / 1000.0;
    sample.battery_v = pin_voltage * 2.0; 

    Serial.printf("Water Temp: %.2fC | Air Temp: %.2fC | Humidity: %.2f%% | pH: %.2f | DO: %.2f | EC: %.2f | Turb: %.2f | ORP: %.2f | Bat: %.2fV\n",
        sample.temp, sample.air_temp, sample.humidity, sample.ph, sample.in_do, sample.ec, sample.turb, sample.orp, sample.battery_v);
}