import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

export type TabItem = {
  link: string;
  title: string;
}

@Component({
  selector: 'app-tab-toggle[tabList]',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './tab-toggle.component.html',
  styleUrls: ['./tab-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabToggleComponent {
  @Input()
  tabList!: TabItem[];

  @Output() onTabChange = new EventEmitter<TabItem>();

  tabActiveChange(isActive: boolean, tab: TabItem): void {
    if(isActive) {
      this.onTabChange.emit(tab);
    }
  }
}
