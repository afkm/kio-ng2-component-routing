import { ComponentFixture, QueryableAnnotation } from '../query/interfaces'

export interface KioComponentItem {
  fixture:ComponentFixture;
  criteria:QueryableAnnotation;
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
