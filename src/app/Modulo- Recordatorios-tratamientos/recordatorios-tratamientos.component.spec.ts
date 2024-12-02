import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordatoriosTratamientosComponent } from './recordatorios-tratamientos.component';

describe('RecordatoriosTratamientosComponent', () => {
  let component: RecordatoriosTratamientosComponent;
  let fixture: ComponentFixture<RecordatoriosTratamientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecordatoriosTratamientosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecordatoriosTratamientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
