/**
 * @file modem.cpp
 * @brief Implementation file for A7670E 4G Modem.
 */

// --- HEADER INCLUDES ---
#include "config.h"

// Define the modem model BEFORE including TinyGsm headers
#define TINY_GSM_MODEM_SIM7600

#include <TinyGsm.h>
#include <TinyGsmClient.h>
#include "modem.h"

HardwareSerial SerialAT(SERIAL_AT_PORT);
TinyGsm modem(SerialAT);

/**
 * @brief Initializes the modem.
 */
bool modem_init() {
    Serial.println("Initializing modem...");

    SerialAT.begin(SERIAL_AT_BAUD, SERIAL_8N1, PIN_MODEM_RX, PIN_MODEM_TX);

    for (int i = 0; i < 5; i++) {
        SerialAT.println("AT");
        delay(100);
    }

    Serial.println("Checking if modem is already on...");
    if (!modem.testAT()) {
        Serial.println("Modem not responding. Toggling power pin...");
        pinMode(PIN_MODEM_PWR, OUTPUT);
        digitalWrite(PIN_MODEM_PWR, HIGH);
        delay(1000); 
        digitalWrite(PIN_MODEM_PWR, LOW);
        pinMode(PIN_MODEM_PWR, INPUT); 
        delay(1500);
    } else {
        Serial.println("Modem is already awake. Skipping power toggle.");
    }

    Serial.println("Waiting for modem to respond...");
    
    if (!modem.init()) {
        Serial.println("Failed to initialize modem!");
        return false;
    }

    String modemInfo = modem.getModemInfo();
    Serial.printf("Modem Info: %s\n", modemInfo.c_str());

    Serial.println("Enabling GPS... (This may take a moment)");
    modem.sendAT(GF("+CGNSSPWR=1")); 
    modem.waitResponse(2000L);
    
    return true;
}

/**
 * @brief Gets GPS coordinates.
 */
bool modem_get_gps(float& lat, float& lon) {
    String res;
    modem.sendAT(GF("+CGNSSINF"));
    
    // Reduced wait time since we are looping, and muted the error print
    if (modem.waitResponse(2000L, GF("+CGNSSINF:")) != 1) {
        return false;
    }
    
    res = modem.stream.readStringUntil('\r');
    modem.waitResponse();

    int firstComma = res.indexOf(',');
    if (firstComma == -1) { return false; }

    int secondComma = res.indexOf(',', firstComma + 1);
    if (secondComma == -1) { return false; }
    
    String fixStatusStr = res.substring(firstComma + 1, secondComma);
    if (fixStatusStr.toInt() != 1) {
        // Muted the "No GPS fix." print to avoid serial spam during the wait loop
        return false;
    }

    int thirdComma = res.indexOf(',', secondComma + 1);
    if (thirdComma == -1) { return false; }

    int fourthComma = res.indexOf(',', thirdComma + 1);
    if (fourthComma == -1) { return false; }

    String latStr = res.substring(thirdComma + 1, fourthComma);
    lat = latStr.toFloat();

    int fifthComma = res.indexOf(',', fourthComma + 1);
    if (fifthComma == -1) { return false; }

    String lonStr = res.substring(fourthComma + 1, fifthComma);
    lon = lonStr.toFloat();

    if (lat == 0.0 && lon == 0.0) {
        return false;
    }

    return true;
}

/**
 * @brief Gets the current UTC time from the cellular network.
 */
String modem_get_utc_time() {
    int year, month, day, hour, min, sec;
    float timezone;
    if (modem.getNetworkTime(&year, &month, &day, &hour, &min, &sec, &timezone)) {
        char iso_time[25];
        snprintf(iso_time, sizeof(iso_time), "%04d-%02d-%02dT%02d:%02d:%02dZ",
                 year, month, day, hour, min, sec);
        return String(iso_time);
    } else {
        unsigned long now = millis();
        char fallback_time[25];
        snprintf(fallback_time, sizeof(fallback_time), "T%luS", now / 1000);
        return String(fallback_time);
    }
}

/**
 * @brief Waits for the modem to synchronize time with the cell network.
 */
