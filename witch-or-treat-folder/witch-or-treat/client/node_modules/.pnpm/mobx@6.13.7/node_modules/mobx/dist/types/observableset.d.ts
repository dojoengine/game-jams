import { $mobx, IEnhancer, IListenable, Lambda, IInterceptable, IInterceptor, IAtom } from "../internal";
export type IObservableSetInitialValues<T> = Set<T> | readonly T[];
export type ISetDidChange<T = any> = {
    object: ObservableSet<T>;
    observableKind: "set";
    debugObjectName: string;
    type: "add";
    newValue: T;
} | {
    object: ObservableSet<T>;
    observableKind: "set";
    debugObjectName: string;
    type: "delete";
    oldValue: T;
};
export type ISetWillDeleteChange<T = any> = {
    type: "delete";
    object: ObservableSet<T>;
    oldValue: T;
};
export type ISetWillAddChange<T = any> = {
    type: "add";
    object: ObservableSet<T>;
    newValue: T;
};
export type ISetWillChange<T = any> = ISetWillDeleteChange<T> | ISetWillAddChange<T>;
export declare class ObservableSet<T = any> implements Set<T>, IInterceptable<ISetWillChange>, IListenable {
    name_: string;
    [$mobx]: {};
    private data_;
    atom_: IAtom;
    changeListeners_: any;
    interceptors_: any;
    dehancer: any;
    enhancer_: (newV: any, oldV: any | undefined) => any;
    constructor(initialData?: IObservableSetInitialValues<T>, enhancer?: IEnhancer<T>, name_?: string);
    private dehanceValue_;
    clear(): void;
    forEach(callbackFn: (value: T, value2: T, set: Set<T>) => void, thisArg?: any): void;
    get size(): number;
    add(value: T): this;
    delete(value: T): boolean;
    has(value: T): boolean;
    entries(): SetIterator<[T, T]>;
    keys(): SetIterator<T>;
    values(): SetIterator<T>;
    intersection<U>(otherSet: ReadonlySetLike<U> | Set<U>): Set<T & U>;
    union<U>(otherSet: ReadonlySetLike<U> | Set<U>): Set<T | U>;
    difference<U>(otherSet: ReadonlySetLike<U>): Set<T>;
    symmetricDifference<U>(otherSet: ReadonlySetLike<U> | Set<U>): Set<T | U>;
    isSubsetOf(otherSet: ReadonlySetLike<unknown>): boolean;
    isSupersetOf(otherSet: ReadonlySetLike<unknown>): boolean;
    isDisjointFrom(otherSet: ReadonlySetLike<unknown> | Set<unknown>): boolean;
    replace(other: ObservableSet<T> | IObservableSetInitialValues<T>): ObservableSet<T>;
    observe_(listener: (changes: ISetDidChange<T>) => void, fireImmediately?: boolean): Lambda;
    intercept_(handler: IInterceptor<ISetWillChange<T>>): Lambda;
    toJSON(): T[];
    toString(): string;
    [Symbol.iterator](): SetIterator<T>;
    get [Symbol.toStringTag](): string;
}
export declare var isObservableSet: (thing: any) => thing is ObservableSet<any>;
