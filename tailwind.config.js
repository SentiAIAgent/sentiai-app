const animate = require("tailwindcss-animate");
const tailwindMdBase = require("@geoffcodesthings/tailwind-md-base");

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    safelist: ["dark"],
    content: ["./pages/**/*.{ts,tsx,vue}", "./components/**/*.{ts,tsx,vue}", "./app/**/*.{ts,tsx,vue}", "./src/**/*.{ts,tsx,vue}"],
    prefix: "",
    theme: {
        markdownBase: {
            wrapperClass: "markdown",
            code: {
                background: "#f1f1f1",
                borderRadius: "4px",
                padding: "3px 6px ",
            },
            h1: {
                fontSize: "24px",
            },
            h2: {
                fontSize: "20px",
            },
            h3: {
                fontSize: "18px",
            },
            p: {
                lineHeight: "28px",
                "&:last-child": {
                    marginBottom: "0px",
                },
                "&:has(+ p[data-message-time])": {
                    marginBottom: "0px",
                    display: "inline",
                },
                "&[data-message-time]": {
                    textAlign: "right",
                    color: "#888",
                    display: "inline-block",
                    float: "right",
                    position: "relative",
                    bottom: "-6px",
                    right: "-3px",
                    fontSize: "14px",
                },
            },

            li: {
                marginLeft: "12px",
                "p:first-child": {
                    display: "inline",
                },
                "&:not(:last-child)": {
                    marginBottom: "8px",
                },
            },
            img: {
                "max-width": "200px",
            },
        },
        container: {
            center: true,
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                app: {
                    background: "#141414",
                    bg0: "#fff",
                    bg1: "#f5f5f5",
                    bg2: "#f2f2f2",
                    green: "#24c33d",
                    green2: "#73D13D",
                    black70: "rgba(23, 24, 24, 0.70)",
                    dark1: "#141414",
                    dark2: "#282828",
                    dark3: "#3C3C3C",
                    basic10: "#4c4c4c",
                    basic11: "#252525",
                    card0: "#fff",
                    card1: "#f1f1f1",
                    card12: "#f5f5f5",
                    card2: "#e3e3e3",
                    card3: "#656565",
                    card4: "#404040",
                    btnBg: "#1a1a1a",
                    btnDisableBg: "#656565",
                    cardWarning: "#593535",
                    line1: "#dcdcdc",
                    line2: "rgba(0, 0, 0, 0.15)",
                    line3: "#3d3d3d",
                    text2: "rgba(255, 255, 255, 0.80)",
                    visualGrape: "#8D5AF2",
                    red: "#FF4D4F",
                    red2: "#FF5757",
                    tLight: "#fff",
                    tDark: "#000",
                    text0: "#131313",
                    text1: "#4c4c4c",
                    text2: "#7e7e7e",
                    text3: "#4c4c4c",
                    text4: "#979797",
                    content: "#323232",
                    rt0: "#fff",
                    ye1: "#FCD535",
                    ye2: "#F0B90B",
                },
                system: {
                    red: "#E84142",
                    green: "#2BAA5F",
                    teal: "#80A405",
                    blue: "#005AE1",
                    purple: "#5F48F2",
                    orange: "#EE5910",
                    orange2: "#E9850D",
                },
                home: {
                    neutral: {
                        400: "#979797",
                    },
                },
            },
            borderRadius: {
                xl: "calc(var(--radius) + 4px)",
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: 0 },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: 0 },
                },
                "collapsible-down": {
                    from: { height: 0 },
                    to: { height: "var(--radix-collapsible-content-height)" },
                },
                "collapsible-up": {
                    from: { height: "var(--radix-collapsible-content-height)" },
                    to: { height: 0 },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "collapsible-down": "collapsible-down 0.2s ease-in-out",
                "collapsible-up": "collapsible-up 0.2s ease-in-out",
            },
        },
    },
    plugins: [animate, tailwindMdBase()],
};
