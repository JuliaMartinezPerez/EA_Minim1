import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LlistaFavorits } from './llista-favorits';

describe('LlistaFavorits', () => {
  let component: LlistaFavorits;
  let fixture: ComponentFixture<LlistaFavorits>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LlistaFavorits],
    }).compileComponents();

    fixture = TestBed.createComponent(LlistaFavorits);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
