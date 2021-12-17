import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HearderLogadoComponent } from './hearder-logado.component';

describe('HearderLogadoComponent', () => {
  let component: HearderLogadoComponent;
  let fixture: ComponentFixture<HearderLogadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HearderLogadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HearderLogadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
