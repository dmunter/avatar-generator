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
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: 0.99,
            filter:
              'drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))',
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
            opacity: 0.4,
            filter: 'none',
          },
        },
        shimmer: {
          '100%': {
            "transform": "translateX(100%)",
          },
        },
      },

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

 
  },
  plugins: [require("daisyui")],
  daisyui:{
    themes:[
      {
        mytheme:{       
          primary: "#3B82F6",
          secondary: "#A855F7", //purple
          accent: "#1FB2A5",
          neutral: "#191D24",
          base: "#2A303C",
          basetwo: "",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",   
          borders: "#30363d",
          textwhite: "#f1f1f1"
        }
      }
    ]
  }
  

}