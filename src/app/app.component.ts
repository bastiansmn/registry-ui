import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuItem, PrimeIcons} from "primeng/api";
import {NavigationEnd, Router} from "@angular/router";
import {Subject} from "rxjs";
import {SettingService} from "./services/setting.service";
import {AlertService} from "./services/alert.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  get alertShown() {
    return this._alertService.alertShown$;
  }

  get message() {
    return this._alertService.message$;
  }

  menuItems!: MenuItem[];
  activeItem!: MenuItem;

  private componentDestroyed$ = new Subject<boolean>();

  constructor(
    private _router: Router,
    private _settingService: SettingService,
    private _alertService: AlertService
  ) { }


  handleNavigationChange($event: MenuItem) {
    this._router.navigate([`/${$event.id}`]);
  }

  ngOnInit(): void {
    this.menuItems = [
      { label: "Home", icon: PrimeIcons.HOME, id: "home" },
      { label: "Repositories", icon: PrimeIcons.FOLDER, id: "repositories" },
      { label: "Settings", icon: PrimeIcons.COG, id: "settings" }
    ];

    this._router.events
      .subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.activeItem = this.menuItems.find(item => item.id === event.url.split('/')[1]) as MenuItem;
        }
      });

    this._settingService.init();
  }
  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
