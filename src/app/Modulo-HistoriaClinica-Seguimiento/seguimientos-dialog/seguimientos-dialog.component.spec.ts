import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguimientosDialogComponent } from './seguimientos-dialog.component';

describe('SeguimientosDialogComponent', () => {
  let component: SeguimientosDialogComponent;
  let fixture: ComponentFixture<SeguimientosDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeguimientosDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeguimientosDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
