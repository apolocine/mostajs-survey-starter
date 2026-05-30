import './globals.css';

export const metadata = {
  title: 'Enquête satisfaction — Boulangerie du Marché',
  description:
    'Questionnaire de satisfaction client (Next.js + @mostajs/orm). Rename & go. Boots in the browser via WASM.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
