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
    title: 'Where the idea came from',
    body: [
      'A few things pushed us toward this project. Harmful algal blooms have been a problem at Lake Centennial, and one of our members lost a dog to a bloom when he was a kid. There have also been sewage overflows in the area.',
      'It was an issue we kept coming across, and it seemed like continuous monitoring would be useful. A station that measures around the clock could show when something changes and where it would be worth testing.',
    ],
    media: [],
  },
  {
    id: 'proposal',
    when: 'November 2025',
    title: 'Designing the system',
    body: [
      'We turned the idea into a full design for the 2025–26 Samsung Solve for Tomorrow competition: a solar-powered, cellular-connected buoy with a six-probe sensor array and software that translates raw readings into clear risk indicators.',
      'Work was divided across three teams. Mechanical took the hull and mounts, electrical took sensors and power, and software took the firmware, cloud pipeline and dashboard.',
    ],
    media: [
      { kind: 'photo', src: '/images/buoyCAD.jpg', alt: 'CAD render of the Aqua Guardian buoy with solar panel and floatation ring', caption: 'The buoy in CAD: A-frame solar panel and stabilizing ring.' },
    ],
  },
  {
    id: 'build',
    when: 'Winter 2025–26',
    title: 'Building the buoy',
    body: [
      'The hull went through several printed prototypes before we committed to a final shape, printed in ASA and sealed with epoxy. A tilted A-frame solar panel keeps power coming in as the buoy turns on its mooring, and a foam ring at the waterline keeps it level.',
      'Inside, a low-power ESP32 controller, a cellular and GPS modem, a protected battery pack and interfaces for six water probes all share a compact tray. Extra sensors inside the enclosure track leaks, temperature and humidity.',
    ],
    media: [
      { kind: 'photo', src: P + 'aqua-guardian-workbench.jpg', alt: 'A member working on the orange buoy hull at the workbench', caption: 'Hull assembly at the lab workbench.' },
      { kind: 'video', src: V + 'aqua-guardian-inside.mp4', poster: P + 'aqua-guardian-inside-poster.jpg', caption: 'A look inside: controller, modem, battery and sensor wiring.' },
    ],
  },
  {
    id: 'cloud',
    when: 'Winter 2025–26',
    title: 'Connecting it to the cloud',
    body: [
      'Each wake-up cycle the buoy samples its sensors, reads its GPS position and sends the batch over cellular to our own cloud service, which stores every reading in a database. Between cycles it sleeps to conserve power.',
      'That pipeline feeds this website: the live data card on the home page, and the Data Explorer, which looks at any time range you choose.',
    ],
    media: [],
  },
  {
    id: 'video',
    when: 'January 2026',
    title: 'Our submission film',
    body: ['The next competition round called for a short video introducing the project. Here is the film we submitted.'],
    media: [{ kind: 'vimeo', id: '1165198659', title: 'Aqua Guardian: Samsung Solve for Tomorrow submission', caption: 'Aqua Guardian: Solve for Tomorrow submission (2026).' }],
  },
  {
    id: 'ice',
    when: 'February 2026',
    title: 'Winter water test',
    body: [
      'Before an open-water deployment we checked flotation and sealing on a partly frozen lake, lowering the buoy through an opening in the ice.',
      'The project was also named a Samsung Solve for Tomorrow national semifinalist.',
    ],
    media: [
      { kind: 'video', src: V + 'lake-test-ice-opening.mp4', poster: P + 'lake-test-ice-opening.jpg', caption: 'Preparing to lower the buoy into the water.' },
      { kind: 'video', src: V + 'buoy-release-ice.mp4', poster: P + 'buoy-release-ice.jpg', caption: 'Setting the buoy in the water.' },
      { kind: 'video', src: V + 'buoy-floating-lake.mp4', poster: P + 'buoy-floating-lake.jpg', caption: 'Afloat and upright.' },
    ],
  },
  {
    id: 'launch',
    when: 'November 11, 2026',
    title: 'Fully deployed on Lake Elkhorn',
    body: [
      'With help from a Columbia Association boat crew, we finished assembly on the dock and set Aqua Guardian in Lake Elkhorn.',
      'It now sends readings on its regular cycle. The latest one is on the home page, and the Data Explorer covers any time range.',
    ],
    media: [
      { kind: 'photo', src: P + 'buoy-launch-2026-11-fall-shoreline.jpg', alt: 'The orange Aqua Guardian buoy floating on Lake Elkhorn with fall trees behind it', caption: 'Aqua Guardian on Lake Elkhorn.' },
      { kind: 'photo', src: P + 'buoy-launch-2026-11-dock-prep.jpg', alt: 'Two club members finishing assembly of the buoy on the dock', caption: 'Final assembly on the dock.' },
      { kind: 'video', src: V + 'buoy-launch-2026-11-lake-assembly.mp4', poster: P + 'buoy-launch-2026-11-lake-assembly.jpg', caption: 'Assembling the buoy at the lake.' },
      { kind: 'video', src: V + 'buoy-launch-2026-11-lab-prep-timelapse.mp4', poster: P + 'buoy-launch-2026-11-lab-prep-timelapse.jpg', caption: 'Timelapse: preparing in the lab.' },
      { kind: 'photo', src: P + 'buoy-launch-2026-11-close.jpg', alt: 'Close-up of the buoy with its solar panel catching the light', caption: 'The solar panel up close.' },
      { kind: 'photo', src: P + 'buoy-launch-2026-11-wide.jpg', alt: 'The buoy as a small orange dot on the wide lake', caption: 'A wide view across the lake.' },
    ],
  },
  {
    id: 'now',
    when: 'Now',
    title: 'Where things stand',
    body: [
      'Water temperature, internal air temperature and conductivity are reading correctly. The pH, dissolved oxygen, ORP and turbidity probes are not calibrated yet, so their values should be ignored for now.',
      'Calibrating those four against reference solutions is the next job. In the meantime, the data card and the Data Explorer show everything the buoy sends.',
    ],
    media: [],
  },
];

export const LAUNCH_FACTS = [
  { label: 'Status', value: 'Fully deployed' },
  { label: 'Location', value: 'Lake Elkhorn' },
  { label: 'Power', value: 'Solar + battery' },
  { label: 'Link', value: 'Cellular + GPS' },
];
