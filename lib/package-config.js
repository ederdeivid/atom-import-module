'use babel';

import defaulConfig from './config';

class PackageConfig {

  constructor() {

    this.disposables = [];
    this.defaultConfig = defaulConfig;
    this.options = this.getInitalOptions();
  }

  init() {

    this.options = this.getInitalOptions();
    this.registerListeners();
  }

  getInitalOptions() {
    return {
      AtomShowFiles: this.get('AtomShowFiles'),
    };
  }

  get(option) {

    const value = atom.config.get(`atom-import-module.${option}`);

    if (value === undefined) {

      return this.defaultConfig[option].default;
    }

    return value;
  }

  registerListeners() {
    this.subscriptions.add(atom.config.observe('atom-import-module.AtomShowFiles', value => this.options.AtomShowFiles = value)))
  }

  destroy() {
    this.disposables = [];
  }
}

export default new PackageConfig();
