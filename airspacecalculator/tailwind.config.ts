import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}'],
  theme: {
    screens: {
      sm: '768px',
      md: '1024px',
      lg: '1440px',
      xl: '1728px',
    },
    colors: {
      transparent: 'transparent',
      inherit: 'inherit',
      current: 'currentColor',
      black: '#000000',
      white: '#FFFFFF',
      blue: '#1470FF',
      navy: '#0E2B56',
      sky: '#DEE9F8',
      icon: '#222222',
      grey: '#ECECEC',
      disabled: '#939393',
      danger: '#DC3545',
    },
    borderRadius: {
      none: '0',
      sm: '2px',
      DEFAULT: '4px',
      lg: '8px',
      xl: '12px',
      '2xl': '16px',
      full: '9999px',
    },
    fontFamily: {
      campton: ['var(--font-campton)'],
    },
    fontSize: {
      '6xl': ['80px', { lineHeight: '120px' }],
      '4xl': ['48px', { lineHeight: '72px' }],
      '3xl': ['40px', { lineHeight: '60px' }],
      '2xl': ['32px', { lineHeight: '48px' }],
      xl: ['24px', { lineHeight: '36px' }],
      lg: ['20px', { lineHeight: '30px' }],
      base: ['16px', { lineHeight: '24px' }],
      sm: ['14px', { lineHeight: '21px' }],
      xs: ['12px', { lineHeight: '18px' }],
    },
    extend: {
      boxShadow: {
        card: '0 10px 30px 0 rgba(0 0 0 / 10%)',
      },
    },
  },
  plugins: [],
};
export default config;
