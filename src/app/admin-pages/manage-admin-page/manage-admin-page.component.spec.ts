import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAdminPageComponent } from './manage-admin-page.component';

describe('ManageAdminPageComponent', () => {
  let component: ManageAdminPageComponent;
  let fixture: ComponentFixture<ManageAdminPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageAdminPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageAdminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
