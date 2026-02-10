import { useState } from 'react';
import { Shuffle } from 'lucide-react';
import { CATEGORIES, type Category } from '@/lib/types';
import { CategoryIcon } from './CategoryIcon';

interface CategoryPickerProps {
  selected: Category | 'all';
  onChange: (category: Category | 'all') => void;
}

export function CategoryPicker({ selected, onChange }: CategoryPickerProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  const textPrimary = '#2D2D2F';
  const warmAccent = '#E8D5B5';
  const warmAccentBg = '#F5EBD8';

  // Unique colors for each category (vibrant)
  const categoryColors: Record<string, { bg: string; bgHover: string; border: string }> = {
    psychology: { bg: '#E6D0F2', bgHover: '#DBBDEC', border: '#B882CE' }, // lavender
    society: { bg: '#F8D0C6', bgHover: '#F4BBAD', border: '#D47D6A' },    // coral
    science: { bg: '#C8E3DD', bgHover: '#B5D9D1', border: '#72B0A4' },    // mint
    economics: { bg: '#F2E0BE', bgHover: '#ECD2A5', border: '#C49D56' },  // gold
    tech: { bg: '#CDDCF2', bgHover: '#B9CEEC', border: '#7A9DCB' },       // blue
    art: { bg: '#F8C8DA', bgHover: '#F3B2CA', border: '#CD6A90' },        // pink
  };

  const getStyle = (id: string) => {
    const isSelected = selected === id;
    const isHovered = hovered === id;
    
    // For "all" button, use the warm accent colors
    if (id === 'all') {
      if (isSelected) {
        return {
          background: warmAccentBg,
          color: textPrimary,
          border: `2px solid ${warmAccent}`,
        };
      }
      return {
        background: isHovered ? '#F8F4EF' : '#F5F2ED',
        color: textPrimary,
        border: '2px solid transparent',
      };
    }
    
    // For category buttons with unique colors
    const colors = categoryColors[id];
    
    if (isSelected) {
      return {
        background: colors.bgHover,
        color: textPrimary,
        border: `2px solid ${colors.border}`,
      };
    }
    
    return {
      background: isHovered ? colors.bgHover : colors.bg,
      color: textPrimary,
      border: '2px solid transparent',
    };
  };

  return (
    <div className="space-y-2.5">
      <p 
        className="tracking-[1px] uppercase font-bold"
        style={{ 
          color: '#999',
          fontFamily: "'Fredoka', 'Nunito', sans-serif",
          fontSize: '13px',
        }}
      >
        Category
      </p>
      
      {/* Category Grid */}
      <div className="grid grid-cols-3 gap-1.5">
        {CATEGORIES.map((category) => (
          <button
            key={category.id}
            onClick={() => onChange(category.id)}
            onMouseEnter={() => setHovered(category.id)}
            onMouseLeave={() => setHovered(null)}
            className="py-3 px-2 rounded-xl text-center transition-all duration-150 flex flex-col items-center gap-1.5 font-semibold text-[12px]"
            style={getStyle(category.id)}
          >
            <CategoryIcon icon={category.icon} size={20} />
            {category.name}
          </button>
        ))}
      </div>

      {/* All Topics - Full Width */}
      <button
        onClick={() => onChange('all')}
        onMouseEnter={() => setHovered('all')}
        onMouseLeave={() => setHovered(null)}
        className="w-full py-3 px-4 rounded-xl text-center transition-all duration-150 flex items-center justify-center gap-2.5 font-semibold text-sm"
        style={getStyle('all')}
      >
        <Shuffle size={16} />
        All Topics
      </button>
    </div>
  );
}
