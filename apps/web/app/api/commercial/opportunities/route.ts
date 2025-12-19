import { NextRequest, NextResponse } from 'next/server';
import type { Opportunity, CreateOpportunityInput } from '@nukleohub/types';

// TODO: Replace with Prisma when database is set up
// import { prisma } from '@nukleohub/db';

// Mock data storage (in-memory, will be replaced with database)
let opportunities: Opportunity[] = [];

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const stage = searchParams.get('stage');
    const ownerId = searchParams.get('ownerId');
    const contactId = searchParams.get('contactId');
    const companyId = searchParams.get('companyId');

    // TODO: Replace with Prisma query
    // const opportunities = await prisma.opportunity.findMany({
    //   where: {
    //     ...(stage && { stage }),
    //     ...(ownerId && { ownerId }),
    //     ...(contactId && { contactId }),
    //     ...(companyId && { companyId }),
    //   },
    //   include: {
    //     owner: true,
    //     contact: true,
    //     company: true,
    //   },
    //   orderBy: { createdAt: 'desc' },
    // });

    let filteredOpportunities = [...opportunities];

    if (stage) {
      filteredOpportunities = filteredOpportunities.filter((opp) => opp.stage === stage);
    }
    if (ownerId) {
      filteredOpportunities = filteredOpportunities.filter((opp) => opp.ownerId === ownerId);
    }
    if (contactId) {
      filteredOpportunities = filteredOpportunities.filter((opp) => opp.contactId === contactId);
    }
    if (companyId) {
      filteredOpportunities = filteredOpportunities.filter((opp) => opp.companyId === companyId);
    }

    return NextResponse.json(filteredOpportunities);
  } catch (error) {
    console.error('Error fetching opportunities:', error);
    return NextResponse.json({ error: 'Failed to fetch opportunities' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateOpportunityInput = await request.json();

    // Validation
    if (!body.name || !body.stage || !body.amount || !body.closingDate || !body.ownerId || !body.contactId || !body.companyId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // TODO: Replace with Prisma
    // const opportunity = await prisma.opportunity.create({
    //   data: {
    //     name: body.name,
    //     stage: body.stage,
    //     amount: body.amount,
    //     closingDate: new Date(body.closingDate),
    //     ownerId: body.ownerId,
    //     contactId: body.contactId,
    //     companyId: body.companyId,
    //   },
    //   include: {
    //     owner: true,
    //     contact: true,
    //     company: true,
    //   },
    // });

    const newOpportunity: Opportunity = {
      id: `opp_${Date.now()}`,
      name: body.name,
      stage: body.stage,
      amount: body.amount,
      closingDate: new Date(body.closingDate),
      ownerId: body.ownerId,
      contactId: body.contactId,
      companyId: body.companyId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    opportunities.push(newOpportunity);

    return NextResponse.json(newOpportunity, { status: 201 });
  } catch (error) {
    console.error('Error creating opportunity:', error);
    return NextResponse.json({ error: 'Failed to create opportunity' }, { status: 500 });
  }
}

