import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBeneficiarioComponent } from './modal-beneficiario.component';

describe('ModalBeneficiarioComponent', () => {
  let component: ModalBeneficiarioComponent;
  let fixture: ComponentFixture<ModalBeneficiarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalBeneficiarioComponent]
    });
    fixture = TestBed.createComponent(ModalBeneficiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
