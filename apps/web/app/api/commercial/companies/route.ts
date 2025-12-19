import { NextRequest, NextResponse } from 'next/server';
import type { Company, CreateCompanyInput } from '@nukleohub/types';

// TODO: Replace with Prisma when database is set up
// import { prisma } from '@nukleohub/db';

// Mock data storage (in-memory, will be replaced with database)
let companies: Company[] = [];

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const name = searchParams.get('name');

    // TODO: Replace with Prisma query
    // const companies = await prisma.company.findMany({
    //   where: {
    //     ...(name && { name: { contains: name, mode: 'insensitive' } }),
    //   },
    //   include: {
    //     _count: {
    //       select: {
    //         contacts: true,
    //         opportunities: true,
    //       },
    //     },
    //   },
    //   orderBy: { createdAt: 'desc' },
    // });

    let filteredCompanies = [...companies];

    if (name) {
      filteredCompanies = filteredCompanies.filter((company) =>
        company.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    return NextResponse.json(filteredCompanies);
  } catch (error) {
    console.error('Error fetching companies:', error);
    return NextResponse.json({ error: 'Failed to fetch companies' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateCompanyInput = await request.json();

    // Validation
    if (!body.name) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // TODO: Replace with Prisma
    // const company = await prisma.company.create({
    //   data: {
    //     name: body.name,
    //     address: body.address,
    //     website: body.website,
    //   },
    // });

    const newCompany: Company = {
      id: `company_${Date.now()}`,
      name: body.name,
      address: body.address || null,
      website: body.website || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    companies.push(newCompany);

    return NextResponse.json(newCompany, { status: 201 });
  } catch (error) {
    console.error('Error creating company:', error);
    return NextResponse.json({ error: 'Failed to create company' }, { status: 500 });
  }
}

