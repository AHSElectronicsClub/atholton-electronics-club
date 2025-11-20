'use client';
import React from 'react';
import PageContainer from '../../components/PageContainer';
import CodeSnippet from '../../components/CodeSnippet'; 
import { RESOURCES_DATA } from '../../data/db'; 

// --- In-lined SVG Icons ---
const LinkIcon = ({ className }: { className: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
  </svg>
);
const CodeIcon = ({ className }: { className: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5 0l-4.5 16.5" />
  </svg>
);
const WrenchIcon = ({ className }: { className: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.83-5.83M11.42 15.17l.75-.75a8.967 8.967 0 01-2.312 2.312l-.75-.75M11.42 15.17L5.83 21M17.25 21L21 17.25M8.25 6l1.414-1.414a2.25 2.25 0 013.182 0l4.95 4.95a2.25 2.25 0 010 3.182l-1.414 1.414M8.25 6L6 8.25m0 0l-1.414 1.414a2.25 2.25 0 01-3.182 0L1.05 9.318a2.25 2.25 0 010-3.182l1.414-1.414a2.25 2.25 0 013.182 0l4.95 4.95z" />
  </svg>
);

// --- ResourceCard component ---
const ResourceCard = ({ resource }: { resource: typeof RESOURCES_DATA[0] }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'code':
        return <CodeIcon className="w-6 h-6 text-gold" />;
      case 'supplier':
        return <WrenchIcon className="w-6 h-6 text-gold" />;
      default:
        return <LinkIcon className="w-6 h-6 text-gold" />;
    }
  };

  return (
    <a 
      href={resource.link} 
      target="_blank" 
      rel="noopener noreferrer"
      className="bg-white shadow-lg rounded-xl p-6 flex items-start gap-4 transition-shadow hover:shadow-2xl"
    >
      <div className="flex-shrink-0">
        {getIcon(resource.type)}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-forest mb-1">{resource.title}</h3>
        <p className="text-sm text-gray-700">{resource.description}</p>
        <span className="text-sm text-gold font-medium mt-2 inline-block">
          Visit Link &rarr;
        </span>
      </div>
    </a>
  );
};


// --- FIX #1: Replaced C++ code with Java code ---
const exampleCode = `
package com.aquaguardian.sensors;

import java.util.Random;

/**
 * Example Java class for a sensor module.
 * This simulates reading data from a sensor.
 */
public class TemperatureSensor {

    private String sensorId;
    private Random random = new Random();

    public TemperatureSensor(String sensorId) {
        this.sensorId = sensorId;
        System.out.println("Sensor " + sensorId + " initialized.");
    }

    /**
     * Simulates reading a temperature value.
     * @return A random temperature reading.
     */
    public double readTemperature() {
        // Simulate a reading between 15.0 and 25.0 C
        double reading = 15.0 + (10.0 * random.nextDouble());
        System.out.println("Reading from " + sensorId + ": " + reading + " C");
        return reading;
    }

    public static void main(String[] args) {
        TemperatureSensor waterTemp = new TemperatureSensor("DS18B20");
        
        for (int i = 0; i < 5; i++) {
            waterTemp.readTemperature();
            try {
                Thread.sleep(1000); // Wait 1 second
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}
`;

// --- YOUR MAIN PAGE ---
export default function ResourcesPage() {
  return (
    <PageContainer title="Resources">

      {/* --- Resource Links Section --- */}
      <section className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {RESOURCES_DATA.map(resource => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </section>

      {/* --- Code Snippet Section (FIXED) --- */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-forest mb-4">Example Code</h2>
        
        {/* --- FIX #2: Updated title to "Java" --- */}
        <h3 className="text-lg font-medium text-gray-800 mb-2">
          Example Sensor Class (Java)
        </h3>
        
        {/* --- FIX #3: Updated language to "java" --- */}
        <CodeSnippet 
          language="java"
          codeString={exampleCode}
        />
      </section>

    </PageContainer>
  );
}