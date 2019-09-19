import { mount } from '@vue/test-utils';
import Blog from '~/pages/blog';

describe('Blog', () => {
    test('returns blog posts', () => {
        const wrapper = mount(Blog);
        expect(wrapper.isVueInstance()).toBeTruthy();
    })
});
