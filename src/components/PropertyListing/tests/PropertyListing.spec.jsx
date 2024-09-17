import React from 'react';
import { render, screen } from '@testing-library/react';
import { within } from '@testing-library/dom';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import PropertyListing from '../PropertyListing';

describe('PropertyListing', () => {
    const DUMMY_PROPERTY = {
        id: 73864112,
        bedrooms: 3,
        summary: 'Property 1 Situated moments from the River Thames in Old Chelsea...',
        displayAddress: '1 CHEYNE WALK, CHELSEA, SW3',
        propertyType: 'Flat',
        price: 1950000,
        branchName: 'M2 Property, London',
        propertyUrl: '/property-for-sale/property-73864112.html',
        contactUrl: '/property-for-sale/contactBranch.html?propertyId=73864112',
        propertyTitle: '3 bedroom flat for sale',
        mainImage:
            'https://media.rightmove.co.uk/dir/crop/10:9-16:9/38k/37655/53588679/37655_CAM170036_IMG_01_0000_max_476x317.jpg',
    };
    const server = setupServer(
        http.get('http://localhost:3000/api/properties', () => {
            return HttpResponse.json(
                Array(5)
                    .fill(DUMMY_PROPERTY)
                    .map((property, index) => ({ ...property, id: `${property.id}_${index}` }))
            );
        })
    );
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    it('should render property cards for fetched properties', async () => {
        render(<PropertyListing />);
        const propertiesList = screen.getByRole('list');
        const propertyCards = await within(propertiesList).findAllByRole('listitem');
        expect(propertyCards).toHaveLength(5);
    });
});
