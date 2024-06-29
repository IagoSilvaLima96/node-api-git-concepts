export class Registry {
  private static instance: Registry;
  private dependencies: { [name: string]: any };

  private constructor() {
    this.dependencies = {};
  }

  provide(name: string, dependency: any) {
    this.dependencies[name] = dependency;
  }

  inject(name: string) {
    return this.dependencies[name];
  }

  static getInstance(): Registry {
    if (!Registry.instance) {
      Registry.instance = new Registry();
    }
    return Registry.instance;
  }
}
