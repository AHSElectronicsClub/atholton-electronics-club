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
#define DEVICE_ID "AG-01"         
#define DEEP_SLEEP_DURATION_SEC 900  // INCREASED: Sleep for 15 minutes (900 seconds) instead of 45s
#define SENSOR_READ_INTERVAL_MS 1000 // ADJUSTED: Sample sensors every 1 second during the active window
#define MAX_SAMPLES_PER_SESSION 5    // ADJUSTED: Take 5 samples over a 5-second active window per session

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
#define PIN_MODEM_TX 13
#define PIN_MODEM_RX 4
#define PIN_MODEM_PWR 14      // Digital pin to cycle modem power  

// -- Analog Sensor Pins (Verified) --
#define PIN_PH 36         // Shield A0 / GPIO 36 (ADC1_CH0)
#define PIN_DO 39         // Shield A1 / GPIO 39 (ADC1_CH3)
#define PIN_EC 34         // Shield A2 / GPIO 34 (ADC1_CH6)
#define PIN_TURBIDITY 35  // Shield A3 / GPIO 35 (ADC1_CH7)
#define PIN_ORP 15        // Shield A4 / GPIO 15 (ADC2_CH3) - *** FIX ***

// -- Battery Monitoring --
#define PIN_BATTERY 25 // Shield D2

// -- Internal Environment Sensor --
// SHT40 Temp & Humidity uses standard hardware I2C (SDA/SCL pins on the shield)

// -- Other Settings --
#define DEFAULT_VREF 3300.0 // 3.3V VREF in mV

// -- Storage (LittleFS)
#define MAX_SESSIONS_STORED 100 // Max # of JSON files to keep

#endif // CONFIG_H;
