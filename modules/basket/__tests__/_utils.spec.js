import { skuValidator } from '../utils';
import { basketItem } from './__mocks__/_basketItem.mock';

describe('test custom validation for sku input', () => {

        const testCase = [[basketItem, 3, ''], [basketItem, 400, 'OUT OF STOCK', basketItem, 100, '']];
        
        test.each(testCase)(
            '.skuValidator(%o, %n, %b)',
            (items, modelValue, expected) => {
                expect(skuValidator(items, modelValue)).toBe(expected);
            },
        );

    });