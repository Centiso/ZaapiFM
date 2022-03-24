import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DofaprixComponent } from './dofaprix.component';

describe('DofaprixComponent', () => {
  let component: DofaprixComponent;
  let fixture: ComponentFixture<DofaprixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DofaprixComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DofaprixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
