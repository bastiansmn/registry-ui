import {Component} from '@angular/core';
import {SettingService} from "../../services/setting.service";
import {SettingsConstant} from "../../constants/settings.constant";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  get registryUrl(): string {
    return this._settingService.getOrDefaultSetting(SettingsConstant.REGISTRY_URL, null) as string;
  }

  constructor(
    private _settingService: SettingService
  ) { }

}
