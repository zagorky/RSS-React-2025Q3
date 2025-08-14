import { generateCSV } from '~lib/csv-helpers';

export async function POST(request: Request) {
  try {
    const data: unknown = await request.json();
    if (!Array.isArray(data) || data.length === 0) {
      return new Response('No data provided', { status: 400 });
    }

    const csvData = generateCSV(data);
    const csvBuffer = Buffer.from(csvData, 'utf8');

    return new Response(csvBuffer, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${data.length}-items.csv"`,
      },
    });
  } catch {
    return new Response('Error generating CSV', { status: 500 });
  }
}