import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Weather Forecast",
  description: "Stay updated with the latest weather forecasts",
  keywords: [
    "weather",
    "forecast",
    "climate",
    "temperature",
    "uv index",
    "pressure",
    "wind",
    "humidity",
    "precipitation",
  ],
  icons: {
    icon: "https://cdn.weatherapi.com/weather/64x64/day/176.png",
  },
  openGraph: {
    title: "Weather App",
    description: "Live weather forecast for your location",
    siteName: "Weather Forecast",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
