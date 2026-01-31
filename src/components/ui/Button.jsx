import React from 'react';

/**
 * Reusable Button Component
 * 
 * Variants:
 * - primary: Cosmic gradient with glow (default)
 * - secondary: Glassmorphism style
 * - outline: Border only with glow on hover
 * - ghost: Text only, transparent background
 * 
 * Sizes:
 * - sm: Compact
 * - md: Standard
 * - lg: Large/Full width CTA
 */
const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  icon: Icon = null,
  fullWidth = false,
  className = ''
}) => {
  
  // Base styles
  const baseStyles = "relative inline-flex items-center justify-center font-medium transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 overflow-hidden";
  
  // Size variants
  const sizeStyles = {
    sm: "text-sm px-4 py-2 rounded-xl",
    md: "text-base px-6 py-3 rounded-2xl",
    lg: "text-lg px-8 py-4 rounded-3xl"
  };

  // Theme variants
  const variantStyles = {
    primary: "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/25 border border-white/10 hover:shadow-violet-500/40 hover:brightness-110",
    secondary: "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:border-white/30",
    outline: "bg-transparent border-2 border-violet-500/50 text-violet-200 hover:border-violet-400 hover:text-white hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]",
    ghost: "bg-transparent text-slate-300 hover:text-white hover:bg-white/5",
    danger: "bg-red-500/20 text-red-200 border border-red-500/50 hover:bg-red-500/30"
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle} ${className}`}
    >
      {/* Loading Spinner */}
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center bg-inherit">
          <svg className="animate-spin h-5 w-5 text-current opacity-80" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </span>
      )}

      {/* Button Content */}
      <span className={`flex items-center gap-2 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {Icon && <Icon className="w-5 h-5" />}
        {children}
      </span>
      
      {/* Subtle Glow Effect for Primary */}
      {variant === 'primary' && (
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/20 pointer-events-none" />
      )}
    </button>
  );
};

export default Button;
