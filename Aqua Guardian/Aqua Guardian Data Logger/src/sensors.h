#ifndef SENSORS_H
#define SENSORS_H

#include <Arduino.h>
#include "config.h"

struct SensorSample {
    String time;       
    float ph = -1.0;
    float temp = -999.0;       // Water temperature (DS18B20)
    float air_temp = -999.0;   // Internal buoy air temperature (SHT40)
    float ec = -1.0;
    float turb = -1.0;
    float in_do = -1.0; 
    float orp = -1.0;
    float battery_v = 0.0;
    float humidity = -1.0;
};

struct SensorReadings {
    String session_id;  
    String device_id = DEVICE_ID;
    float gps_lat = 0.0;
    float gps_lon = 0.0;
    bool water_leak = false;
    int sample_count = 0;
    SensorSample samples[MAX_SAMPLES_PER_SESSION]; 
};

bool sensors_init();
void sensors_get_initial_data(SensorReadings& session_data);
void sensors_read_all(SensorSample& sample);

#endif