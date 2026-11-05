// Central copy + media credits so content edits don't require touching layout code.
import heroHome from '../assets/images/hero-home.webp';
import heroHomeMobile from '../assets/images/hero-home-mobile.webp';
import heroAbout from '../assets/images/hero-about.webp';
import heroAboutMobile from '../assets/images/hero-about-mobile.webp';
import mission1 from '../assets/images/mission-1.webp';
import mission2 from '../assets/images/mission-2.webp';
import vision1 from '../assets/images/vision-1.webp';
import vision2 from '../assets/images/vision-2.webp';
import barberTools from '../assets/images/barber-tools.webp';

export const CONTACT_EMAIL = 'wayandacareconnect@gmail.com';

export const NAV_LINKS = [
  { label: 'How it works', to: '/#how-it-works' },
  { label: 'About us', to: '/about-us' },
  { label: 'Pricing', to: '/#pricing' },
  { label: 'Contact', to: '#contact' },
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
  heroHome: {
    src: heroHome,
    mobile: heroHomeMobile,
    alt: 'A barber in glasses trims the hair of a smiling senior man in a classic barbershop.',
  },
  heroAbout: { src: heroAbout, mobile: heroAboutMobile },
  mission1: { src: mission1, alt: 'A hairdresser trims a senior woman’s short grey hair with scissors and a comb.' },
  mission2: { src: mission2, alt: 'A barber trims a reclining man’s grey beard with scissors.' },
  vision1: { src: vision1, alt: 'A barber carefully grooms an older man’s beard.' },
  vision2: { src: vision2, alt: 'A barber holding a comb stands beside an older man seated in the chair.' },
  barberTools: { src: barberTools, alt: 'Scissors, clippers, guards, a comb and a razor laid out neatly on an orange surface.' },
};
