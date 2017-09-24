import { 
  Component, ComponentFactoryResolver, Input, ViewEncapsulation,
  OnChanges, SimpleChanges, SimpleChange
} from '@angular/core';
import { KioFragmentModel, KioPublicationModel, KioContentModel } from 'kio-ng2-data'
import { DataComponent, FragmentDataComponent, ContentDataComponent } from '../base'

@Component({
  moduleId: module.id,
  selector: 'list-component-router',
  templateUrl: './list-router.component.html'
})
export class ListComponentRouter extends DataComponent<KioFragmentModel|KioPublicationModel> {

  private componentFactoryResolver:ComponentFactoryResolver=this.injector.get(ComponentFactoryResolver)
  
  protected node:KioFragmentModel|KioPublicationModel

  childNodes:(KioContentModel|KioFragmentModel)[]=[]

  protected onNodeUpdate(){
    this.applyChildNodes()
    super.onNodeUpdate()
  }

  protected applyChildNodes(){
    if ( this.node instanceof KioPublicationModel ) {
      this.childNodes = this.node.content
    } else {
      this.childNodes = this.node.children
    }
  }

}
