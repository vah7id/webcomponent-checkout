import { fetchPaymentOptions } from '../actions';
import { paymentOptionsApiResponse } from './__mocks__/_paymentOptions.mock';

describe('test fetching payment options action', () => {
   
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve(paymentOptionsApiResponse),
        })
    );

    beforeEach(() => {
        fetch.mockClear();
    });

    it("fetch payment options action", async () => {
        const paymentOptions = await fetchPaymentOptions();
        
        expect(paymentOptions).toEqual(paymentOptionsApiResponse);
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(
            "/assets/mocks/payment_options.json"
        );
    });

    it("fetch payment options action failure", async () => {
        fetch.mockImplementationOnce(() => Promise.reject([]));

        const paymentOptions = await fetchPaymentOptions().catch(err => err);
        expect(paymentOptions).toEqual([]);
        expect(fetch).toHaveBeenCalledWith(
            "/assets/mocks/payment_options.json"
        );
    });

});