bool modem_wait_for_time(int timeout_sec) {
    int year, month, day, hour, min, sec;
    float timezone;
    
    Serial.print("Waiting for network time sync");
    unsigned long start = millis();
    while (millis() - start < (timeout_sec * 1000UL)) {
        if (modem.getNetworkTime(&year, &month, &day, &hour, &min, &sec, &timezone)) {
            // Validate that we got a real year (e.g., greater than 2024)
            if (year >= 2025) {
                Serial.println(" OK");
                return true;
            }
        }
        Serial.print(".");
        delay(2000);
    }
    Serial.println(" Timeout. Using fallback.");
    return false;
}

/**
 * @brief Connects to the GPRS network and configures public DNS.
 */
bool modem_connect_network() {
    Serial.print("Waiting for network... ");
    if (!modem.waitForNetwork()) {
        Serial.println("FAIL");
        return false;
    }
    Serial.println("OK");

    Serial.printf("Connecting to GPRS: %s... ", apn);
    if (!modem.gprsConnect(apn, gprsUser, gprsPass)) {
        Serial.println("FAIL");
        return false;
    }
    Serial.println("OK");

    Serial.println("Configuring DNS servers...");
    modem.sendAT(GF("+CDNSCFG=\"8.8.8.8\",\"8.8.4.4\""));
    modem.waitResponse(2000L);

    return true;
}

/**
 * @brief Disconnects from the GPRS network.
 */
void modem_disconnect() {
    modem.gprsDisconnect();
    Serial.println("GPRS Disconnected.");

    modem.poweroff();
    Serial.println("Modem powered down.");
    delay(5000);
}

/**
 * @brief Performs a plain HTTP POST request to the PythonAnywhere bridge.
 */
bool modem_http_post(String payload) {
    Serial.println("Connecting to PythonAnywhere bridge via plain HTTP...");

    while (modem.stream.available()) {
        modem.stream.read();
    }

    modem.sendAT(GF("+HTTPTERM"));
    modem.waitResponse(2000L); 
    delay(500);

    modem.sendAT(GF("+HTTPINIT"));
    if (modem.waitResponse(3000L) != 1) {
        Serial.println("FAIL (Init Error)");
        return false;
    }

    // Disable SSL for plain HTTP (port 80) to PythonAnywhere
    modem.sendAT(GF("+HTTPSSL=0"));
    modem.waitResponse(2000L); 

    // Target your PythonAnywhere Flask app endpoint
    modem.sendAT(GF("+HTTPPARA=\"URL\",\"http://AHSEC.pythonanywhere.com/upload\""));
    if (modem.waitResponse(3000L) != 1) {
        Serial.println("FAIL (URL Error)");
        modem.sendAT(GF("+HTTPTERM"));
        return false;
    }

    modem.sendAT(GF("+HTTPPARA=\"CONTENT\",\"application/json\""));
    if (modem.waitResponse(2000L) != 1) {
        Serial.println("FAIL (Content Error)");
        modem.sendAT(GF("+HTTPTERM"));
        return false;
    }

    modem.sendAT(GF("+HTTPDATA="), payload.length(), GF(",10000"));
    if (modem.waitResponse(5000L, GF("DOWNLOAD")) == 1) {
        delay(100);
        modem.stream.print(payload);
        if (modem.waitResponse(5000L) != 1) {
            Serial.println("FAIL (Data ACK Error)");
            modem.sendAT(GF("+HTTPTERM"));
            return false;
        }
    } else {
        Serial.println("FAIL (Could not send data)");
        modem.sendAT(GF("+HTTPTERM"));
        return false;
    }

    modem.sendAT(GF("+HTTPACTION=1"));
    if (modem.waitResponse(5000L) != 1) {
        Serial.println("FAIL (Action Error)");
        modem.sendAT(GF("+HTTPTERM"));
        return false;
    }
    
    int action = modem.waitResponse(30000L, GF("+HTTPACTION:"));
    bool success = false;
    if (action == 1) {
        String res = modem.stream.readStringUntil('\n');
        Serial.print(" Server responded: ");
        Serial.println(res);
        if (res.indexOf("200") != -1 || res.indexOf("201") != -1) {
            success = true;
        }
    } else {
        Serial.println(" FAIL (Timeout)");
    }

    modem.sendAT(GF("+HTTPTERM"));
    modem.waitResponse(2000L);
    delay(500);
    
    return success;
}