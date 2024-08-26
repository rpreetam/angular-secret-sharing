import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSecretComponent } from './add-secret.component';

describe('AddSecretComponent', () => {
  let component: AddSecretComponent;
  let fixture: ComponentFixture<AddSecretComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSecretComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSecretComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
