import {CjsComponent} from "cjs";

export class Wrapper extends CjsComponent {
    _template() {
        return `
            <nav class="wrapper"></nav>
        `;
    }
};

Wrapper.fillHeight(-50);