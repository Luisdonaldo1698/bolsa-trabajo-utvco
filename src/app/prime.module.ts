import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {ToolbarModule} from 'primeng/toolbar';
import {OverlayPanelModule} from 'primeng/overlaypanel'
import {AvatarModule} from 'primeng/avatar';
import {CalendarModule} from 'primeng/calendar';
import {TabViewModule} from 'primeng/tabview';
import {DropdownModule} from 'primeng/dropdown';
import {CheckboxModule} from 'primeng/checkbox';
import {DialogModule} from 'primeng/dialog';
import {InputTextareaModule} from 'primeng/inputtextarea';

const modules = [
  InputTextModule,
  ButtonModule,
  TableModule,
  ProgressSpinnerModule,
  ToolbarModule,
  OverlayPanelModule,
  AvatarModule,
  CalendarModule,
  TabViewModule,
  DropdownModule,
  CheckboxModule,
  DialogModule,
  InputTextareaModule,
]

@NgModule({
  declarations: [],
  imports: [
    modules,
    CommonModule,
  ],
  exports: [
    modules,
  ]
})
export class PrimeModule { }
