module.exports = {
  content: ["./src/**/*.tsx", "./public/index.html"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        lg: "2.5rem",
      },
    },
    colors: {
      white: "#FFFFFF",
      black: "#000000",
      bg: {
        light: "#1A1A1A",
        dark: "#1E1E1E",
        DEFAULT: "#141414",
        100: "#1A1A1A",
      },
      gray: {
        light: "#838383",
        DEFAULT: "#252525",
      },
      green: {
        light: "#01FFC8",
        DEFAULT: "#D6FF7E",
      },
      red: "#E64040",
    },
    extend: {
      backgroundImage: {
        "landing-slider-bg": "url('/src/assets/landing/landing-slider-bg.svg')",
      },
      screens: {
        "3xl": "1920px",
      },
    },
    fontSize: {
      head1: [
        "52px",
        {
          lineHeight: "72px",
          fontWeight: "700",
        },
      ],
      head2: [
        "44px",
        {
          lineHeight: "60px",
          fontWeight: "700",
        },
      ],
      head3: [
        "32px",
        {
          lineHeight: "44px",
          fontWeight: "700",
        },
      ],
      head4: [
        "24px",
        {
          lineHeight: "34px",
          fontWeight: "700",
        },
      ],
      head5: [
        "20px",
        {
          lineHeight: "28px",
          fontWeight: "700",
        },
      ],
      head6: [
        "16px",
        {
          lineHeight: "22px",
          fontWeight: "700",
        },
      ],
      bodyLg: [
        "18px",
        {
          lineHeight: "24px",
          fontWeight: "400",
        },
      ],
      bodyMd: [
        "15px",
        {
          lineHeight: "21px",
          fontWeight: "400",
        },
      ],
      bodySm: [
        "12px",
        {
          lineHeight: "16px",
          fontWeight: "400",
        },
      ],
      headlineMd: [
        "14px",
        {
          lineHeight: "16px",
          fontWeight: "700",
          letterSpacing: "0.2rem",
        },
      ],
      headlineSm: [
        "12px",
        {
          lineHeight: "14px",
          fontWeight: "700",
          letterSpacing: "0.2rem",
        },
      ],
      button: [
        "18px",
        {
          lineHeight: "22px",
          fontWeight: "700",
          letterSpacing: "8%",
        },
      ],
    },
    fontFamily: {
      spaceGrotesk: ["Space Grotesk", "sans-serif"],
      bigShoulderDisplay: ["Big Shoulders Display", "cursive"],
    },
  },
  plugins: [],
  safelist: [
    {
      pattern: /grid-cols-./,
    },
    {
      pattern: /col-span-./,
    },
  ],
};
