// Central copy + media credits so content edits don't require touching layout code.
import heroLandscape from '../assets/images/hero-barber-senior.webp';
import heroPortrait from '../assets/images/hero-barber-senior-portrait.webp';
import seniorPortrait from '../assets/images/senior-portrait.webp';
import barberTools from '../assets/images/barber-tools.webp';
import barberAtWork from '../assets/images/barber-at-work.webp';

export const CONTACT_EMAIL = 'wayandacareconnect@gmail.com';

export const NAV_LINKS = [
  { label: 'How it works', to: '/#how-it-works' },
  { label: 'About us', to: '/about-us' },
  { label: 'Pricing', to: '/#pricing' },
  { label: 'Contact', to: '#contact' },
];

export const VALUES = [
  'Dignity first',
  'Licensed, vetted barbers',
  'Travel & setup included',
  'Strict hygiene protocols',
  'Serving care homes across Ontario',
  'One haircut at a time',
];

export const MISSION =
  'To restore dignity, connection, and confidence to our elders by offering professional, mobile grooming services in the comfort of their care homes.';
export const VISION =
  'To see every nursing home in Ontario served by a team of trusted barbers who bring smiles, style, and spiritual care to those who need it most.';

export const STEPS = [
  {
    title: 'Book a visit',
    text: 'Fill out a short booking form, choose your preferred dates and times, and tell us how many residents you would like served.',
  },
  {
    title: 'We match a barber',
    text: 'We pair your facility with a licensed, vetted barber from our network who serves your area.',
  },
  {
    title: 'Care, on site',
    text: 'Our barbers arrive with every tool needed, follow strict hygiene protocols, and treat each resident with care and respect.',
  },
];

export const IMAGES = {
  heroLandscape: {
    src: heroLandscape,
    alt: 'An older barber in glasses carefully trims the hair of a senior man in a classic barber chair.',
  },
  heroPortrait: { src: heroPortrait },
  seniorPortrait: { src: seniorPortrait, alt: 'Portrait of a smiling senior man in a cardigan, sitting at home.' },
  barberTools: { src: barberTools, alt: 'Scissors, clippers, guards, a comb and a razor laid out neatly on an orange surface.' },
  barberAtWork: { src: barberAtWork, alt: 'A barber cuts a client’s hair with clippers in front of an old mirror on a brick wall.' },
};

// Unsplash License: free to use; attribution is appreciated, not required.
export const CREDITS = [
  { who: 'Tim Mossholder', profile: 'https://unsplash.com/@timmossholder', photo: 'https://unsplash.com/photos/okvy6zpdifw' },
  { who: 'Vitaly Gariev', profile: 'https://unsplash.com/@silverkblack', photo: 'https://unsplash.com/photos/okF-Uz_U0Yg' },
  { who: 'Sinval Carvalho', profile: 'https://unsplash.com/@sinvalbmx', photo: 'https://unsplash.com/photos/WbEibGKHBMY' },
  { who: 'cheng feng', profile: 'https://unsplash.com/@chengfengrecord', photo: 'https://unsplash.com/photos/Dqk_vFqUj0o' },
];
