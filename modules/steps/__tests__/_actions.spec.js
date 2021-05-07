import { getBasketItems } from '../actions';
import { basketItemsApiResponse } from './__mocks__/_basketItems.mock';

describe('test fetching basket items action', () => {
   
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve(basketItemsApiResponse),
        })
    );

    beforeEach(() => {
        fetch.mockClear();
    });

    it("fetch basket items action", async () => {
        const basketItems = await getBasketItems();
        
        expect(basketItems).toEqual(basketItemsApiResponse);
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(
            "/assets/mocks/basket.json"
        );
    });

    it("fetch basket items action failure", async () => {
        fetch.mockImplementationOnce(() => Promise.reject([]));

        const basketItems = await getBasketItems().catch(err => err);
        expect(basketItems).toEqual([]);
        expect(fetch).toHaveBeenCalledWith(
            "/assets/mocks/basket.json"
        );
    });
    
});
