// Content for the "Our Journey" story. Photos/videos are copied from the club's
// maker-site build journal into /public/media.

export type JourneyMedia =
  | { kind: 'photo'; src: string; alt: string; caption: string; focus?: string }
  | { kind: 'video'; src: string; poster: string; caption: string }
  | { kind: 'vimeo'; id: string; title: string; caption: string };

export type JourneyStep = {
  id: string;
  when: string;
  title: string;
  body: string[];
  media: JourneyMedia[];
};

const P = '/media/photos/';
const V = '/media/video/';

export const JOURNEY: JourneyStep[] = [
  {
    id: 'problem',
    when: 'Fall 2025',
    title: 'A problem close to home',
    body: [
      'A 1.3 million-gallon sewage overflow near Watchlight Court, and health advisories for harmful algal blooms at Lake Centennial and Triadelphia Reservoir, got students at Atholton asking a simple question: what if our local water could warn us before a crisis?',
      'Testing water by hand is slow and only captures a moment in time. We set out to fill the gap with a buoy that measures continuously and flags anything unusual, so people know where to look and where to test.',
    ],
    media: [],
  },
  {
    id: 'proposal',
    when: 'November 2025',
    title: 'Proposal and competition entry',
    body: [
      'We wrote up the Aqua Guardian concept for the 2025–26 Samsung Solve for Tomorrow competition: a cellular-enabled, solar-powered buoy with a six-probe sensor array and software that turns raw readings into plain-language risk indicators.',
      'In parallel, the mechanical, electrical and software teams split up the work: CAD and hull design, sensor integration and power, and the cloud pipeline and dashboard.',
    ],
    media: [
      { kind: 'photo', src: '/images/buoyCAD.jpg', alt: 'CAD render of the Aqua Guardian buoy with solar panel and floatation ring', caption: 'An early CAD render of the hull, A-frame solar panel and foam ring.' },
    ],
  },
  {
    id: 'build',
    when: 'Winter 2025–26',
    title: 'Hull, electronics and a lot of wiring',
    body: [
      'We printed and tested different hull shapes, settled on a design printed in ASA, and water-sealed it with epoxy. Steep A-frame solar panels keep the batteries topped up as the buoy swings on its anchor, and a foam ring at the waterline keeps it upright in wind.',
      'Inside sits an ESP32 FireBeetle for low-power control, a SIM7670G cellular + GPS modem, a battery pack with BMS, and the probe interfaces for pH, dissolved oxygen, conductivity, turbidity, temperature and ORP, plus an internal leak sensor and a temperature/humidity monitor for the enclosure.',
      'Along the way a teammate learning heat simulations caught that our antenna mount was hurting the cellular signal. We redesigned it together.',
    ],
    media: [
      { kind: 'photo', src: P + 'aqua-guardian-workbench.jpg', alt: 'A team member working on the orange buoy hull at the workbench', caption: 'Working on the hull at the lab workbench.' },
      { kind: 'video', src: V + 'aqua-guardian-inside.mp4', poster: P + 'aqua-guardian-inside-poster.jpg', caption: 'Inside the buoy: microcontroller, modem, battery and sensor wiring.' },
      { kind: 'photo', src: P + 'electronics-team-bench.jpg', alt: 'Three club members gathered at the electronics bench', caption: 'Team workshop at the electronics bench.' },
    ],
  },
  {
    id: 'cloud',
    when: 'Winter 2025–26',
    title: 'Teaching the buoy to phone home',
    body: [
      'Getting data off a lake is its own project. The cellular modem’s built-in HTTP engine fought us on DNS and TLS, so we worked through several relay approaches before settling on a reliable route to our own cloud API, which stores every reading in a database. The buoy sleeps between readings to save power, then wakes, samples, and transmits.',
      'That pipeline now feeds this website: the live data card on the home page, and the dashboard that runs deviation, moving-average and risk analysis over any time window you choose.',
    ],
    media: [],
  },
  {
    id: 'video',
    when: 'January 2026',
    title: 'Our three-minute submission film',
    body: ['Phase 2 of Solve for Tomorrow asked for a short video. Here is what we submitted.'],
    media: [{ kind: 'vimeo', id: '1165198659', title: 'Aqua Guardian: Samsung Solve for Tomorrow submission', caption: 'Aqua Guardian: Solve for Tomorrow submission (2026).' }],
  },
  {
    id: 'ice',
    when: 'February 2026',
    title: 'Testing through the ice',
    body: [
      'Before any open-water launch we wanted proof that the buoy floats, stays sealed and keeps uploading. In February we cut an opening in a frozen lake, lowered the buoy in and watched it ride on the water.',
      'It floated upright and held together. That same winter we also learned we had made the Samsung Solve for Tomorrow national semifinals as one of two Maryland teams, which won $10,000 for our school.',
    ],
    media: [
      { kind: 'video', src: V + 'lake-test-ice-opening.mp4', poster: P + 'lake-test-ice-opening.jpg', caption: 'At the ice opening, getting ready to lower the buoy in.' },
      { kind: 'video', src: V + 'buoy-release-ice.mp4', poster: P + 'buoy-release-ice.jpg', caption: 'Putting the buoy into the water.' },
      { kind: 'video', src: V + 'buoy-floating-lake.mp4', poster: P + 'buoy-floating-lake.jpg', caption: 'Floating upright on the lake.' },
    ],
  },
  {
    id: 'launch',
    when: 'November 11, 2026',
    title: 'Launch day at Lake Elkhorn',
    body: [
      'At 10 a.m. we met a Columbia Association crew at Lake Elkhorn, finished assembling the buoy on the dock, and rode out on their boat to set it in the water.',
      'The launch went smoothly. The next few hours did not feel like it: nothing uploaded and we had no way to reach the buoy. By the next morning the first entries had arrived. We think the battery was low when it went in and just needed sunlight.',
      'Then the live card reported an internal leak. That flag comes from the humidity sensor inside the hull, and the buoy was still floating happily where we left it. Eventful, but a success.',
    ],
    media: [
      { kind: 'photo', src: P + 'buoy-launch-2026-11-fall-shoreline.jpg', alt: 'The orange Aqua Guardian buoy floating on Lake Elkhorn with fall trees behind it', caption: 'The buoy on Lake Elkhorn.' },
      { kind: 'photo', src: P + 'buoy-launch-2026-11-dock-prep.jpg', alt: 'Two club members finishing assembly of the buoy on the dock', caption: 'Final assembly on the dock.' },
      { kind: 'video', src: V + 'buoy-launch-2026-11-lake-assembly.mp4', poster: P + 'buoy-launch-2026-11-lake-assembly.jpg', caption: 'Putting the buoy together at the lake.' },
      { kind: 'video', src: V + 'buoy-launch-2026-11-lab-prep-timelapse.mp4', poster: P + 'buoy-launch-2026-11-lab-prep-timelapse.jpg', caption: 'Timelapse: getting ready in the lab.' },
      { kind: 'photo', src: P + 'buoy-launch-2026-11-close.jpg', alt: 'Close-up of the buoy with its solar panel catching the light', caption: 'Up close, solar panel catching the light.' },
      { kind: 'photo', src: P + 'buoy-launch-2026-11-wide.jpg', alt: 'The buoy as a small orange dot on the wide lake', caption: 'How small it looks from across the lake.' },
    ],
  },
  {
    id: 'now',
    when: 'Now',
    title: 'Calibrating and collecting',
    body: [
      'Data is arriving at the intervals we set. Our next job is calibrating five of the sensors (pH, dissolved oxygen, ORP, turbidity and conductivity) against reference solutions so the numbers can be trusted in absolute terms, not just as trends.',
      'You can follow along in real time on the dashboard.',
    ],
    media: [],
  },
];

export const LAUNCH_FACTS = [
  { label: 'Launched', value: 'Nov 11, 2026' },
  { label: 'Location', value: 'Lake Elkhorn' },
  { label: 'Power', value: 'Solar + battery' },
  { label: 'Link', value: 'Cellular + GPS' },
];
