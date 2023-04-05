import {Injectable} from '@angular/core';
import {Settings} from "../model/settings.model";

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  private settings: Settings = {};

  constructor() { }

  init(): void {
    // Load settings from local storage
    this.settings = JSON.parse(localStorage.getItem('settings') || '{}') as Settings;
  }

  getSettings(): Settings {
    return this.settings;
  }

  getSetting(key: string): string | null {
    return this.getOrDefaultSetting(key, null) as string | null;
  }

  getOrDefaultSetting(key: string, defaultValue: unknown): string | unknown {
    return this.settings[key as keyof Settings]?.value ?? defaultValue;
  }

  putSetting(key: string, value: string): void {
    this.settings[key as keyof Settings] = { id: Object.values(this.settings).length, value };
    localStorage.setItem('settings', JSON.stringify(this.settings));
  }

  deleteSetting(key: string): void {
    delete this.settings[key as keyof Settings];
    console.log(this.settings);
    localStorage.setItem('settings', JSON.stringify(this.settings));
  }

  clearSettings(): void {
    this.settings = {};
    localStorage.setItem('settings', JSON.stringify(this.settings));
  }
}
