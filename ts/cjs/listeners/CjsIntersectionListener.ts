import { CjsLazyClassPrefix } from "../constants";

/** Swaps `lazy:<class>` into `<class>` once the element appears in the user view */
export const CjsIntersectionListener = new class CjsIntersectionListener {
    #observer: IntersectionObserver;

    constructor() {
        this.#observer = new IntersectionObserver(this.callback, {
            root: null,
            rootMargin: "0px",
            threshold: 0.1
        });
    }

    #getLazyElements(node: Element): Element[] {
        const selector = `[class*='${CjsLazyClassPrefix}']`;
        const elements = Array.from(node.querySelectorAll(selector));

        if(node.matches(selector)) elements.unshift(node);

        return elements;
    }

    callback = (entries: IntersectionObserverEntry[]) => {
        for(const entry of entries) {
            if(!entry.isIntersecting) continue;

            this.performLazy(entry.target);
        }
    };

    /** Observes the node and all of its descendants that use lazy classes */
    public observe(node: Element): void {
        for(const element of this.#getLazyElements(node)) {
            this.#observer.observe(element);
        }
    }

    /** Stops observing the node and all of its descendants that use lazy classes */
    public unobserve(node: Element): void {
        for(const element of this.#getLazyElements(node)) {
            this.#observer.unobserve(element);
        }
    }

    /** Observes all lazy elements in the document */
    public observeAll(): void {
        this.observe(document.body);
    }

    /** Replaces every `lazy:<class>` of the element with `<class>` */
    public performLazy(element: Element): void {
        const lazyClasses = Array.from(element.classList)
            .filter(cls => cls.startsWith(CjsLazyClassPrefix));

        for(const lazyClass of lazyClasses) {
            element.classList.remove(lazyClass);
            element.classList.add(lazyClass.slice(CjsLazyClassPrefix.length));
        }

        this.#observer.unobserve(element);
    }
}
