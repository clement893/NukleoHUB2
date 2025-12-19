'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Table, Pagination } from '@nukleohub/ui';
import type { Contact } from '@nukleohub/types';

export default function ContactsPage() {
  const router = useRouter();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/commercial/contacts');
      if (response.ok) {
        const data = await response.json();
        setContacts(data);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedContacts = filteredContacts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const columns = [
    {
      key: 'name',
      header: 'Nom',
      render: (_: any, row: Contact) => (
        <button
          onClick={() => router.push(`/commercial/contacts/${row.id}`)}
          className="text-primary hover:underline font-medium"
        >
          {row.firstName} {row.lastName}
        </button>
      ),
    },
    {
      key: 'email',
      header: 'Email',
      accessor: 'email' as const,
    },
    {
      key: 'phone',
      header: 'Téléphone',
      accessor: 'phone' as const,
      render: (value: string | null) => value || '-',
    },
    {
      key: 'company',
      header: 'Entreprise',
      render: (_: any, row: Contact) => (row.company ? row.company.name : '-'),
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Contacts</h1>
          <p className="text-muted-foreground mt-2">Gérez vos contacts commerciaux</p>
        </div>
        <Button onClick={() => router.push('/commercial/contacts/new')}>
          Nouveau Contact
        </Button>
      </div>

      <div className="mb-6">
        <Input
          placeholder="Rechercher un contact..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <Table
        data={paginatedContacts}
        columns={columns}
        emptyMessage="Aucun contact trouvé"
      />

      {filteredContacts.length > itemsPerPage && (
        <div className="mt-6 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredContacts.length / itemsPerPage)}
            onPageChange={setCurrentPage}
            showPrevNext
            maxVisible={5}
          />
        </div>
      )}
    </div>
  );
}

