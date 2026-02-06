import { inputBinding } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { commonEnv, ENV } from '@bp/core';
import { OrderBookCardComponent } from './order-book-card.component';
import { OrderBookEntryTableComponent } from './order-book-entry-table.component';

describe('OrderBookCardComponent', () => {
  let fixture: ComponentFixture<OrderBookCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderBookCardComponent, OrderBookEntryTableComponent],
      providers: [
        {
          provide: ENV,
          useValue: commonEnv,
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(OrderBookCardComponent, {
      bindings: [inputBinding('symbol', () => 'BTCUSDT')],
    });
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should display symbol in uppercase', () => {
    fixture.detectChanges();
    const titleElement = fixture.debugElement.query(By.css('bp-card-title'));
    expect(titleElement).toBeTruthy();
    expect(titleElement.nativeElement.textContent.trim()).toBe('BTCUSDT');
  });

  it('should show loading message when no data', () => {
    fixture.detectChanges();
    const contentElement = fixture.debugElement.query(
      By.css('bp-card-content'),
    );
    expect(contentElement).toBeTruthy();
    const contentText = contentElement.nativeElement.textContent;
    expect(contentText).toContain('Waiting for order book data');
  });

  it('should have one remove button', () => {
    fixture.detectChanges();
    const buttons = fixture.debugElement.queryAll(By.css('bp-button'));
    expect(buttons.length).toBe(1);
    expect(buttons[0].nativeElement.textContent.trim()).toBe('Remove');
  });
});
