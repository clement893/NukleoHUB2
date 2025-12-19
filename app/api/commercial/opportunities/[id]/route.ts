import { NextRequest, NextResponse } from 'next/server';
import type { Opportunity, UpdateOpportunityInput } from '@/types/commercial';

// TODO: Replace with Prisma when database is set up
// import { prisma } from '@/lib/db';

// Mock data storage (in-memory, will be replaced with database)
// This should be shared with the main route file, but for now it's separate
let opportunities: Opportunity[] = [];

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // TODO: Replace with Prisma
    // const opportunity = await prisma.opportunity.findUnique({
    //   where: { id },
    //   include: {
    //     owner: true,
    //     contact: true,
    //     company: true,
    //   },
    // });

    const opportunity = opportunities.find((opp) => opp.id === id);

    if (!opportunity) {
      return NextResponse.json({ error: 'Opportunity not found' }, { status: 404 });
    }

    return NextResponse.json(opportunity);
  } catch (error) {
    console.error('Error fetching opportunity:', error);
    return NextResponse.json({ error: 'Failed to fetch opportunity' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body: Partial<UpdateOpportunityInput> = await request.json();

    // TODO: Replace with Prisma
    // const opportunity = await prisma.opportunity.update({
    //   where: { id },
    //   data: {
    //     ...(body.name && { name: body.name }),
    //     ...(body.stage && { stage: body.stage }),
    //     ...(body.amount !== undefined && { amount: body.amount }),
    //     ...(body.closingDate && { closingDate: new Date(body.closingDate) }),
    //     ...(body.ownerId && { ownerId: body.ownerId }),
    //     ...(body.contactId && { contactId: body.contactId }),
    //     ...(body.companyId && { companyId: body.companyId }),
    //   },
    //   include: {
    //     owner: true,
    //     contact: true,
    //     company: true,
    //   },
    // });

    const opportunityIndex = opportunities.findIndex((opp) => opp.id === id);

    if (opportunityIndex === -1) {
      return NextResponse.json({ error: 'Opportunity not found' }, { status: 404 });
    }

    const updatedOpportunity: Opportunity = {
      ...opportunities[opportunityIndex],
      ...body,
      updatedAt: new Date(),
    } as Opportunity;

    opportunities[opportunityIndex] = updatedOpportunity;

    return NextResponse.json(updatedOpportunity);
  } catch (error) {
    console.error('Error updating opportunity:', error);
    return NextResponse.json({ error: 'Failed to update opportunity' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // TODO: Replace with Prisma
    // await prisma.opportunity.delete({
    //   where: { id },
    // });

    const opportunityIndex = opportunities.findIndex((opp) => opp.id === id);

    if (opportunityIndex === -1) {
      return NextResponse.json({ error: 'Opportunity not found' }, { status: 404 });
    }

    opportunities.splice(opportunityIndex, 1);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting opportunity:', error);
    return NextResponse.json({ error: 'Failed to delete opportunity' }, { status: 500 });
  }
}

