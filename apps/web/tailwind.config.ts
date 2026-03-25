import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0f172a",
        mist: "#f3f6fb",
        line: "#d9e3f0",
        accent: "#155eef",
        accentSoft: "#dbeafe",
        success: "#0f766e",
        warm: "#7c2d12"
      },
      boxShadow: {
        soft: "0 16px 40px rgba(15, 23, 42, 0.08)"
      },
      fontFamily: {
        sans: [
          "\"Noto Sans SC\"",
          "\"PingFang SC\"",
          "\"Microsoft YaHei\"",
          "sans-serif"
        ]
      }
    }
  },
  plugins: []
};

export default config;
