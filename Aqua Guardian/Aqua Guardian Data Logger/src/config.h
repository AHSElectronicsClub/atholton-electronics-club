/**
 * @file config.h
 * @brief Main configuration file for the Aqua Guardian Data Logger.
 * * Contains all user-configurable settings, hardware pins, and API credentials.
 * * @version 5.0 - Use 'extern' to fix "multiple definition" linker errors.
 * @date 2025-11-09
 */

#ifndef CONFIG_H
#define CONFIG_H

// --- Device Settings ---
#define DEVICE_ID "AG-01"         // Unique ID for this device
#define DEEP_SLEEP_DURATION_SEC 600   // Sleep for 10 minutes
#define SENSOR_READ_INTERVAL_MS 10000 // Sample sensors every 10 seconds
#define MAX_SAMPLES_PER_SESSION 12    // Max sensor readings per sleep cycle (12 * 10s = 120s = 2 min)

// --- API Endpoint Configuration ---
// These are now DECLARATIONS. The DEFINITIONS are in main.cpp.
extern const char *server;
extern const char *resource;
extern const int port;

// --- API Credentials ---
extern const char *api_key_header;
extern const char *api_key_value;

// --- GPRS APN Configuration (SIM Card Specific) ---
extern const char *apn;
extern const char *gprsUser;
extern const char *gprsPass;

// --- Hardware Pins (FireBeetle 2 + IO Shield) ---
// -- 4G Modem (Shield UART Port)
#define SERIAL_AT_PORT 2      // Serial2 (ESP32 default)
#define SERIAL_AT_BAUD 115200 // Baud rate for A7670E
#define PIN_MODEM_TX 17       // Shield TX -> A7670E RX
#define PIN_MODEM_RX 16       // Shield RX -> A7670E TX
#define PIN_MODEM_PWR 14      // NEW: Digital pin to cycle modem power  

// -- Analog Sensor Pins (Verified) --
#define PIN_PH 36         // Shield A0 / GPIO 36 (ADC1_CH0)
#define PIN_DO 39         // Shield A1 / GPIO 39 (ADC1_CH3)
#define PIN_EC 34         // Shield A2 / GPIO 34 (ADC1_CH6)
#define PIN_TURBIDITY 35  // Shield A3 / GPIO 35 (ADC1_CH7)
#define PIN_ORP 15        // Shield A4 / GPIO 15 (ADC2_CH3) - *** FIX ***

// -- Battery Monitoring --
#define PIN_BATTERY 25 // Shield D2

// -- 12V Water Leak Sensor Pins --
// We need two pins for this sensor as per our circuit
#define PIN_LEAK_POWER 25 // Shield D2 / GPIO 25 (Controls MOSFET switch)
#define PIN_WATER_LEAK 26 // Shield D3 / GPIO 26 (Reads sensor signal) - *** FIX ***

// -- DS18B20 Temp Sensor (OneWire Bus) --
#define PIN_ONE_WIRE_BUS 13 // Shield D7 / GPIO 13

// -- Other Settings --
#define DEFAULT_VREF 3300.0 // 3.3V VREF in mV

// -- DS18B20 Temp Sensor (OneWire Bus)
#define PIN_ONE_WIRE_BUS 27 // Use any digital pin

// -- Storage (LittleFS)
#define MAX_SESSIONS_STORED 100 // Max # of JSON files to keep

#endif // CONFIG_H
