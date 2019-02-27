interface ISelector<T> {
  find(...args: any): T
}

export const byDataHook = <T extends ISelector<T>>(wrapper: T, hook: string): ReturnType<T[keyof ISelector<T>]> =>
  wrapper.find(`[data-hook="${hook}"]`) as ReturnType<T[keyof ISelector<T>]>;


