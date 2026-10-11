import { TemplateDefinition } from './templateTypes';
import { ClassicElegance } from './components/ClassicElegance';
import { ModernMinimal } from './components/ModernMinimal';
import { RoyalBurgundy } from './components/RoyalBurgundy';
import { FloralGrace } from './components/FloralGrace';
import { ContemporaryEditorial } from './components/ContemporaryEditorial';
import { HeritageClassic } from './components/HeritageClassic';
import { BotanicalIvory } from './components/BotanicalIvory';
import { TraditionalIndian } from './components/TraditionalIndian';
import { ContemporaryPortrait } from './components/ContemporaryPortrait';
import { MinimalMonogram } from './components/MinimalMonogram';
import { GracefulRose } from './components/GracefulRose';
import { FormalProfessional } from './components/FormalProfessional';

export const TEMPLATE_REGISTRY: TemplateDefinition[] = [
  {
    id: 'classic-elegance',
    name: 'Classic Elegance',
    number: '01',
    category: ['Traditional', 'Premium'],
    description: 'Traditional biodata composition with serif typography, ivory background, refined maroon headings, and thin ornamental borders.',
    features: ['Double gold ornamental border', 'Centered serif hierarchy', 'Corner flourishes', 'Balanced lineage structure'],
    themeColor: '#4B1020',
    accentColor: '#C7A36A',
    component: ClassicElegance,
  },
  {
    id: 'modern-minimal',
    name: 'Modern Minimal',
    number: '02',
    category: ['Minimal', 'Modern'],
    description: 'Strong typographic hierarchy, generous whitespace, clean layout, and subtle dividers without unnecessary ornaments.',
    features: ['Swiss-inspired grid', 'Clean sans typography', 'High readability', 'Tabular data columns'],
    themeColor: '#292122',
    accentColor: '#4B1020',
    component: ModernMinimal,
  },
  {
    id: 'royal-burgundy',
    name: 'Royal Burgundy',
    number: '03',
    category: ['Premium', 'Traditional'],
    description: 'Deep maroon accents, champagne-gold details, refined framing, and luxurious editorial typography.',
    features: ['Rich burgundy canvas', 'Champagne gold filigree', 'Embossed frame motif', 'Luxury wedding stationery feel'],
    themeColor: '#310914',
    accentColor: '#C7A36A',
    component: RoyalBurgundy,
  },
  {
    id: 'floral-grace',
    name: 'Floral Grace',
    number: '04',
    category: ['Floral', 'Premium'],
    description: 'Delicate floral botanical illustrations, warm ivory background, soft decorative corners, and an elegant circular portrait.',
    features: ['Hand-drawn botanical vectors', 'Gentle curve accents', 'Romantic stationery aesthetic', 'Graceful section dividers'],
    themeColor: '#671C32',
    accentColor: '#C7A36A',
    component: FloralGrace,
  },
  {
    id: 'contemporary-editorial',
    name: 'Contemporary Editorial',
    number: '05',
    category: ['Modern', 'Premium'],
    description: 'Magazine-inspired typography, oversized name treatment, asymmetric information layout, and refined text hierarchy.',
    features: ['Publication masthead styling', 'Asymmetric 2-column spread', 'High-contrast editorial serif', 'Bold section markers'],
    themeColor: '#4B1020',
    accentColor: '#786B6B',
    component: ContemporaryEditorial,
  },
  {
    id: 'heritage-classic',
    name: 'Heritage Classic',
    number: '06',
    category: ['Traditional', 'Premium'],
    description: 'Traditional Indian visual references, subtle architectural jali arch motifs, formal grouping, and refined maroon and cream palette.',
    features: ['Traditional arch emblem', 'Sanskrit invocation', 'Culturally respectful styling', 'Distinct family lineage partition'],
    themeColor: '#4B1020',
    accentColor: '#C7A36A',
    component: HeritageClassic,
  },
  {
    id: 'botanical-ivory',
    name: 'Botanical Ivory',
    number: '07',
    category: ['Floral', 'Minimal'],
    description: 'Botanical line illustrations, soft neutral colors, light borders, and elegant serif typography for natural presentation.',
    features: ['Botanical leaf emblem', 'Neutral cream paper tones', 'Airy reading measure', 'Subtle hairline partitions'],
    themeColor: '#671C32',
    accentColor: '#C7A36A',
    component: BotanicalIvory,
  },
  {
    id: 'traditional-indian',
    name: 'Traditional Indian',
    number: '08',
    category: ['Traditional'],
    description: 'Formal marriage biodata structure with auspicious Vedic elements, clear family details, and print-friendly styling.',
    features: ['Auspicious Shree Ganesh motif', 'Bilingual section clarity', 'High contrast print layout', 'Formal family lineage'],
    themeColor: '#671C32',
    accentColor: '#C7A36A',
    component: TraditionalIndian,
  },
  {
    id: 'contemporary-portrait',
    name: 'Contemporary Portrait',
    number: '09',
    category: ['Modern', 'Minimal'],
    description: 'Portrait-led layout with prominent hero frame, compact personal details, and separate career and family sections.',
    features: ['Prominent portrait frame', 'Curated summary statement', 'Modern two-column symmetry', 'Clean corporate balance'],
    themeColor: '#4B1020',
    accentColor: '#C7A36A',
    component: ContemporaryPortrait,
  },
  {
    id: 'minimal-monogram',
    name: 'Minimal Monogram',
    number: '10',
    category: ['Minimal', 'Premium'],
    description: 'Typography-led composition featuring an elegant initials monogram seal, thin dividers, and carefully aligned details.',
    features: ['Bespoke monogram initials crest', 'Crisp hairline borders', 'Minimal luxury layout', 'Understated elegance'],
    themeColor: '#4B1020',
    accentColor: '#786B6B',
    component: MinimalMonogram,
  },
  {
    id: 'graceful-rose',
    name: 'Graceful Rose',
    number: '11',
    category: ['Floral', 'Premium'],
    description: 'Muted rose and burgundy accents, refined floral details, elegant heading hierarchy, and balanced portrait placement.',
    features: ['Rosebud decorative flourishes', 'Warm rose-tinted palette', 'Soft rounded container accents', 'Serene editorial typography'],
    themeColor: '#671C32',
    accentColor: '#C7A36A',
    component: GracefulRose,
  },
  {
    id: 'formal-professional',
    name: 'Formal Professional',
    number: '12',
    category: ['Modern', 'Minimal'],
    description: 'Highly structured executive layout, neutral background, clear sections and labels, suitable for straightforward biodatas.',
    features: ['Executive CV aesthetic', 'Corporate card sections', 'Clear tabular parameters', 'High-contrast typography'],
    themeColor: '#4B1020',
    accentColor: '#292122',
    component: FormalProfessional,
  },
];

export function getTemplateById(id: string): TemplateDefinition {
  const found = TEMPLATE_REGISTRY.find((t) => t.id === id);
  return found || TEMPLATE_REGISTRY[0];
}
