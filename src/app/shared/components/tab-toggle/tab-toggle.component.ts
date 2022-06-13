import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

export type TabItem = {
  link?: string;
  title: string;
};

enum TabType {
  Link,
  NoneLink,
}

@Component({
  selector: 'app-tab-toggle[tabList]',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './tab-toggle.component.html',
  styleUrls: ['./tab-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabToggleComponent {
  _tabList!: TabItem[];
  currentTabListLength = 0;
  tabType!: TabType;
  activeTabTitle$ = new BehaviorSubject<string>('');
  @Input()
  set tabList(value: TabItem[]) {
    this._tabList = value;
    this.tabType = !this._tabList[0].link ? TabType.NoneLink : TabType.Link;
  }

  @Input()
  set activeTabTitle(value: string) {
    this.activeTabTitle$.next(value);
  }

  @Output()
  activeTabTitleChange = new EventEmitter<string>();

  TabType = TabType;

  @Output() onTabChange = new EventEmitter<TabItem>();

  tabActiveChange(isActive: boolean, tab: TabItem): void {
    if (isActive) {
      this.onTabChange.emit(tab);
    }
  }

  onClickTabNoneLink(isActive: boolean, tab: TabItem): void {
    if (!isActive) {
      this.activeTabTitle = tab.title;
      this.activeTabTitleChange.emit(tab.title);
      this.onTabChange.emit(tab);
    }
  }
}
