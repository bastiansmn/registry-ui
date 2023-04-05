import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SettingService} from "../../services/setting.service";
import {SettingsConstant} from "../../constants/settings.constant";
import {AlertService} from "../../services/alert.service";
import {RegistryService} from "../../services/registry.service";
import {Subject, take} from "rxjs";
import RegistryCredentials from "../../model/registry-credentials.model";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {

  private componentDestroyed$ = new Subject<void>();

  registryForm!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _settingService: SettingService,
    private _alertService: AlertService,
    private _registryService: RegistryService
  ) { }

  handleFormSubmit() {
    Object.entries(this.registryForm.controls).forEach(([_, control]) => {
      control.markAsDirty();
    });

    if (this.registryForm.invalid)
      return;

    const values = { ...this.registryForm.value };
    values.registryIsPrivate = values.registryIsPrivate?.length > 0 && values.registryIsPrivate[0];
    this._registryService.pingRegistry(values as RegistryCredentials)
      .pipe(take(1))
      .subscribe(() =>{
        this._settingService.putSetting(SettingsConstant.REGISTRY_URL, this.registryForm.value.registryUrl);
        this._settingService.putSetting(SettingsConstant.REGISTRY_IS_PRIVATE, values.registryIsPrivate);
        if (this.registryForm.value.registryUsername)
          this._settingService.putSetting(SettingsConstant.REGISTRY_USERNAME, this.registryForm.value.registryUsername);
        if (this.registryForm.value.registryPassword)
          this._settingService.putSetting(SettingsConstant.REGISTRY_PASSWORD, this.registryForm.value.registryPassword);

        if (!values.registryIsPrivate) {
          this._settingService.deleteSetting(SettingsConstant.REGISTRY_USERNAME);
          this._settingService.deleteSetting(SettingsConstant.REGISTRY_PASSWORD);
        }
        this._alertService.show({
          severity: 'success',
          summary: 'Registry URL updated',
          detail: 'The registry URL has been updated'
        });
      });

  }

  ngOnInit(): void {
    // TODO: Add better control
    this.registryForm = this._fb.group({
      registryUrl: this._fb.control<string | null>(
        this._settingService.getSetting(SettingsConstant.REGISTRY_URL),
        [Validators.required, Validators.pattern(/^(http|https):\/\/[a-zA-Z0-9-_.]+(:[0-9]+)?$/)]
      ),
      registryIsPrivate: this._fb.control(
        this._settingService.getSetting(SettingsConstant.REGISTRY_IS_PRIVATE) ? [true] : []
      ),
      registryUsername: this._fb.control<string | null>(
        this._settingService.getSetting(SettingsConstant.REGISTRY_USERNAME)
      ),
      registryPassword: this._fb.control<string | null>(
        this._settingService.getSetting(SettingsConstant.REGISTRY_PASSWORD)
      )
    });
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }
}
