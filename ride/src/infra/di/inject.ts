import { Registry } from "./registry";

export function inject(name: string) {
  return (target: any, property: string) => {
    target[property] = new Proxy(
      {},
      {
        get(_, property: string) {
          const dependency = Registry.getInstance().inject(name);
          return dependency[property];
        },
      }
    );
  };
}
