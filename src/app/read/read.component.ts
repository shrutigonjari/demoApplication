import { Component, OnChanges, Input, ViewChild,EventEmitter,Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Tutorial } from './../models/tutorial.model';
import { AppState } from './../app.state';
import * as TutorialActions from './../actions/tutorial.actions';
import { AgGridAngular } from "ag-grid-angular";

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnChanges {
  @Input() tutorials;
  @Output() valueChange = new EventEmitter();
  @ViewChild('agGrid', { static: true }) agGrid: AgGridAngular;
  // tutorials: Observable<Tutorial[]>;

  constructor(private store: Store<AppState>) {
    this.tutorials = store.select('tutorial');

  }

  delRow(index) {
    this.store.dispatch(new TutorialActions.RemoveTutorial(index))
  }

  columnDefs = [
    { headerName: 'First Name', field: 'firstName', sortable: true, filter: true },
    { headerName: 'Last Name', field: 'lastName', sortable: true, filter: true },
    { headerName: 'Age', field: 'Age', sortable: true, filter: true },
    { headerName: 'Designation', field: 'Designation', sortable: true, filter: true }

  ];

  ngOnChanges() {

  }

  currentIndex;
  onRowClick(event: any): void {
    this.currentIndex = event.rowIndex;
    this.valueChange.emit({data:event.data,key:event.rowIndex});
    console.log('row index', event);
  }


  onDeleteRow() {
    var selectedData = this.agGrid.api.getSelectedRows();
    console.log('Im here', selectedData, this.tutorials)
    this.agGrid.api.updateRowData({ remove: selectedData });
    let rowData = [];
    this.agGrid.api.forEachNode(node => rowData.push(node.data));
    this.delRow(rowData)
  }


}
