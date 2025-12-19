import { NextRequest, NextResponse } from 'next/server';
import type { Contact, UpdateContactInput } from '@/types/commercial';

// TODO: Replace with Prisma when database is set up
// import { prisma } from '@/lib/db';

// Mock data storage (in-memory, will be replaced with database)
let contacts: Contact[] = [];

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // TODO: Replace with Prisma
    // const contact = await prisma.contact.findUnique({
    //   where: { id },
    //   include: {
    //     company: true,
    //     opportunities: true,
    //   },
    // });

    const contact = contacts.find((c) => c.id === id);

    if (!contact) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
    }

    return NextResponse.json(contact);
  } catch (error) {
    console.error('Error fetching contact:', error);
    return NextResponse.json({ error: 'Failed to fetch contact' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body: Partial<UpdateContactInput> = await request.json();

    // TODO: Replace with Prisma
    // const contact = await prisma.contact.update({
    //   where: { id },
    //   data: {
    //     ...(body.firstName && { firstName: body.firstName }),
    //     ...(body.lastName && { lastName: body.lastName }),
    //     ...(body.email && { email: body.email }),
    //     ...(body.phone !== undefined && { phone: body.phone }),
    //     ...(body.companyId && { companyId: body.companyId }),
    //   },
    //   include: {
    //     company: true,
    //   },
    // });

    const contactIndex = contacts.findIndex((c) => c.id === id);

    if (contactIndex === -1) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
    }

    // Check email uniqueness if email is being updated
    if (body.email && body.email !== contacts[contactIndex].email) {
      const existingContact = contacts.find((c) => c.email === body.email && c.id !== id);
      if (existingContact) {
        return NextResponse.json({ error: 'Contact with this email already exists' }, { status: 400 });
      }
    }

    const updatedContact: Contact = {
      ...contacts[contactIndex],
      ...body,
      updatedAt: new Date(),
    } as Contact;

    contacts[contactIndex] = updatedContact;

    return NextResponse.json(updatedContact);
  } catch (error) {
    console.error('Error updating contact:', error);
    return NextResponse.json({ error: 'Failed to update contact' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // TODO: Replace with Prisma
    // await prisma.contact.delete({
    //   where: { id },
    // });

    const contactIndex = contacts.findIndex((c) => c.id === id);

    if (contactIndex === -1) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
    }

    contacts.splice(contactIndex, 1);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting contact:', error);
    return NextResponse.json({ error: 'Failed to delete contact' }, { status: 500 });
  }
}

