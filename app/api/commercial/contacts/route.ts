import { NextRequest, NextResponse } from 'next/server';
import type { Contact, CreateContactInput } from '@/types/commercial';

// TODO: Replace with Prisma when database is set up
// import { prisma } from '@/lib/db';

// Mock data storage (in-memory, will be replaced with database)
let contacts: Contact[] = [];

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const companyId = searchParams.get('companyId');
    const email = searchParams.get('email');

    // TODO: Replace with Prisma query
    // const contacts = await prisma.contact.findMany({
    //   where: {
    //     ...(companyId && { companyId }),
    //     ...(email && { email }),
    //   },
    //   include: {
    //     company: true,
    //   },
    //   orderBy: { createdAt: 'desc' },
    // });

    let filteredContacts = [...contacts];

    if (companyId) {
      filteredContacts = filteredContacts.filter((contact) => contact.companyId === companyId);
    }
    if (email) {
      filteredContacts = filteredContacts.filter((contact) => contact.email === email);
    }

    return NextResponse.json(filteredContacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateContactInput = await request.json();

    // Validation
    if (!body.firstName || !body.lastName || !body.email || !body.companyId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if email already exists
    const existingContact = contacts.find((c) => c.email === body.email);
    if (existingContact) {
      return NextResponse.json({ error: 'Contact with this email already exists' }, { status: 400 });
    }

    // TODO: Replace with Prisma
    // const contact = await prisma.contact.create({
    //   data: {
    //     firstName: body.firstName,
    //     lastName: body.lastName,
    //     email: body.email,
    //     phone: body.phone,
    //     companyId: body.companyId,
    //   },
    //   include: {
    //     company: true,
    //   },
    // });

    const newContact: Contact = {
      id: `contact_${Date.now()}`,
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone || null,
      companyId: body.companyId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    contacts.push(newContact);

    return NextResponse.json(newContact, { status: 201 });
  } catch (error) {
    console.error('Error creating contact:', error);
    return NextResponse.json({ error: 'Failed to create contact' }, { status: 500 });
  }
}

