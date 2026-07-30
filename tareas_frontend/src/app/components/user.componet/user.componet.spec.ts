import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponet } from './user.componet';

describe('UserComponet', () => {
  let component: UserComponet;
  let fixture: ComponentFixture<UserComponet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserComponet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserComponet);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
