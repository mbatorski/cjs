import {CjsComponent} from "cjs";

type Data = {

}

export class Wrapper extends CjsComponent<Data> {
   _template() {
       return `
          <div class="wrapper"></div>
       `;
   }
};

Wrapper.fillHeight();