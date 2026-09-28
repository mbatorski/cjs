import { CjsComponent } from "cjs";


type Data = {

}

export class MapContent extends CjsComponent<Data> {
   _template() {
       return `
          <section class="map-content"></section>
       `;
   }
};