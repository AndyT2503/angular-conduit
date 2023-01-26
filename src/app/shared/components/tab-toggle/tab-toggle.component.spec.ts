import { take } from 'rxjs';
import { By } from '@angular/platform-browser';
import { render, RenderResult } from '@testing-library/angular';

import { TabItem, TabToggleComponent, TabType } from './tab-toggle.component';

describe(TabToggleComponent.name, () => {
  async function setup(mockedTabList: TabItem[] = [{ title: 'Test' }]) {
    return await render(TabToggleComponent, {
      componentProperties: {
        tabList: mockedTabList,
      },
    });
  }

  it('Then create component', async () => {
    const { fixture } = await setup();
    expect(fixture.componentInstance).toBeTruthy();
  });

  describe('When render link tab type', () => {
    let renderResult: RenderResult<TabToggleComponent>;
    const mockedTabList: TabItem[] = [
      {
        link: '',
        title: 'Route 1',
      },
      {
        link: 'route2',
        title: 'Route 2',
      },
    ];
    beforeEach(async () => {
      renderResult = await setup(mockedTabList);
    });

    it('On change Input', () => {
      const { fixture } = renderResult;
      expect(fixture.componentInstance._tabList).toEqual(mockedTabList);
      expect(fixture.componentInstance.tabType).toEqual(TabType.Link);
    });

    it('Should render tab link', () => {
      const { debugElement } = renderResult;
      const navItems = debugElement.queryAll(By.css('.nav-item'));
      expect(navItems.length).toEqual(mockedTabList.length);
      const navLinks = debugElement.queryAll(By.css('.nav-link'));
      navLinks.forEach((item, index) => {
        expect(item.nativeElement).toHaveAttribute(
          'ng-reflect-router-link',
          mockedTabList[index].link
        );
        expect(item.nativeElement).toHaveTextContent(
          mockedTabList[index].title
        );
      });
    });

    it('onTabChange should be invoked when tabActiveChange emit true value', () => {
      const { fixture } = renderResult;
      const spyOnTabChangeEmit = spyOn(
        fixture.componentInstance.onTabChange,
        'emit'
      );
      fixture.componentInstance.tabActiveChange(true, mockedTabList[0]);
      expect(spyOnTabChangeEmit).toHaveBeenCalledWith(
        mockedTabList[0]
      );
    });

    it('onTabChange should not be invoked when tabActiveChange emit false value', () => {
      const { fixture } = renderResult;
      const spyOnTabChangeEmit = spyOn(
        fixture.componentInstance.onTabChange,
        'emit'
      );
      fixture.componentInstance.tabActiveChange(false, mockedTabList[0]);
      expect(spyOnTabChangeEmit).not.toHaveBeenCalled();
    });
  });

  describe('When render nonLink tab type', () => {
    let renderResult: RenderResult<TabToggleComponent>;
    const mockedTabList: TabItem[] = [
      {
        title: 'Route 1',
      },
      {
        title: 'Route 2',
      },
    ];
    beforeEach(async () => {
      renderResult = await setup(mockedTabList);
    });

    it('On change Input', () => {
      const { fixture } = renderResult;
      expect(fixture.componentInstance._tabList).toEqual(mockedTabList);
      expect(fixture.componentInstance.tabType).toEqual(TabType.NoneLink);
    });

    it('Should render tab nonLink', () => {
      const { debugElement } = renderResult;
      const navItems = debugElement.queryAll(By.css('.nav-item'));
      expect(navItems.length).toEqual(mockedTabList.length);
      const navLinks = debugElement.queryAll(By.css('.nav-link'));
      navLinks.forEach((item, index) => {
        expect(item.nativeElement).not.toHaveAttribute(
          'ng-reflect-router-link'
        );
        expect(item.nativeElement).toHaveTextContent(
          mockedTabList[index].title
        );
      });
    });

    it('try invoked onClickTabNoneLink', () => {
      const { fixture } = renderResult;
      const spyActiveTabTitleChangeEmit = spyOn(
        fixture.componentInstance.activeTabTitleChange,
        'emit'
      );
      const spyOnTabChangeEmit = spyOn(
        fixture.componentInstance.onTabChange,
        'emit'
      );

      fixture.componentInstance.onClickTabNoneLink(false, mockedTabList[0]);

      expect(spyActiveTabTitleChangeEmit).toHaveBeenCalledWith(
        mockedTabList[0].title
      );
      expect(spyOnTabChangeEmit).toHaveBeenCalledWith(mockedTabList[0]);
      fixture.componentInstance.activeTabTitle$
        .pipe(take(1))
        .subscribe((title) => {
          expect(title).toEqual(mockedTabList[0].title);
        });
    });
  });
});
