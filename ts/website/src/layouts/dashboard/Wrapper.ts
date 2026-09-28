import {CjsComponent} from "cjs";

export class Wrapper extends CjsComponent {

    _template() {
        return `
            <section class="wrapper"></section>
        `;
    }
};

Wrapper.fillHeight();