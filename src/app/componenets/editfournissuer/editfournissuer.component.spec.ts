import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditfournissuerComponent } from './editfournissuer.component';

describe('EditfournissuerComponent', () => {
  let component: EditfournissuerComponent;
  let fixture: ComponentFixture<EditfournissuerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditfournissuerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditfournissuerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
