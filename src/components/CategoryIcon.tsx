import { Brain, Globe, FlaskConical, Coins, Monitor, Palette } from 'lucide-react';
import type { CategoryIcon as CategoryIconType } from '@/lib/types';

interface CategoryIconProps {
  icon: CategoryIconType;
  size?: number;
  className?: string;
}

const iconMap = {
  'brain': Brain,
  'globe': Globe,
  'flask-conical': FlaskConical,
  'coins': Coins,
  'monitor': Monitor,
  'palette': Palette,
} as const;

export function CategoryIcon({ icon, size = 18, className }: CategoryIconProps) {
  const IconComponent = iconMap[icon];
  return <IconComponent size={size} className={className} />;
}
