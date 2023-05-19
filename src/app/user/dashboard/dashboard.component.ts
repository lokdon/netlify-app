import { Component } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
import { FormBuilder, FormControl, FormGroup, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})



export class DashboardComponent {
  cities: City[] = [];
  formGroup: FormGroup;

  constructor(builder: FormBuilder) {
    
    this.formGroup = builder.group({
      selectedCity : new FormControl<City | null>(null)
    });
  }

    ngOnInit() {
        this.cities = [
          { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];
    }

}


interface City {
  name: string;
  code: string;
}
