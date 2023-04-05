import {Component, OnInit} from '@angular/core';
import {SettingService} from "../../services/setting.service";
import {RegistryService} from "../../services/registry.service";
import {SettingsConstant} from "../../constants/settings.constant";
import {take} from "rxjs";
import Repository from "../../model/repository.model";

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss']
})
export class RepositoriesComponent implements OnInit {

  private repositories: Repository[] = [];
  get repositoriesSorted() {
    return this.repositories.sort((a, b) => a.name.localeCompare(b.name));
  }

  constructor(
    private _settingService: SettingService,
    private _registryService: RegistryService
  ) { }

  ngOnInit(): void {
    const credentials = {
      registryUrl: this._settingService.getSetting(SettingsConstant.REGISTRY_URL) ?? '',
      registryIsPrivate: this._settingService.getSetting(SettingsConstant.REGISTRY_IS_PRIVATE) === 'true' ?? false,
      registryUsername: this._settingService.getSetting(SettingsConstant.REGISTRY_USERNAME) ?? '',
      registryPassword: this._settingService.getSetting(SettingsConstant.REGISTRY_PASSWORD) ?? ''
    }
    this._registryService.fetchRepositories(credentials)
      .pipe(take(1))
      .subscribe(({ repositories }) => {
        repositories.forEach(r => {
          this._registryService.fetchTagsOfRepository(credentials, r)
            .pipe(take(1))
            .subscribe(({ tags }) => {
              this.repositories.push({
                name: r,
                tags: tags
              })
            });
        })
      })
  }

}
