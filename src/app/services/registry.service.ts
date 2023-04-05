import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import RegistryCredentials from "../model/registry-credentials.model";
import {Observable} from "rxjs";
import RepositoriesResponseModel from "../model/responses/repositories.response.model";
import TagResponseModel from "../model/responses/tag.response.model";
import {Manifest} from "../model/manifest.model";

@Injectable({
  providedIn: 'root'
})
export class RegistryService {

  constructor(
    private _http: HttpClient
  ) { }

  pingRegistry(credentials: RegistryCredentials) {
    if (credentials.registryUsername && credentials.registryPassword) {
      const cred = this.getBasicAuthUrl(credentials);
      return this._http.get(`${cred.protocol}://${credentials.registryUsername}:${credentials.registryPassword}@${cred.domain}/v2`);
    }
    return this._http.get(`${credentials.registryUrl}/v2`);
  }

  fetchRepositories(credentials: RegistryCredentials): Observable<RepositoriesResponseModel> {
    if (credentials.registryUsername && credentials.registryPassword) {
      const cred = this.getBasicAuthUrl(credentials);
      return this._http.get<RepositoriesResponseModel>(`${cred.protocol}://${credentials.registryUsername}:${credentials.registryPassword}@${cred.domain}/v2/_catalog`);
    }
    return this._http.get<RepositoriesResponseModel>(`${credentials.registryUrl}/v2/_catalog`);
  }

  fetchRepositoriesPaginated(credentials: RegistryCredentials, n: number, last: string): Observable<RepositoriesResponseModel> {
    if (credentials.registryUsername && credentials.registryPassword) {
      const cred = this.getBasicAuthUrl(credentials);
      return this._http.get<RepositoriesResponseModel>(`${cred.protocol}://${credentials.registryUsername}:${credentials.registryPassword}@${cred.domain}/v2/_catalog?n=${n}&last=${last}`);
    }
    return this._http.get<RepositoriesResponseModel>(`${credentials.registryUrl}/v2/_catalog?n=${n}&last=${last}`);
  }

  fetchTagsOfRepository(credentials: RegistryCredentials, repository: string): Observable<TagResponseModel> {
    if (credentials.registryUsername && credentials.registryPassword) {
      const cred = this.getBasicAuthUrl(credentials);
      return this._http.get<TagResponseModel>(`${cred.protocol}://${credentials.registryUsername}:${credentials.registryPassword}@${cred.domain}/v2/${repository}/tags/list`);
    }
    return this._http.get<TagResponseModel>(`${credentials.registryUrl}/v2/${repository}/tags/list`);
  }

  fetchTagsOfRepositoryPaginated(credentials: RegistryCredentials, repository: string, n: number, last: string): Observable<TagResponseModel> {
    if (credentials.registryUsername && credentials.registryPassword) {
      const cred = this.getBasicAuthUrl(credentials);
      return this._http.get<TagResponseModel>(`${cred.protocol}://${credentials.registryUsername}:${credentials.registryPassword}@${cred.domain}/v2/${repository}/tags/list?n=${n}&last=${last}`);
    }
    return this._http.get<TagResponseModel>(`${credentials.registryUrl}/v2/${repository}/tags/list?n=${n}&last=${last}`);
  }

  fetchImageManifest(credentials: RegistryCredentials, repository: string, tag: string): Observable<Manifest> {
    if (credentials.registryUsername && credentials.registryPassword) {
      const cred = this.getBasicAuthUrl(credentials);
      return this._http.get<Manifest>(`${cred.protocol}://${credentials.registryUsername}:${credentials.registryPassword}@${cred.domain}/v2/${repository}/manifests/${tag}`);
    }
    return this._http.get<Manifest>(`${credentials.registryUrl}/v2/${repository}/manifests/${tag}`);
  }


  private getBasicAuthUrl(credentials: RegistryCredentials): { protocol: string, domain: string } {
    const protocol = credentials.registryUrl.startsWith('https') ? 'https' : 'http';
    const domain = credentials.registryUrl.replace(`${protocol}://`, '');
    return { protocol, domain };
  }
}
