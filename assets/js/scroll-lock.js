/***
 * Disable scrolling in the target element,
 * @param {Object} [element=document.body] - element element to lock
 * @param {boolean} [padScrollbar=true] - Add padding for scrollbars when element is set to overflow: hidden
 */

export default class ScrollLock {
    /***
     * Disable scrolling in the element element,
     * @param {Object} [element=document.body] - Element to lock scrolling for
     * @param {boolean} [padScrollbar=true] - Add padding for scrollbars when element is set to overflow: hidden
     */
    static disableScroll(element, padScrollbar = true) {
        const target = element ? element : document.body;
        const scrollbar = ScrollLock.hasScrollBar(target);

        if (scrollbar) {
            if (scrollbar.vertical) {
                target.style.paddingRight = `${scrollbar.width}px`
            }

            if (scrollbar.horizontal) {
                target.style.paddingBottom = `${scrollbar.width}px`
            }
        }

        element.style.overflow = 'hidden';
    }

    /***
     * Re-enable scrolling in the element element,
     * @param {Object} [element=document.body] - element element to unlock
     */
    static enableScroll(element) {
        const elementElement = element ? element : document.body;

        element.style = '';
    }
    
    /***
     * Re-enable scrolling in the element element,
     * @param {Object} [element=document.body] - element element to unlock
     */
    static hasScrollBar(element) {
        if (!element) return false;

        return {
            vertical: element.scrollHeight > element.clientHeight,
            horizontal: element.scrollWidth > element.clientWidth,
            width: (window.innerWidth - element.clientWidth) ||
                (window.innerHeight - element.clientHeight)
        };
    }
}
