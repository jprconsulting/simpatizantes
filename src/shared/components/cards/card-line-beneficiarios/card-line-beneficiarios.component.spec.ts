import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardLineBeneficiariosComponent } from './card-line-beneficiarios.component';

describe('CardLineBeneficiariosComponent', () => {
  let component: CardLineBeneficiariosComponent;
  let fixture: ComponentFixture<CardLineBeneficiariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardLineBeneficiariosComponent]
    });
    fixture = TestBed.createComponent(CardLineBeneficiariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
