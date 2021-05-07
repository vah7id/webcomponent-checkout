import { expect, it, test } from '@jest/globals';
import { isAddressValid } from '../utils';

describe('test util function to check the address validity', () => {
    const addressTestCases = [[
        {
            city: 'Amsterdam',
            street: 'kalkmarkt',
            houseNumber: '9',
            postalCode: '1011BD'
        },
        true
    ], [
        {
            street: 'kalkmarkt',
            houseNumber: '9',
            postalCode: '1011BD'
        },
        false
    ], [
        {
            city: 'Amsterdam',
            street: 'kalkmarkt',
            postalCode: '1011BD'
        },
        true
    ], [
        {
            street: 'kalkmarkt',
            houseNumber: '9',
            postalCode: '1011BD'
        },
        false
    ]]

    test.each(addressTestCases)(
        '.isAddressValid(%o, %b)',
        (address, expected) => {
            expect(isAddressValid(address)).toBe(expected);
        },
    );
});
