import type { Project, Mentor, TeamMember, Event } from './types';

export const PROJECTS_DATA: Project[] = [
  {
    id: 100,
    title: 'Aqua Guardian: Environmental Buoy',
    slug: 'aqua-guardian',
    tags: ['iot', 'sensors', 'cellular', 'environment', 'ph', 'dissolved-oxygen', 'turbidity', 'temperature', 'ec', 'orp', 'ESP32'],
    shortDescription: 'Student-built, cellular-enabled IoT buoy with an industrial-grade sensor array for real-time water quality monitoring.',
    description: `The Aqua-Guardian is a student-built, cellular-enabled IoT buoy equipped with an industrial-grade sensor array (pH, Dissolved Oxygen, Turbidity, Temperature, EC, and ORP) to provide real-time, continuous monitoring of our local water resources.

The project addresses the existing data gap in water quality monitoring by focusing on three key components:

1. AI-Enhanced Risk Scoring: We process raw sensor data to generate clear, actionable indicators, such as an automatic flag for Nutrient Enrichment (potential sewage) and an Algal Bloom Risk Score.
2. Policy & Advocacy Focus: This system directs human attention to high-risk areas and provides the suitable evidence needed for citizens and officials to advocate for stronger environmental policy.
3. Testing & Validation: We plan to conduct a local pilot program where sensor data from Lake Elkhorn is continuously fed into the system. We will validate the AI's risk scores by cross-referencing them with independent, lab-certified environmental data to confirm accuracy and reliability.

We believe that building a high-impact, open-source technology is a direct way to help the community.`,
    partsList: [
      'Cellular Modem (LTE Cat-M / NB-IoT)',
      'ESP32 (or similar microcontroller)',
      'Industrial pH Probe',
      'Dissolved Oxygen (DO) Probe',
      'Turbidity Sensor (optical)',
      'Temperature Sensor (PT100/DS18B20)',
      'Conductivity (EC) Probe',
      'ORP Probe',
      'Solar Panel & Charge Controller',
      '18650 Battery Pack with Battery Management',
      'Waterproof Buoy Enclosure & Mounting Hardware',
      'Onboard Edge Compute Module (optional for preprocessing)'
    ],
    images: [
      '/images/aqua-prototype.jpg',
      '/images/sensor-array.jpg',
      '/images/lake-deployment.jpg'
    ],
    repoLink: 'https://github.com/atholton-e-club/aqua-guardian',
    pdfLink: '#',
    youtubeId: null
  }
];

export const ALL_TAGS = Array.from(new Set(PROJECTS_DATA.flatMap(p => p.tags))).sort();

export const EVENTS_DATA: Event[] = [
  { id: 1, title: 'Weekly Meeting & Open Lab', date: 'Every Wednesday', time: '2:40 PM – 3:40 PM', location: 'Room E172 (The "Makerspace")', description: "Our regular weekly meeting...", organizer: 'Dr. Evelyn Reed', contact: 'ereed@atholton.edu', calendarLink: 'https://calendar.app.google/u5trzue6ms8Tbqq79' },
  { id: 2, title: 'Workshop: Intro to Soldering', date: 'Friday, November 14, 2025', time: '4:00 PM – 6:00 PM', location: 'Electronics Bench (Room E172)', description: 'Learn through-hole soldering...', organizer: 'Jane Doe', contact: 'jane.doe@student.atholton.edu', calendarLink: 'https://calendar.app.google/qRb3MeRJ4EHVdV949' },
  { id: 3, title: 'Guest Speaker: Chesapeake Bay Foundation', date: 'Tuesday, November 25, 2025', time: '1:00 PM (Lunch Period)', location: 'Auditorium', description: 'A field researcher will discuss water quality monitoring', organizer: 'Dr. Evelyn Reed', contact: 'ereed@atholton.edu', calendarLink: 'https://calendar.app.google/cF5yJi5a45Xdn7xc8' }
];

export const MENTORS_DATA: Mentor[] = [
  { id: 1, name: 'Arif Khan', title: 'Mentor / Software Engineer', bio: 'Arif is a software engineer at Dundics Enterprises with experience in multiple programming languages (Python, C++, C Sharp). He specializes in distributed computing architectures and expiremental research.', officeHours: 'By Appointment', imageUrl: '/images/arif-khan.jpg' },
  { id: 2, name: 'Radhika Wijetunge', title: 'Project Manager, Stormwater Management Division', bio: "Radhika is a Project Manager with the Stormwater Management Division of Howard County's Department of Public Works' Bureau of Environmental Services. A civil engineer with degrees from Princeton and Yale, graduate work at MIT, and expertise in computer mapping and modeling.", officeHours: 'By Appointment', imageUrl: '/images/radhika.jpg' }
];

export const TEAM_DATA: TeamMember[] = [
  { id: 1, name: 'Austen Shaheen', title: 'President / Electrical Team Lead', imageUrl: '/images/austen.jpg' },
  { id: 2, name: 'Anwar Khan', title: 'President / Mechanical Team Lead', imageUrl: '/images/anwar.jpg' },
  { id: 3, name: 'Shalin Vakil', title: 'Vice President / Software Team Lead', imageUrl: '/images/shalin.jpg' },
  { id: 4, name: 'Ayaan Kalra', title: 'Software Team Lead / Outreach', imageUrl: '/images/ayaan.jpg' },
  { id: 5, name: 'Timothy Ward', title: 'Mechanical Team Lead', imageUrl: '/images/timothy.jpg' },
];

// --- THIS IS THE FIX ---
// I have added the "Sierra Club" link back to your resources list.
export const RESOURCES_DATA = [
  { id: 1, title: 'Club GitHub Organization', description: 'All our open-source projects...', link: 'https://github.com/AHSElectronicsClub/atholton-electronics-club', type: 'code' },
  { id: 101, title: 'DFRobot', description: 'Our primary parts supplier.', link: 'https://www.dfrobot.com/', type: 'supplier' },
  { id: 2, title: 'Sierra Club (Maryland)', description: 'Local environmental advocacy and partner organization.', link: 'https://www.sierraclub.org/maryland', type: 'link' },
  //{ id: 3, title: 'Soldering 101 Cheatsheet', description: 'A printable 1-page PDF guide.', link: '#', type: 'cheatsheet' }
];

/**
 * Lightweight Gemini wrapper (client usage shown in components but NOT recommended for production).
 * For production, call your secret-key-protected server route instead.
 */
export async function callGeminiApi(systemPrompt: string, userQuery: string, maxRetries = 3): Promise<string> {
  // In production, remove client-side calls and call from server
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
  if (!apiKey) return 'Error: Gemini API key not configured.';
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
  const payload = { contents: [{ parts: [{ text: userQuery }] }], systemInstruction: { parts: [{ text: systemPrompt }] } };

  let delay = 1000;
  for (let i = 0; i < maxRetries; i++) {
    try {
      const res = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!res.ok) {
        if (res.status === 429 || res.status >= 500) throw new Error(`API Error: ${res.status}`);
        const err = await res.json();
        return `Error: ${err.error?.message || 'Failed to call API.'}`;
      }
      const json = await res.json();
      const candidate = json.candidates?.[0];
      if (candidate && candidate.content?.parts?.[0]?.text) return candidate.content.parts[0].text;
      throw new Error('Invalid API response structure.');
    } catch (err: any) {
      if (i === maxRetries - 1) return `Error: ${err.message || 'API call failed.'}`;
      await new Promise(r => setTimeout(r, delay)); delay *= 2;
    }
  }
  return 'Error: API call failed after all retries.';
}