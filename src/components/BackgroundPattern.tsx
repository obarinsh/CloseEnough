export function BackgroundPattern() {
  // Colors from our palette
  const coral = '#ce7777';
  const coralDark = '#a85c5c';
  const lavender = '#b677ce';
  const lavenderDark = '#8a5a9e';
  const warmTan = '#E8D5B5';
  const warmTanDark = '#d4bc96';
  const softPeach = '#e8a77c';
  const softPeachDark = '#c98a5f';
  
  // Grid: 5 columns x 4 rows
  // Using viewBox 1000x800 for consistent positioning
  // Each cell is ~200x200
  
  return (
    <div 
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 1 }}
    >
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 1000 800"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        {/* ============ ROW 1 (y: 0-200) ============ */}
        
        {/* Cell 1,1 - Cone */}
        <g transform="translate(30, 40)" opacity="0.8">
          <polygon points="24,0 48,44 0,44" fill={coral} />
          <polygon points="24,0 48,44 24,44" fill={coralDark} />
        </g>

        {/* Cell 1,2 - Curved tube */}
        <g transform="translate(250, 60)" opacity="0.8">
          <ellipse cx="18" cy="0" rx="8" ry="8" fill={lavender} />
          <path 
            d="M10,0 Q10,35 30,52 Q50,70 50,42" 
            fill="none" 
            stroke={lavender} 
            strokeWidth="16" 
            strokeLinecap="round"
          />
          <path 
            d="M26,0 Q26,28 42,42 Q58,56 58,38" 
            fill="none" 
            stroke={lavenderDark} 
            strokeWidth="8" 
            strokeLinecap="round"
            opacity="0.5"
          />
        </g>

        {/* Cell 1,3 - Cylinder */}
        <g transform="translate(460, 30) rotate(-10)" opacity="0.75">
          <ellipse cx="14" cy="4" rx="14" ry="4" fill={warmTan} />
          <rect x="0" y="4" width="28" height="24" fill={warmTan} />
          <rect x="14" y="4" width="14" height="24" fill={warmTanDark} />
          <ellipse cx="14" cy="28" rx="14" ry="4" fill={warmTanDark} />
        </g>

        {/* Cell 1,4 - Spring */}
        <g transform="translate(680, 50)" opacity="0.7">
          <ellipse cx="12" cy="0" rx="12" ry="4" fill={coralDark} />
          <rect x="0" y="0" width="24" height="7" fill={coral} />
          <ellipse cx="12" cy="7" rx="12" ry="4" fill={coral} />
          <rect x="0" y="7" width="24" height="7" fill={coralDark} />
          <ellipse cx="12" cy="14" rx="12" ry="4" fill={coralDark} />
          <rect x="0" y="14" width="24" height="7" fill={coral} />
          <ellipse cx="12" cy="21" rx="12" ry="4" fill={coral} />
        </g>

        {/* Cell 1,5 - Cone */}
        <g transform="translate(870, 35)" opacity="0.8">
          <polygon points="22,0 44,40 0,40" fill={softPeach} />
          <polygon points="22,0 44,40 22,40" fill={softPeachDark} />
        </g>

        {/* Row 1 - scattered spheres */}
        <circle cx="150" cy="80" r="12" fill={softPeach} opacity="0.6" />
        <circle cx="580" cy="45" r="10" fill={lavender} opacity="0.55" />
        <circle cx="780" cy="90" r="8" fill={warmTan} opacity="0.5" />

        {/* ============ ROW 2 (y: 200-400) ============ */}
        
        {/* Cell 2,1 - C-shape arc */}
        <g transform="translate(20, 220)" opacity="0.8">
          <path 
            d="M35,0 A35,35 0 1,0 35,70" 
            fill="none" 
            stroke={softPeach} 
            strokeWidth="18" 
            strokeLinecap="round"
          />
          <ellipse cx="35" cy="0" rx="9" ry="9" fill={softPeach} />
          <ellipse cx="35" cy="70" rx="9" ry="9" fill={softPeachDark} />
        </g>

        {/* Cell 2,2 - Donut */}
        <g transform="translate(260, 260)" opacity="0.75">
          <circle cx="22" cy="22" r="22" fill={coral} />
          <circle cx="22" cy="22" r="8" fill="#F2E8D9" />
        </g>

        {/* Cell 2,3 - Cube */}
        <g transform="translate(480, 240)" opacity="0.7">
          <polygon points="18,0 36,9 36,27 18,36 0,27 0,9" fill={lavender} />
          <polygon points="18,0 36,9 36,27 18,18" fill={lavenderDark} />
          <polygon points="18,18 36,27 18,36 0,27" fill={lavenderDark} opacity="0.8" />
        </g>

        {/* Cell 2,4 - Diamond */}
        <g transform="translate(680, 230)" opacity="0.75">
          <polygon points="18,0 36,26 18,52 0,26" fill={warmTan} />
          <polygon points="18,0 36,26 18,26" fill={warmTanDark} />
          <polygon points="18,26 36,26 18,52" fill={warmTanDark} opacity="0.8" />
        </g>

        {/* Cell 2,5 - C-shape arc */}
        <g transform="translate(860, 210) scale(0.7)" opacity="0.75">
          <path 
            d="M40,0 A40,40 0 1,1 40,80" 
            fill="none" 
            stroke={lavender} 
            strokeWidth="20" 
            strokeLinecap="round"
          />
          <ellipse cx="40" cy="0" rx="10" ry="10" fill={lavenderDark} />
          <ellipse cx="40" cy="80" rx="10" ry="10" fill={lavender} />
        </g>

        {/* Row 2 - scattered spheres */}
        <circle cx="180" cy="320" r="10" fill={lavender} opacity="0.5" />
        <circle cx="400" cy="280" r="8" fill={coral} opacity="0.5" />
        <circle cx="600" cy="340" r="9" fill={softPeach} opacity="0.55" />
        <circle cx="800" cy="300" r="11" fill={warmTan} opacity="0.5" />

        {/* ============ ROW 3 (y: 400-600) ============ */}
        
        {/* Cell 3,1 - Curved tube */}
        <g transform="translate(40, 420) rotate(30)" opacity="0.8">
          <ellipse cx="16" cy="0" rx="7" ry="7" fill={coral} />
          <path 
            d="M9,0 Q9,32 26,46 Q44,62 44,38" 
            fill="none" 
            stroke={coral} 
            strokeWidth="14" 
            strokeLinecap="round"
          />
          <path 
            d="M23,0 Q23,26 36,38 Q50,50 50,32" 
            fill="none" 
            stroke={coralDark} 
            strokeWidth="7" 
            strokeLinecap="round"
            opacity="0.5"
          />
        </g>

        {/* Cell 3,2 - Cylinder */}
        <g transform="translate(260, 450)" opacity="0.75">
          <ellipse cx="16" cy="5" rx="16" ry="5" fill={lavender} />
          <rect x="0" y="5" width="32" height="28" fill={lavender} />
          <rect x="16" y="5" width="16" height="28" fill={lavenderDark} />
          <ellipse cx="16" cy="33" rx="16" ry="5" fill={lavenderDark} />
        </g>

        {/* Cell 3,3 - Blob */}
        <ellipse cx="490" cy="470" rx="18" ry="24" fill={softPeach} opacity="0.6" />

        {/* Cell 3,4 - Spring */}
        <g transform="translate(680, 440)" opacity="0.7">
          <ellipse cx="10" cy="0" rx="10" ry="3" fill={lavenderDark} />
          <rect x="0" y="0" width="20" height="6" fill={lavender} />
          <ellipse cx="10" cy="6" rx="10" ry="3" fill={lavender} />
          <rect x="0" y="6" width="20" height="6" fill={lavenderDark} />
          <ellipse cx="10" cy="12" rx="10" ry="3" fill={lavenderDark} />
          <rect x="0" y="12" width="20" height="6" fill={lavender} />
          <ellipse cx="10" cy="18" rx="10" ry="3" fill={lavender} />
        </g>

        {/* Cell 3,5 - Donut */}
        <g transform="translate(880, 430)" opacity="0.7">
          <circle cx="20" cy="20" r="20" fill={warmTan} />
          <circle cx="20" cy="20" r="7" fill="#F2E8D9" />
        </g>

        {/* Row 3 - scattered spheres */}
        <circle cx="160" cy="520" r="9" fill={warmTan} opacity="0.55" />
        <circle cx="380" cy="490" r="10" fill={lavender} opacity="0.5" />
        <circle cx="580" cy="540" r="8" fill={coral} opacity="0.5" />
        <circle cx="780" cy="480" r="10" fill={softPeach} opacity="0.55" />
        <circle cx="950" cy="530" r="9" fill={lavender} opacity="0.5" />

        {/* ============ ROW 4 (y: 600-800) ============ */}
        
        {/* Cell 4,1 - Diamond */}
        <g transform="translate(30, 620)" opacity="0.75">
          <polygon points="16,0 32,22 16,44 0,22" fill={lavender} />
          <polygon points="16,0 32,22 16,22" fill={lavenderDark} />
          <polygon points="16,22 32,22 16,44" fill={lavenderDark} opacity="0.8" />
        </g>

        {/* Cell 4,2 - Cone */}
        <g transform="translate(260, 680)" opacity="0.75">
          <polygon points="20,0 40,36 0,36" fill={warmTan} />
          <polygon points="20,0 40,36 20,36" fill={warmTanDark} />
        </g>

        {/* Cell 4,3 - C-shape arc */}
        <g transform="translate(420, 620) rotate(-20)" opacity="0.75">
          <path 
            d="M30,0 A30,30 0 1,0 30,60" 
            fill="none" 
            stroke={coral} 
            strokeWidth="16" 
            strokeLinecap="round"
          />
          <ellipse cx="30" cy="0" rx="8" ry="8" fill={coral} />
          <ellipse cx="30" cy="60" rx="8" ry="8" fill={coralDark} />
        </g>

        {/* Cell 4,4 - Cube */}
        <g transform="translate(680, 650)" opacity="0.7">
          <polygon points="16,0 32,8 32,24 16,32 0,24 0,8" fill={softPeach} />
          <polygon points="16,0 32,8 32,24 16,16" fill={softPeachDark} />
          <polygon points="16,16 32,24 16,32 0,24" fill={softPeachDark} opacity="0.8" />
        </g>

        {/* Cell 4,5 - Curved tube */}
        <g transform="translate(880, 600) rotate(160)" opacity="0.75">
          <ellipse cx="14" cy="0" rx="6" ry="6" fill={lavender} />
          <path 
            d="M8,0 Q8,28 22,40 Q38,54 38,32" 
            fill="none" 
            stroke={lavender} 
            strokeWidth="12" 
            strokeLinecap="round"
          />
          <path 
            d="M20,0 Q20,22 32,32 Q44,42 44,26" 
            fill="none" 
            stroke={lavenderDark} 
            strokeWidth="6" 
            strokeLinecap="round"
            opacity="0.5"
          />
        </g>

        {/* Row 4 - scattered spheres */}
        <circle cx="130" cy="720" r="11" fill={coral} opacity="0.55" />
        <circle cx="360" cy="750" r="8" fill={lavender} opacity="0.5" />
        <circle cx="560" cy="700" r="10" fill={warmTan} opacity="0.55" />
        <circle cx="780" cy="740" r="9" fill={softPeach} opacity="0.5" />
        <circle cx="950" cy="700" r="10" fill={coral} opacity="0.5" />

        {/* Extra small dots scattered in gaps */}
        <circle cx="100" cy="150" r="5" fill={lavenderDark} opacity="0.4" />
        <circle cx="340" cy="180" r="4" fill={coral} opacity="0.4" />
        <circle cx="540" cy="140" r="5" fill={warmTan} opacity="0.4" />
        <circle cx="740" cy="160" r="4" fill={softPeach} opacity="0.4" />
        <circle cx="940" cy="140" r="5" fill={lavender} opacity="0.4" />
        
        <circle cx="120" cy="380" r="4" fill={softPeach} opacity="0.4" />
        <circle cx="340" cy="360" r="5" fill={lavender} opacity="0.4" />
        <circle cx="560" cy="380" r="4" fill={coral} opacity="0.4" />
        <circle cx="760" cy="360" r="5" fill={warmTan} opacity="0.4" />
        
        <circle cx="200" cy="580" r="5" fill={coral} opacity="0.4" />
        <circle cx="400" cy="560" r="4" fill={lavender} opacity="0.4" />
        <circle cx="620" cy="580" r="5" fill={softPeach} opacity="0.4" />
        <circle cx="820" cy="560" r="4" fill={warmTan} opacity="0.4" />
      </svg>
    </div>
  );
}
