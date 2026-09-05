#ifndef MODEM_H
#define MODEM_H

#define TINY_GSM_MODEM_SIM7600
#include <TinyGsmClient.h>
#include <Arduino.h>

bool modem_init();
bool modem_get_gps(float& lat, float& lon);
String modem_get_utc_time();
bool modem_connect_network();
void modem_disconnect();
bool modem_http_post(String payload);
bool modem_wait_for_time(int timeout_sec);

#endif