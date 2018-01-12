import { Component, OnInit, OnDestroy, OnChanges, AfterViewInit, AfterContentInit } from '@angular/core'
import { KioContentModel, KioContentState } from 'kio-ng2-data'
import { BackendService } from 'kio-ng2-ctn'
import { ContentDataComponent } from './content-data.component'

export class TextDataComponent extends ContentDataComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit, AfterContentInit {

  text:string

  data:{
    text:string
  }

  protected onUpdate(){
    this.text = this.data.text
    super.onUpdate()
  }

  // override ContentDataComponent::loadNodeContent() to use text from publication structure
  protected loadNodeContent ( ) {
    
    const typeUnsecureNode:any = this.node // TODO: Refactor KioContentModel to represent text property
    if ( typeUnsecureNode.text ) {
      this.onBeforeLoad()
      this.text = typeUnsecureNode.text
      this.setData ( {
        text: typeUnsecureNode.text
      } )
      this.onAfterLoad()
    } else {
      super.loadNodeContent()
    }
    
    
  }  

}