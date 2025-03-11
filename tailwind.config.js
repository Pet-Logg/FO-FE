/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        gongbuFont: ["gongbuFont", "sans-serif"],
        gamhong: ['Mungyeong-Gamhong-Apple', 'sans-serif'], // 커스텀 폰트 추가
      }
    },
  },
  plugins: [],
}

