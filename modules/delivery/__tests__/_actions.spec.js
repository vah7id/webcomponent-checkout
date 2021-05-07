import { getCustomerDetails } from '../actions';
import { customerApiResponse } from './__mocks__/_customer.mock';

describe('test fetching customer details action', () => {
   
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve(customerApiResponse),
        })
    );

    beforeEach(() => {
        fetch.mockClear();
    });

    it("fetch customer details action", async () => {
        const customerDetails = await getCustomerDetails();
        
        expect(customerDetails).toEqual(customerApiResponse);
        expect(fetch).toHaveBeenCalledTimes(1);

        expect(fetch).toHaveBeenCalledWith(
            "/assets/mocks/customer.json"
        );
    });

    it("fetch customer details action failure", async () => {
        fetch.mockImplementationOnce(() => Promise.reject([]));

        const customerDetails = await getCustomerDetails().catch(err => err);
        expect(customerDetails).toEqual([]);

        expect(fetch).toHaveBeenCalledWith(
            "/assets/mocks/customer.json"
        );
    });

});
