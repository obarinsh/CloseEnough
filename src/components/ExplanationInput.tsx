import { useState, useRef, useEffect } from 'react';

interface ExplanationInputProps {
  onSubmit: (explanation: string) => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export function ExplanationInput({ onSubmit, isLoading = false, disabled = false }: ExplanationInputProps) {
  const [explanation, setExplanation] = useState('');
  const [isHoveredSubmit, setIsHoveredSubmit] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const brandColor = '#b677ce';
  const textPrimary = '#2D2D2F';
  const textTertiary = '#AEAEB2';
  const disabledBg = 'rgba(0,0,0,0.04)';

  useEffect(() => {
    if (textareaRef.current && !disabled) {
      textareaRef.current.focus();
    }
  }, [disabled]);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  }, [explanation]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (explanation.trim() && !isLoading && !disabled) {
      onSubmit(explanation.trim());
      setExplanation('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const canSubmit = explanation.trim() && !isLoading && !disabled;

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <textarea
        ref={textareaRef}
        value={explanation}
        onChange={(e) => setExplanation(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Type what you think it means..."
        disabled={isLoading || disabled}
        rows={4}
        className="w-full rounded-2xl px-4 py-3.5 text-[15px] resize-none transition-all duration-150"
        style={{
          background: isFocused ? '#fff' : '#F8F4EF',
          border: isFocused ? `2px solid ${brandColor}` : '2px solid transparent',
          color: textPrimary,
          opacity: disabled ? 0.5 : 1,
          cursor: disabled ? 'not-allowed' : 'text',
          minHeight: '120px',
          outline: 'none',
        }}
      />

      <button
        type="submit"
        disabled={!canSubmit}
        onMouseEnter={() => setIsHoveredSubmit(true)}
        onMouseLeave={() => setIsHoveredSubmit(false)}
        className="w-full mt-4 py-4 rounded-2xl font-semibold text-[15px] transition-all duration-200"
        style={{
          background: canSubmit ? brandColor : disabledBg,
          color: canSubmit ? '#fff' : textTertiary,
          border: 'none',
          fontFamily: "'Fredoka', 'Nunito', 'DM Sans', sans-serif",
          opacity: canSubmit && isHoveredSubmit ? 0.92 : 1,
          transform: canSubmit && isHoveredSubmit ? 'translateY(-1px)' : 'none',
          boxShadow: canSubmit 
            ? (isHoveredSubmit ? '0 8px 24px rgba(182,119,206,0.35)' : '0 4px 16px rgba(182,119,206,0.25)')
            : 'none',
          cursor: canSubmit ? 'pointer' : 'not-allowed',
        }}
        aria-label="Submit explanation"
      >
        {isLoading ? 'Checking...' : 'Submit'}
      </button>

      <p 
        className="text-xs mt-3 text-center"
        style={{ color: textTertiary }}
      >
        Press Enter to submit
      </p>
    </form>
  );
}
