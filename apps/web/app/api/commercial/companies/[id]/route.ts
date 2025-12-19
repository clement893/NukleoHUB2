import { NextRequest, NextResponse } from 'next/server';
import type { Company, UpdateCompanyInput } from '@/types/commercial';

// TODO: Replace with Prisma when database is set up
// import { prisma } from '@/lib/db';

// Mock data storage (in-memory, will be replaced with database)
let companies: Company[] = [];

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // TODO: Replace with Prisma
    // const company = await prisma.company.findUnique({
    //   where: { id },
    //   include: {
    //     contacts: true,
    //     opportunities: true,
    //   },
    // });

    const company = companies.find((c) => c.id === id);

    if (!company) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 });
    }

    return NextResponse.json(company);
  } catch (error) {
    console.error('Error fetching company:', error);
    return NextResponse.json({ error: 'Failed to fetch company' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body: Partial<UpdateCompanyInput> = await request.json();

    // TODO: Replace with Prisma
    // const company = await prisma.company.update({
    //   where: { id },
    //   data: {
    //     ...(body.name && { name: body.name }),
    //     ...(body.address !== undefined && { address: body.address }),
    //     ...(body.website !== undefined && { website: body.website }),
    //   },
    // });

    const companyIndex = companies.findIndex((c) => c.id === id);

    if (companyIndex === -1) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 });
    }

    const updatedCompany: Company = {
      ...companies[companyIndex],
      ...body,
      updatedAt: new Date(),
    } as Company;

    companies[companyIndex] = updatedCompany;

    return NextResponse.json(updatedCompany);
  } catch (error) {
    console.error('Error updating company:', error);
    return NextResponse.json({ error: 'Failed to update company' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // TODO: Replace with Prisma
    // await prisma.company.delete({
    //   where: { id },
    // });

    const companyIndex = companies.findIndex((c) => c.id === id);

    if (companyIndex === -1) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 });
    }

    companies.splice(companyIndex, 1);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting company:', error);
    return NextResponse.json({ error: 'Failed to delete company' }, { status: 500 });
  }
}

