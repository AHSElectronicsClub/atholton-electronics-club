'use client';
import React from 'react';
import { Code2, Wrench, Link2, ArrowUpRight, Activity, Compass, FolderGit2 } from 'lucide-react';
import PageHero from '../../components/PageHero';
import SectionHeading from '../../components/SectionHeading';
import JoinCTA from '../../components/JoinCTA';
import CodeSnippet from '../../components/CodeSnippet';
import { RESOURCES_DATA } from '../../data/db';

const ResourceCard = ({ resource }: { resource: typeof RESOURCES_DATA[0] }) => {
  const Icon = resource.type === 'code' ? Code2 : resource.type === 'supplier' ? Wrench : Link2;
  const label = resource.type === 'code' ? 'Code' : resource.type === 'supplier' ? 'Parts supplier' : 'Link';
  return (
    <a
      href={resource.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-2xl border border-forest-100 bg-white p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift"
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-forest-800 text-mint-300"><Icon size={20} /></span>
        <span className="rounded-full bg-forest-50 px-2.5 py-0.5 text-xs font-semibold text-forest-700">{label}</span>
      </div>
      <h3 className="font-display text-lg font-bold text-forest-900">{resource.title}</h3>
      <p className="mt-1 flex-1 text-sm leading-relaxed text-gray-600">{resource.description}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-buoy-600">
        Visit <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
    </a>
  );
};

// Excerpt from the Aqua Guardian firmware (src/main.cpp). The "..." comment marks where lines are left out.
const exampleCode = `
/**
 * @brief Main logging loop. Runs for a fixed duration, sampling sensors.
 */
void run_logging_window() {
    Serial.println("\\n--- STARTING LOGGING WINDOW ---");
    
    // Calculate total logging duration from config
    const unsigned long logging_duration_ms = MAX_SAMPLES_PER_SESSION * SENSOR_READ_INTERVAL_MS;
    unsigned long logging_start_time = millis();
    unsigned long next_sample_time = logging_start_time;

    session_data.sample_count = 0;

    while (millis() - logging_start_time < logging_duration_ms) {
        if (millis() >= next_sample_time) {
            
            Serial.printf("Taking sample %d/%d...\\n", session_data.sample_count + 1, MAX_SAMPLES_PER_SESSION);
            
            SensorSample sample;
            sample.time = modem_get_utc_time(); 
            sensors_read_all(sample); 
            
            // --- NEW: HUMIDITY LEAK DETECTION ---
            // If internal humidity exceeds 85%, assume water ingress
            if (sample.humidity > 85.0) {
                session_data.water_leak = true;
                Serial.println("WARNING: High internal humidity! Flagging water leak.");
            }
            
            // Add sample to the session data
            if (session_data.sample_count < MAX_SAMPLES_PER_SESSION) {
                session_data.samples[session_data.sample_count] = sample;
                session_data.sample_count++;
            }

            // Schedule next sample
            next_sample_time += SENSOR_READ_INTERVAL_MS;
        }
        // Small delay to prevent busy-looping
        delay(10); 
    }
    // ... (saves the session to a file after the loop)
}

/**
 * @brief Enters deep sleep for the configured duration.
 */
void go_to_sleep() {
    Serial.printf("Entering deep sleep for %d seconds.\\n", DEEP_SLEEP_DURATION_SEC);
    Serial.flush();
    
    // Configure timer wakeup
    esp_sleep_enable_timer_wakeup(DEEP_SLEEP_DURATION_SEC * 1000000ULL);
    
    // Enter deep sleep
    esp_deep_sleep_start();
}
`;

const onSite = [
  { href: '/dashboard', icon: Activity, title: 'Data Explorer', text: 'Look at the buoy\'s readings over any time range.' },
  { href: '/journey', icon: Compass, title: 'Timeline', text: 'Photos and video from the build and deployment.' },
  { href: '/projects', icon: FolderGit2, title: 'Projects', text: 'Parts lists, CAD and code for what we make.' },
];

export default function ResourcesPage() {
  return (
    <div>
      <PageHero
        eyebrow="Learn & build"
        title="Resources"
        subtitle="Where to find our code, our parts, and the people and organizations we work with."
        image="/media/photos/aqua-guardian-inside-poster.jpg"
        imageAlt="Top-down view inside the buoy hull showing the electronics"
        focus="50% 50%"
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <section className="mb-20">
          <SectionHeading eyebrow="Elsewhere" title="Links we use every week" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {RESOURCES_DATA.map(resource => <ResourceCard key={resource.id} resource={resource} />)}
          </div>
        </section>

        <section className="mb-20">
          <SectionHeading eyebrow="On this site" title="Keep exploring" />
          <div className="grid gap-5 md:grid-cols-3">
            {onSite.map((o) => (
              <a key={o.href} href={o.href} className="group flex items-start gap-4 rounded-2xl bg-forest-800 p-6 text-white shadow-soft transition-all hover:-translate-y-1 hover:bg-forest-700 hover:shadow-lift">
                <o.icon className="mt-1 shrink-0 text-mint-300" size={24} />
                <div>
                  <h3 className="font-display text-lg font-bold">{o.title}</h3>
                  <p className="mt-1 text-sm text-forest-100">{o.text}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <SectionHeading
            eyebrow="Firmware"
            title="A look at the buoy's firmware"
            subtitle="The buoy runs C++ on an ESP32, built with PlatformIO. This is the logging loop that samples the sensors and checks for a leak, followed by the function that puts the board into deep sleep between cycles."
          />
          <CodeSnippet language="cpp" codeString={exampleCode} />
          <p className="mt-3 text-sm text-gray-500">
            The full firmware lives in our{' '}
            <a className="font-semibold text-buoy-600 hover:underline" href="https://github.com/AHSElectronicsClub/atholton-electronics-club" target="_blank" rel="noopener noreferrer">
              GitHub repository
            </a>.
          </p>
        </section>

        <JoinCTA />
      </div>
    </div>
  );
}
