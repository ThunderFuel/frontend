module.exports = {
  content: ["./src/**/*.tsx", "./public/index.html"],
  theme: {
    container: {
      center: true,
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
        dark: "#494650",
        DEFAULT: "#252525",
        100: "#2E2E2E",
      },
      green: {
        light: "#01FFC8",
        DEFAULT: "#D6FF7E",
      },
      red: "#E64040",
      orange: "#E69040",
    },
    extend: {
      backgroundImage: {
        "landing-slider-bg": "url('/src/assets/landing/landing-slider-bg.svg')",
      },
      screens: {
        xs: "475px",
        "3xl": "1920px",
      },
    },
    fontSize: {
      head1: [
        "52px",
        {
          lineHeight: "72px",
          fontWeight: "600",
        },
      ],
      head2: [
        "44px",
        {
          lineHeight: "60px",
          fontWeight: "600",
        },
      ],
      head3: [
        "32px",
        {
          lineHeight: "44px",
          fontWeight: "600",
        },
      ],
      head4: [
        "24px",
        {
          lineHeight: "34px",
          fontWeight: "600",
        },
      ],
      head5: [
        "20px",
        {
          lineHeight: "28px",
          fontWeight: "600",
        },
      ],
      head6: [
        "16px",
        {
          lineHeight: "22px",
          fontWeight: "600",
        },
      ],
      bodyLg: [
        "18px",
        {
          lineHeight: "24px",
          fontWeight: "300",
        },
      ],
      bodyMd: [
        "16px",
        {
          lineHeight: "21px",
          fontWeight: "300",
        },
      ],
      bodySm: [
        "13px",
        {
          lineHeight: "18px",
          fontWeight: "400",
        },
      ],
      headlineMd: [
        "14px",
        {
          lineHeight: "16px",
          fontWeight: "600",
          letterSpacing: "0.2rem",
        },
      ],
      headlineSm: [
        "12px",
        {
          lineHeight: "14px",
          fontWeight: "600",
          letterSpacing: "0.2rem",
        },
      ],
      button: [
        "18px",
        {
          lineHeight: "22px",
          fontWeight: "600",
          letterSpacing: "0.08em",
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
