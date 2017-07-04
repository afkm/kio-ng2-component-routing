import { ComponentFixture, ComponentAnnotation } from 'kio-ng2'

export interface KioComponentItem {
  fixture:ComponentFixture;
  criteria:ComponentAnnotation;
  componentName:string;
  component:any;
}

export interface ItemIterator {
  ( item:KioComponentItem, idx?:number, list?:KioComponentItem[] ):void
}

export interface ItemMapper {
  ( item:KioComponentItem, idx?:number, list?:KioComponentItem[] ):any
}

export interface ItemFilter {
  ( item:KioComponentItem, idx?:number, list?:KioComponentItem[] ):boolean
}

export interface IndexSymbol {
  componentName:string;
  symbol:any;
}
