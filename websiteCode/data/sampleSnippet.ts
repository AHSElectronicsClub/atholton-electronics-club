const SAMPLE_CODE_SNIPPET = `
/*
 * Aqua Guardian - Data Reading Snippet (ESP32)
 * This is a simplified example of the core logic.
 * Full code available in the project's GitHub repo.
 */

#include <OneWire.h>
#include <DallasTemperature.h>

#define ONE_WIRE_BUS 4    // DS18B20 Temp Sensor
#define TURBIDITY_PIN 36  // Analog Turbidity Sensor

OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);

void setup() {
  Serial.begin(115200);
  sensors.begin();
  Serial.println("Aqua Guardian Sensor Node Booting...");
}

void loop() {
  // Request temperature
  sensors.requestTemperatures(); 
  float tempC = sensors.getTempCByIndex(0);

  // Read turbidity
  float turbidityVoltage = analogRead(TURBIDITY_PIN) * (3.3 / 4095.0);
  // Simple conversion (requires calibration)
  float ntu = -1120.4 * sq(turbidityVoltage) + 5742.3 * turbidityVoltage - 4352.9;

  Serial.print("Temp: ");
  Serial.print(tempC);
  Serial.print(" °C, ");
  Serial.print("Turbidity: ");
  Serial.print(ntu);
  Serial.println(" NTU");

  delay(5000); // Read every 5 seconds
}
`;
export default SAMPLE_CODE_SNIPPET;
