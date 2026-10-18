import { ImageResponse } from 'next/og';

export const alt = 'Addis Eats: Ethiopian food delivered in Addis Ababa';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 90, background: '#1F5E3B', color: '#fff' }}>
        <div style={{ fontSize: 120, fontWeight: 700 }}>Addis Eats</div>
        <div style={{ fontSize: 48, marginTop: 24, color: '#F3D27A' }}>Hot injera, delivered across Addis Ababa.</div>
      </div>
    ),
    size
  );
}
