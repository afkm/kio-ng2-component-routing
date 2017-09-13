import { KioFragmentModel, KioPublicationModel, KioContentModel } from 'kio-ng2-data';
import { DataComponent } from '../base';
export declare class ListComponentRouter extends DataComponent<KioFragmentModel | KioPublicationModel> {
    private componentFactoryResolver;
    protected node: KioFragmentModel | KioPublicationModel;
    childNodes: (KioContentModel | KioFragmentModel)[];
    protected onNodeUpdate(): void;
    protected applyChildNodes(): void;
}
