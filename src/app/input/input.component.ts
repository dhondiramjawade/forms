import { AfterContentInit, AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Optional, Output } from '@angular/core';
import { FormArrayName, FormControl, FormGroup, FormGroupDirective, FormGroupName } from '@angular/forms';
import { of, Subscription } from 'rxjs';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements OnInit, AfterViewInit, AfterContentInit, OnDestroy {

  private _data = "";
  @Input() set data(data: string) {
    if (this.fControl) {
      this.fControl.setValue(data);
    }
    this._data = data;
  }
  get data() {
    return this._data;
  }

  @Input() controlKey: string | number | null = null;
  @Input() fromGroup: FormGroup = new FormGroup({});

  @Input() lable = "";
  private _fControl = new FormControl();
  @Input() set fControl(control: FormControl) {
    this._fControl = control;
    if (this.data) {
      this._fControl.setValue(this.data);
    }
  }
  get fControl() {
    return this._fControl;
  }


  @Output() dataChange = new EventEmitter();
  private _fControlValueChange$: Subscription = of([]).subscribe();

  constructor(@Optional() public _parentFormGroup: FormGroup, @Optional() public gn: FormGroupName,
    @Optional() public fAn: FormArrayName) {
    console.log('parent form', _parentFormGroup);
    console.log('parent fg name', gn, fAn);

  }

  ngOnInit(): void {
    this._fControlValueChange$ = this.fControl.valueChanges.subscribe(value => {
      this.dataChange.emit(value)
    })
  }

  ngAfterViewInit(): void {

  }

  ngAfterContentInit() {

  }


  modelChange() {
    console.log(this.fControl.value)
    this.dataChange.emit(this.data);
  }

  ngOnDestroy(): void {
    this._fControlValueChange$.unsubscribe();
  }

}
