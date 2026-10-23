export type Category = 
  | 'All Work'
  | 'YouTube Thumbnails'
  | 'Gaming'
  | 'Education'
  | 'Business and Technology'
  | 'Creative Experiments';

export interface PortfolioItem {
  id: string;
  title: string;
  category: Exclude<Category, 'All Work'>;
  description: string;
  tags: string[];
  aspectRatio: string;
  imageUrl?: string;
  badge?: string;
  softwareUsed?: string;
  visualHook?: string;
  compositionNotes?: string[];
  gradientTheme?: {
    from: string;
    to: string;
  };
  customImage?: string; // Support for user-uploaded custom thumbnail
  isPlaceholder?: boolean;
  slotNumber?: number;
}

export interface CreativeService {
  id: string;
  title: string;
  description: string;
  iconName: string;
  deliverables: string[];
  focus: string;
}

export interface TimelineMilestone {
  step: string;
  title: string;
  description: string;
  timeframe: string;
  highlight: string;
}

export interface SkillItem {
  name: string;
  description: string;
  category: 'Composition' | 'Tool' | 'Visual';
  highlight: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  whatsappNumber: string;
  projectType: string;
  projectDescription: string;
  budgetRange: string;
  preferredContact: 'WhatsApp' | 'Email';
}
