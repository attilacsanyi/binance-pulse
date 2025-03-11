import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, RouterModule.forRoot([])],
    }).compileComponents();
  });

  it(`should have as title 'binance-pulse'`, () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Binance Pulse');
  });
});
