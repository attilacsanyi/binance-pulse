import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { inputBinding } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatCardHarness } from '@angular/material/card/testing';
import { commonEnv, ENV } from '@bp/core';
import { OrderBookCardComponent } from './order-book-card.component';
import { OrderBookEntryTableComponent } from './order-book-entry-table.component';

describe('OrderBookCardComponent', () => {
  let fixture: ComponentFixture<OrderBookCardComponent>;
  let loader: HarnessLoader;

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

    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should display symbol in uppercase', async () => {
    const card = await loader.getHarness(MatCardHarness);
    const title = await card.getTitleText();
    expect(title).toBe('BTCUSDT');
  });

  it('should show loading message when no data', async () => {
    const card = await loader.getHarness(MatCardHarness);
    const content = await card.getText();
    expect(content).toContain('Waiting for order book data');
  });

  it('should have one remove button', async () => {
    const buttons = await loader.getAllHarnesses(MatButtonHarness);
    expect(buttons.length).toBe(1);
    expect(await buttons[0].getText()).toBe('Remove');
  });
});
