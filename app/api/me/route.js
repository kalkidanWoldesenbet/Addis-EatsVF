import { getSession } from '@/lib/session';

export const dynamic = 'force-dynamic';

// Tells the header who is signed in, so the layout itself can stay static.
export async function GET() {
  const session = await getSession();
  return Response.json({ name: session?.name ?? null }, { headers: { 'Cache-Control': 'no-store' } });
}
