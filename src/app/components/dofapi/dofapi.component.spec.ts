import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DofapiComponent } from './dofapi.component';

describe('DofapiComponent', () => {
  let component: DofapiComponent;
  let fixture: ComponentFixture<DofapiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DofapiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DofapiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
