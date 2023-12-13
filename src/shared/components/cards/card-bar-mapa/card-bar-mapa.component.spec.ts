import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBarMapaComponent } from './card-bar-mapa.component';

describe('CardBarMapaComponent', () => {
  let component: CardBarMapaComponent;
  let fixture: ComponentFixture<CardBarMapaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardBarMapaComponent]
    });
    fixture = TestBed.createComponent(CardBarMapaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
