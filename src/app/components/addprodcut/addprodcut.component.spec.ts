import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddprodcutComponent } from './addprodcut.component';

describe('AddprodcutComponent', () => {
  let component: AddprodcutComponent;
  let fixture: ComponentFixture<AddprodcutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddprodcutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddprodcutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
