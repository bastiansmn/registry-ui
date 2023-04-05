import {Component, OnInit} from '@angular/core';
import {RegistryService} from "../../../services/registry.service";
import {SettingService} from "../../../services/setting.service";
import {ActivatedRoute} from "@angular/router";
import {take} from "rxjs";
import {Manifest} from "../../../model/manifest.model";
import {SettingsConstant} from "../../../constants/settings.constant";

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss']
})
export class RepositoryComponent implements OnInit {

  repository!: string;

  manifests: Manifest[] = [];
  single = false;

  constructor(
    private _settingService: SettingService,
    private _registryService: RegistryService,
    private _activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const credentials = {
      registryUrl: this._settingService.getSetting(SettingsConstant.REGISTRY_URL) ?? '',
      registryIsPrivate: this._settingService.getSetting(SettingsConstant.REGISTRY_IS_PRIVATE) === 'true' ?? false,
      registryUsername: this._settingService.getSetting(SettingsConstant.REGISTRY_USERNAME) ?? '',
      registryPassword: this._settingService.getSetting(SettingsConstant.REGISTRY_PASSWORD) ?? ''
    }

    this._activeRoute.params
      .pipe(take(1))
      .subscribe(pathParams => {
        if (!pathParams.hasOwnProperty('repository')) return;
        this.repository = pathParams['repository'];

        this._activeRoute.queryParams
          .pipe(take(1))
          .subscribe(params => {
            if (Object.keys(params).length === 0) {
              this.single = false;
              // Fetch all tags of repository
              this._registryService.fetchTagsOfRepository(credentials, pathParams['repository'])
                .pipe(take(1))
                .subscribe(({ tags }) => {
                  tags.forEach(tag => {
                    this._registryService.fetchImageManifest(credentials, pathParams['repository'], tag)
                      .pipe(take(1))
                      .subscribe(manifest => {
                        this.manifests.push({
                          ...manifest,
                          tag
                        });
                      });
                  });
                });
            } else {
              this.single = true;
              // Fetch specific tag of repository
              if (!params.hasOwnProperty('tag')) return;

              this._registryService.fetchImageManifest(credentials, pathParams['repository'], params['tag'])
                .pipe(take(1))
                .subscribe(manifest => {
                  this.manifests.push({
                    ...manifest,
                    tag: params['tag']
                  });
                });
            }
          })
      })
  }

  getManifestTag(manifest: Manifest): string {
    return "tag" in manifest ? manifest.tag : '';
  }
}
