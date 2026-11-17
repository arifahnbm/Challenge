import './globals.css';
import { portfolioData } from '../data/portfolio';

export const metadata = {
  title: `${portfolioData.brand.name} | ${portfolioData.brand.sub}`,
  description: portfolioData.hero.bio,
  icons: {
    icon: portfolioData.brand.logo,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href={portfolioData.brand.logo} />
      </head>
      <body>{children}</body>
    </html>
  );
}
