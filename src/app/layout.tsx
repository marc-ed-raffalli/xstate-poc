import { PropsWithChildren } from 'react';

export const metadata = {
  title: 'XState examples',
  description: 'Simple example showcasing potential xstate patterns',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
