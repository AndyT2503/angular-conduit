import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { FooterComponent } from './core/layout/footer/footer.component';
import { HeaderComponent } from './core/layout/header/header.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, FooterComponent, RouterTestingModule],
      declarations: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('then show header', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const debugElement = fixture.debugElement;
    const header = debugElement.query(By.directive(HeaderComponent));
    expect(header).toBeTruthy();
    expect(header.componentInstance).toBeInstanceOf(HeaderComponent);
  });

  it('then show footer', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const debugElement = fixture.debugElement;
    const footer = debugElement.query(By.directive(FooterComponent));
    expect(footer).toBeTruthy();
    expect(footer.componentInstance).toBeInstanceOf(FooterComponent);
  });

  it('then show router-outlet', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const debugElement = fixture.debugElement;
    const routerOutletElement = debugElement.query(By.css('router-outlet'));
    expect(routerOutletElement).toBeTruthy();
  });
});
