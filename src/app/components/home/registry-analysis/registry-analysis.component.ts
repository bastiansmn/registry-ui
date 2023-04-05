import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {RegistryService} from "../../../services/registry.service";
import {catchError, EMPTY, Subject, take, takeUntil, timer} from "rxjs";
import {AlertService} from "../../../services/alert.service";
import {Status} from "../../../enum/status.enum";
import {SettingService} from "../../../services/setting.service";
import {SettingsConstant} from "../../../constants/settings.constant";

@Component({
  selector: 'app-registry-analysis',
  templateUrl: './registry-analysis.component.html',
  styleUrls: ['./registry-analysis.component.scss']
})
export class RegistryAnalysisComponent implements OnInit, OnDestroy {

  readonly PING_INTERVAL = 60_000;

  private componentDestroyed$ = new Subject<void>();

  status: Status = Status.WAITING;
  Status = Status;
  lastPing!: Date;

  constructor(
    private _registryService: RegistryService,
    private _alertService: AlertService,
    private _settingService: SettingService
  ) { }

  ngOnInit(): void {
    // Ping the registryUrl
    timer(0, this.PING_INTERVAL)
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(iteration => {
        const registryUrl = this._settingService.getSetting(SettingsConstant.REGISTRY_URL);
        const isPrivate = this._settingService.getSetting(SettingsConstant.REGISTRY_IS_PRIVATE);

        if (!registryUrl || (isPrivate === null || isPrivate === undefined)) return;

        this.lastPing = new Date();
        this._registryService.pingRegistry({
          registryUrl,
          registryIsPrivate: false
        })
          .pipe(
            take(1),
            catchError(() => {
              this.status = Status.DOWN;
              return EMPTY;
            })
          )
          .subscribe(() => {
            if (iteration === 0) {
              this._alertService.show({
                severity: 'success',
                summary: 'Registry is reachable',
                detail: 'The registry is reachable'
              });
            }
            this.status = Status.UP;
          });
      })
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

}
