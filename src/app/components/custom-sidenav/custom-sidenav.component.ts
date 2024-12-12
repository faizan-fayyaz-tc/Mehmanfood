import { CommonModule } from '@angular/common';
import { Component, computed, Input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {MatListModule } from '@angular/material/list';
import { Router, RouterLink, RouterModule } from '@angular/router';

export type MenuItem = {
  icon : string;
  label : string;
  route : string;
}

@Component({
  selector: 'app-custom-sidenav',
  standalone : true,
  imports: [CommonModule, FormsModule,MatListModule, MatIconModule, RouterLink, RouterModule],
  templateUrl: './custom-sidenav.component.html',
  styleUrl: './custom-sidenav.component.css'
})
export class CustomSidenavComponent {

  
  sideNavCollapsed = signal(false);
  @Input() set collapsed(val : boolean){
    this.sideNavCollapsed.set(val);
  }

  menuItems = signal<MenuItem[]>([
    {
      icon: 'dashboard',
      label : 'Dashboard',
      route : 'dashboard'
    },
    {
      icon: 'local_grocery_store',
      label : 'Order',
      route : 'order'
    },
    {
      icon: 'video_library',
      label : 'Content',
      route : 'content'
    },
    {
      icon: 'comment',
      label : 'Comment',
      route : 'comment'
    }
  ]);

  profilePicSize = computed(()=>this.sideNavCollapsed() ? '32' : '100');

}
