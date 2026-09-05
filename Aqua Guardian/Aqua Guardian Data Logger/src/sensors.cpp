/**
 * @file sensors.cpp
 * @brief Implementation file for all sensor interactions.
 * * Includes DS18B20, pH, DO, EC, Turbidity, ORP, and 12V Water Leak.
 *
 * @version 3.1 - Patched 12V water leak sensor logic.
 * @date 2025-11-11
 */

#include "config.h" 
#include "sensors.h"
#include "modem.h"
#include <OneWire.h>
#include <DallasTemperature.h>

// --- NEW: Adafruit SHT40 Includes ---
#include <Adafruit_Sensor.h> 
#include <Adafruit_SHT4x.h>  

// --- Sensor Libraries Setup ---
// Initialize the SHT40 object globally so all functions can see it
Adafruit_SHT4x sht4 = Adafruit_SHT4x();

// DS18B20 Temperature Sensor (Keep if still physically wired, or delete if fully replaced)
OneWire oneWire(PIN_ONE_WIRE_BUS);
DallasTemperature dallas_temp(&oneWire);

// DFRobot Analog Sensor Calibration
// TODO: Calibrate these values
#define PH_OFFSET 0.0
#define DO_OFFSET 0.0
#define EC_OFFSET 0.0
#define TURB_OFFSET 0.0
#define ORP_OFFSET 0.0


/**
 * @brief Initializes all sensors.
 */
bool sensors_init() {
    Serial.println("Initializing sensors...");
    
    // Initialize DS18B20
    dallas_temp.begin();
    
    // Set ADC pins to INPUT
    pinMode(PIN_PH, INPUT);
    pinMode(PIN_DO, INPUT);
    pinMode(PIN_EC, INPUT);
    pinMode(PIN_TURBIDITY, INPUT);
    pinMode(PIN_ORP, INPUT);
    pinMode(PIN_BATTERY, INPUT);
    
    // --- Disconnected: 12V Water Leak Sensor Pins ---
    // pinMode(PIN_WATER_LEAK, INPUT);        
    // pinMode(PIN_LEAK_POWER, OUTPUT);       
    // digitalWrite(PIN_LEAK_POWER, LOW); 
    // ----------------------------------------------------

    Serial.println("Sensors initialized.");
    return true;
}

/**
 * @brief Gets initial, one-time data at the start of a session.
 */
void sensors_get_initial_data(SensorReadings& session_data) {
    Serial.println("Getting initial data (GPS, Time, Leak)...");
    
    // Use current time as session ID
    session_data.session_id = modem_get_utc_time();

    // --- NEW GPS WAIT LOOP ---
    float lat = 0.0, lon = 0.0;
    bool gpsFix = false;
    
    Serial.print("Waiting for GPS fix (up to 2 minutes)");
    unsigned long startGPS = millis();
    
    // Loop for up to 120,000 milliseconds (2 minutes)
    while (millis() - startGPS < 120000) {
        if (modem_get_gps(lat, lon)) {
            gpsFix = true;
            break; // Exit the loop early if we get a fix!
        }
        Serial.print("."); // Print a dot to show it's still waiting
        delay(3000);       // Wait 3 seconds before asking the modem again
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

    // --- Disconnected: Power on and read the 12V water leak sensor ---
    // Serial.println("Checking for water leak...");
    // digitalWrite(PIN_LEAK_POWER, HIGH); 
    // delay(100);                         
    // session_data.water_leak = (digitalRead(PIN_WATER_LEAK) == HIGH); 
    // digitalWrite(PIN_LEAK_POWER, LOW);  
    
    // if(session_data.water_leak) {
    //     Serial.println("WARNING: Water leak detected!");
    // } else {
    //     Serial.println("No leak detected.");
    // }
    // ------------------------------------------------------   
    
    session_data.sample_count = 0;
}

/**
 * @brief Reads all sensors and populates a SensorSample struct.
 * (Note: This function does NOT check the 12V leak sensor,
 * as that is a high-power operation done once in sensors_get_initial_data)
 */
void sensors_read_all(SensorSample& sample) {
    sensors_event_t humidity, temp;
    sht4.getEvent(&humidity, &temp);
    
    // Internal enclosure temperature and humidity
    sample.temp = temp.temperature;
    sample.humidity = humidity.relative_humidity;
    // --- Read DS18B20 Temperature ---
    dallas_temp.requestTemperatures(); 
    sample.temp = dallas_temp.getTempCByIndex(0);
    if (sample.temp == DEVICE_DISCONNECTED_C) {
        Serial.println("Error: DS18B20 disconnected.");
        sample.temp = -999.0;
    }

    // --- Read Analog Sensors ---
    // Note: These are placeholder calculations.
    // You MUST replace them with proper calibration curves.

    // Read pH
    int ph_analog = analogRead(PIN_PH);
    float ph_voltage = ph_analog * (DEFAULT_VREF / 4095.0);
    sample.ph = (ph_voltage * 3.5) + PH_OFFSET; // EXAMPLE CALCULATION
    
    // Read Dissolved Oxygen
    int do_analog = analogRead(PIN_DO);
    float do_voltage = do_analog * (DEFAULT_VREF / 4095.0);
    sample.in_do = (do_voltage * 10.0) + DO_OFFSET; // EXAMPLE CALCULATION

    // Read EC
    int ec_analog = analogRead(PIN_EC);
    float ec_voltage = ec_analog * (DEFAULT_VREF / 4095.0);
    sample.ec = (ec_voltage * 2.5) + EC_OFFSET; // EXAMPLE CALCULATION

    // Read Turbidity
    int turb_analog = analogRead(PIN_TURBIDITY);
    float turb_voltage = turb_analog * (DEFAULT_VREF / 4095.0);
    sample.turb = (turb_voltage * 1.0) + TURB_OFFSET; // EXAMPLE CALCULATION

    // Read ORP
    int orp_analog = analogRead(PIN_ORP);
    float orp_voltage = orp_analog * (DEFAULT_VREF / 4095.0);
    sample.orp = (orp_voltage * 1.0) + ORP_OFFSET; // EXAMPLE CALCULATION

    // Read Battery Voltage (Assumes 100k/100k voltage divider)
    int bat_analog = analogRead(PIN_BATTERY);
    float pin_voltage = bat_analog * (DEFAULT_VREF / 4095.0) / 1000.0;
    sample.battery_v = pin_voltage * 2.0; 

    // Print values
    Serial.printf(" Temp: %.2fC, pH: %.2f, DO: %.2f, EC: %.2f, Turb: %.2f, ORP: %.2f, Bat: %.2fV\n",
        sample.temp, sample.ph, sample.in_do, sample.ec, sample.turb, sample.orp, sample.battery_v);
}
