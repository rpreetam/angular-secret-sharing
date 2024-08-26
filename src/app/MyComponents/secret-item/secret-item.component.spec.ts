import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretItemComponent } from './secret-item.component';

describe('SecretItemComponent', () => {
  let component: SecretItemComponent;
  let fixture: ComponentFixture<SecretItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecretItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecretItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
