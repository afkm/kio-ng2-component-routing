import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/mergeMap'
import { 
  Input, Component, SimpleChanges, SimpleChange, OnInit, OnDestroy, OnChanges,
  QueryList,
  ElementRef,
  ComponentRef,
  TemplateRef,
  ContentChildren, ViewContainerRef, ViewChildren 
} from '@angular/core'
import { KioContentModel, KioFragmentModel, KioContentState } from 'kio-ng2-data'
import { DataComponent } from './data.component'
import { DataDirective } from 'kio-ng2-ctn'
import { ContentLoaderDirective } from '../../directives/content-loader.directive'
import { isData } from '../../typechecks'
import { ComponentData } from '../../types/component-data'

import { Data, Node, Collection, Stateful } from '../../interfaces/data-component'
import { ComponentState } from '../../enums/component-state.enum'
import { ContentDataComponent } from './content-data.component'


@Component({
  moduleId: module.id,
  template: ''
})
export class FragmentDataComponent extends DataComponent<KioFragmentModel> {

  protected node:KioFragmentModel

  @ViewChildren(ContentLoaderDirective,{
    read: ViewContainerRef
  }) childComponents:QueryList<ViewContainerRef>

  protected childElements:Observable<Node<ComponentData>[]>=this.contentResolver.childComponents
  .map ( childs => {
    return childs.filter ( child => {
      return child !== this
    } )
  } )

  protected childElementsLoaded:Observable<DataComponent<ComponentData>>=this.childElements
  .flatMap ( childComponents => {
    this.log('wait for %s child components to load', childComponents.length, childComponents)
    return Observable.of(...childComponents).mergeMap ( childComponent => childComponent.componentState.map ( state => [childComponent,state.currentValue] ) )
  } )
  .filter ( ([component,state]) => state >= ComponentState.loaded )
  .map ( ([component,state]) => component )
  
  ngAfterViewInit(){
    super.ngAfterViewInit()

    if ( this.contentResolver ) {
      this.contentResolver.componentStates.subscribe ( ([comp,state]) => {
        const debug_id = ('debug_id' in (<any>comp)) ? comp['debug_id'] : ''
        this.log('component state update "%s" on %s', ComponentState[state], comp.constructor.name, debug_id )
      } )
    } else {
      this.log('has no content resolver')
    }

    this.childElements.subscribe ( el => {
      this.log('el',el)
    } )
  }

  protected onChildDataComponentLoaded <T extends ComponentData>( childComponent:Node<T> ) {

  }

  //private 

  private _childDataComponentStates=this.childElements.flatMap ( childComponents => {
    return childComponents.filter ( <T extends ComponentData>(childComponent:DataComponent<T>) => {
      return isData<T>(childComponent)
    } )
  } )
  .flatMap ( childComponent => this.contentResolver.componentStates.filter ( ([component,state]) => component === childComponent ) )

  private _childContentStates=this.childElementsLoaded
    .subscribe ( childComponent => {
      this.log('loaded child component', childComponent)
    }, error => {
      console.error(error)
    }, () => {
      this.log('Loaded all child components!')
    } )


  
}