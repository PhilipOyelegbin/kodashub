import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get('domain');

  if (!domain) {
    return NextResponse.json({ error: 'Domain parameter is required' }, { status: 400 });
  }

  // Pure mock simulation latency
  await new Promise(resolve => setTimeout(resolve, 800));

  // Predictable availability based on string length (shorter strings = more likely taken)
  // For demonstration, '.com' domains < 8 chars might be taken, else available.
  const namePart = domain.split('.')[0] || '';
  const isAvailable = namePart.length > 7 || namePart.includes('-');
  
  const price = isAvailable ? Math.floor(Math.random() * 20) + 9.99 : null;

  return NextResponse.json({
    domain,
    available: isAvailable,
    price: isAvailable ? Number(price?.toFixed(2)) : null,
    message: isAvailable 
      ? `Good news! ${domain} is available.`
      : `Sorry, ${domain} is already taken.`
  });
}
