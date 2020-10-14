module.exports = {
  prefix: 'tw-',
  purge: [
    '../../src/**/*.html',
    '../../src/**/*.vue',
    '../../src/**/*.jsx',
    '../../src/**/*.js',
  ],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
  future: {
    removeDeprecatedGapUtilities: true,
  },
};
