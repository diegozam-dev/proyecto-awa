import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TratamientoDialogComponent } from './tratamiento-dialog.component';

describe('TratamientoDialogComponent', () => {
  let component: TratamientoDialogComponent;
  let fixture: ComponentFixture<TratamientoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TratamientoDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TratamientoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
