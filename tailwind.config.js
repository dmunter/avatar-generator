/** 
 * @type {import('tailwindcss').Config} */

module.exports = {
  mode: 'jit',
  content: [
  // Or if using `src` directory:
  "./src/pages/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}"
],
  theme: {  

    extend: { 
      backgroundImage: {
        'halie-1': "url('/background-1.jpg')",
      },
      maxWidth: {
        '1/2' : '150px'
      },
      fontFamily: {
        'sans': ['ui-sans-serif', 'system-ui'],
        'serif': ['ui-serif', 'Georgia'],
        'mono': ['ui-monospace', 'SFMono-Regular'],
      },
      colors: {
        'primary-black': '#111',
      },
    },

    

  plugins: [],
}
}