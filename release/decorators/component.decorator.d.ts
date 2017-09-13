import { KioContentModel, KioFragmentModel } from 'kio-ng2-data';
import { DataComponent, FragmentDataComponent, ContentDataComponent } from '../components/base';
export declare type ConstructorOf<T> = {
    new (...args: any[]): T;
};
export declare type DataComponentType<T extends KioContentModel | KioFragmentModel> = {
    new (...args: any[]): DataComponent<T>;
};
export declare function RoutableComponent(annotation: any): <T1 extends ConstructorOf<FragmentDataComponent> | ConstructorOf<ContentDataComponent>>(instance: T1) => T1;
