module.exports = {
  content: ["./src/**/*.tsx", "./public/index.html"],
  theme: {
    colors: {
      white: '#FFFFFF',
      bg: {
        light: '#171717',
        default: '#141414'
      },
      gray: {
        light: '#838383',
        default: '#252525'
      },
      green: '#D6FF7E',
      red: '#E64040'
    },
    extend: {},
    fontSize: {
      head1: ["52px", {
        lineHeight: "72.8px",
        fontWeight: "700",
      }],
      head2: ["44px", {
        lineHeight: "61.6px",
        fontWeight: "700",
      }],
      head3: ["32px", {
        lineHeight: "44.8px",
        fontWeight: "700",
      }],
      head4: ["24px",{
        lineHeight: "33.6px",
        fontWeight: "700",
      }],
      head5: ["20px", {
        lineHeight: "28px",
        fontWeight: "700",
      }],
      head6: ["16px", {
        lineHeight: "22.4px",
        fontWeight: "700",
      }],
      bodyLg: ["18px", {
        lineHeight: "25.2px",
        fontWeight: "400",
      }],
      bodyMd: ["15px", {
        lineHeight: "21px",
        fontWeight: "400",
      }],
      bodySm: ["12px", {
        lineHeight: "16.8px",
        fontWeight: "400",
      }],
      headlineMd: ["14px", {
        lineHeight: "16.76px",
        fontWeight: "800",
        letterSpacing: "20%"
      }],
      headlineSm: ["12px", {
        lineHeight: "14.36px",
        fontWeight: "800",
        letterSpacing: "20%"
      }],
      button: ["18px", {
        lineHeight: "21.55px",
        fontWeight: "700",
        letterSpacing: "8%"
      }]
    },
    fontFamily: {
      spaceGrotesk: ['Space Grotesk', 'sans-serif'],
      bigShoulderDisplay: ['Big Shoulders Display', 'cursive'],
    }
  },
  plugins: [],
};
