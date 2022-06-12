import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleToggleComponent } from './article-toggle.component';

describe('ArticleToggleComponent', () => {
  let component: ArticleToggleComponent;
  let fixture: ComponentFixture<ArticleToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ArticleToggleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
