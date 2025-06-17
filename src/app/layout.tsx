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

const metadata = {
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
    icon: "https://icon-library.com/images/weather-icon-android/weather-icon-android-7.jpg",
  },
  openGraph: {
    title: "Weather App",
    description: "Live weather forecast for your location",
    siteName: "Weather Forecast",
    locale: "en_US",
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
