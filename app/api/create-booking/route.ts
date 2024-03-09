import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server';

import { sql } from '@vercel/postgres'

export async function POST(
  req: Request,
  res: Response
) {
  const { name, email, phone, date, time } = await req.json();

  try {
    await sql`INSERT INTO Bookings (Name, Email, Phone, Date, Time) VALUES (${name}, ${email}, ${phone}, ${date}, ${time});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const pets = await sql`SELECT * FROM Bookings;`;
  return NextResponse.json({ pets }, { status: 200 });

  return NextResponse.json({
    message: `${date}`
  }, {
    status: 200
  })
}