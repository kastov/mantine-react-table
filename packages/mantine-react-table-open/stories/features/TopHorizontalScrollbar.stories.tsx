import { MantineReactTable, type MRT_ColumnDef } from '../../src';

import { faker } from '@faker-js/faker';
import { type Meta } from '@storybook/react';

const meta: Meta = {
  title: 'Features/Top Horizontal Scrollbar',
};

export default meta;

const columns: MRT_ColumnDef<any>[] = [
  { accessorKey: 'firstName', header: 'First Name' },
  { accessorKey: 'middleName', header: 'Middle Name' },
  { accessorKey: 'lastName', header: 'Last Name' },
  { accessorKey: 'email', header: 'Email Address', size: 300 },
  { accessorKey: 'phoneNumber', header: 'Phone Number' },
  { accessorKey: 'address', header: 'Address', size: 250 },
  { accessorKey: 'zipCode', header: 'Zip Code' },
  { accessorKey: 'city', header: 'City' },
  { accessorKey: 'state', header: 'State' },
  { accessorKey: 'country', header: 'Country', size: 200 },
  { accessorKey: 'favoriteColor', header: 'Favorite Color' },
  { accessorKey: 'favoriteQuote', header: 'Favorite Quote', size: 500 },
  { accessorKey: 'petName', header: 'Pet Name' },
  { accessorKey: 'petType', header: 'Pet Type' },
];

const data = [...Array(50)].map(() => ({
  address: faker.location.streetAddress(),
  city: faker.location.city(),
  country: faker.location.country(),
  email: faker.internet.email(),
  favoriteColor: faker.color.human(),
  favoriteQuote: faker.lorem.sentence(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  middleName: faker.person.middleName(),
  petName: faker.person.firstName(),
  petType: faker.animal.type(),
  phoneNumber: faker.phone.number(),
  state: faker.location.state(),
  zipCode: faker.location.zipCode(),
}));

export const TopHorizontalScrollbarEnabled = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableTopHorizontalScrollbar
  />
);

export const TopHorizontalScrollbarDisabled = () => (
  <MantineReactTable columns={columns} data={data} />
);
