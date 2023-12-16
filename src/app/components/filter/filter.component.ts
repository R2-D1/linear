import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FilterData, FilterForm} from "../../models/filter.form";

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    FormsModule, ReactiveFormsModule
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent implements OnInit {
  @Output() filterChange = new EventEmitter<FilterData>();

  filterForm = new FormGroup<FilterForm>({
    name: new FormControl(),
    color: new FormControl()
  });

  public ngOnInit(): undefined {
    this.applyFilter();
  }

  private applyFilter(): undefined {
      this.filterForm.valueChanges.subscribe(value => {
        const formValue: FilterData = this.filterForm.getRawValue() ;
        this.filterChange.emit(formValue);
      });
  }
}
