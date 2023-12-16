import {FormControl} from "@angular/forms";

export interface FilterForm {
  name: FormControl<null | string>;
  color: FormControl<null | string>;
}

export interface FilterData  {
  name: null | string;
  color: null | string;
}
