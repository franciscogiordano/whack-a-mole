import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameCoreComponent } from './game-core.component';

describe('GameCoreComponent', () => {
  let component: GameCoreComponent;
  let fixture: ComponentFixture<GameCoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameCoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
