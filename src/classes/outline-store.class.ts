import { KioPublicationModel, KioContentModel, KioFragmentModel, KioPublication, KioContent, KioNode, KioFragment } from 'kio-ng2-data'

export interface OutlineItem {
  selector: string
}

export type OutlineNode<T extends KioNode> = {
  node: T
  componentSelector: string
}

export interface NestedOutlineItem {
  selector: string
  cuid: string
  parent?: NestedOutlineItem
  children?: NestedOutlineItem[]
}

export function getRootNode ( node:KioContent|KioFragment|KioPublication ):KioPublication {

  if ( node.parent ) {
    return getRootNode (node.parent)
  } else {
    return node as KioPublication
  }

}

declare global {
  interface Window {
    outlineStores:OutlineStore[]
  }
}

window.outlineStores = []

export class OutlineStore {

  readonly items:NestedOutlineItem[]=[]

  constructor ( readonly publication:KioPublication ) {
    window.outlineStores.push ( this )
  }

  readonly rootItem:NestedOutlineItem = {
    cuid: this.publication.cuid,
    selector: 'root',
    children: []
  }

  getOutlineItemForNode<T extends KioNode>(node:T){

    return this.items.find ( item => item.cuid === node.cuid )

  }

  getParentOutlineItem <T extends KioNode> ( node:T ) {

    if ( !node.parent ) {

      if ( node.cuid !== this.rootItem.cuid ) {
        throw new Error(`Could not find parent item for node ${node.cuid}`)
      }

      return this.rootItem

    }

    let nextNode:KioNode = node.parent
    let parentOutlineItem:NestedOutlineItem

    while ( nextNode && !parentOutlineItem ) {
      parentOutlineItem = this.getOutlineItemForNode(nextNode)
      nextNode = nextNode.parent
    }

    return parentOutlineItem || this.rootItem

  }

  registerNode ( node:KioContentModel|KioFragmentModel, componentSelector:string ) {

    const rootNode = getRootNode (node)
    if ( rootNode.cuid === this.publication.cuid ) {
      let parent = this.getParentOutlineItem(node)
      let item = {
        parent,
        cuid: node.cuid,
        selector: componentSelector,
        children: []
      }
      parent.children.push(item)
      this.items.push(item)
    }

  }

  
  getNodeByCUID ( cuid:string ):NestedOutlineItem {

    return this.items.find ( node => node.cuid === cuid )

  }
/*
  getOutline() {

    function flattenNode <T extends KioContent|KioPublication> ( node:T ):KioContent[] {

      const nodes:KioContent[] = [ 
        node
      ]

      if ( node instanceof KioFragmentModel ) {
        node.children.forEach ( (child:KioContent) => {
          nodes.push ( ...flattenNode<KioContent>(child) )
        } )
      } 

      return nodes

    }

    const allNodes = flattenNode<KioPublication>(this.publication)
    const allNodesWithSelector = allNodes.filter ( n => this.getNodeByCUID(n.cuid) )
    const endpointNodes = allNodesWithSelector.filter ( n => {



    } )
    return allNodesWithSelector

  }
*/
}