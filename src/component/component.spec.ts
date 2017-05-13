import 'mocha'
import expect, { assert } from 'ceylon'

import { KioContentComponentStructure, KioFragmentComponentStructure } from './'

import { 
  isListQuery, parseListQuery, fromString, fromObject,
  isQueryableFragmentAnnotation, isQueryableAnnotation
} from './from'

import { 
  KioCtnTxt, KioCtnSrc, KioCtnFragment,
  nodeTypeByName
} from 'kio-ng2'



const fixtureSrc = {
  type: KioCtnSrc,
  modifiers: ['img']
}

const fixtureTxt = {
  type: 'txt',
  modifiers: ['headline']
}

const fixtureFragment = {
  type: 'fragment',
  modifiers: ['bigpic'],
  childTypes: [ 'txt', 'src' ]
}

describe('test component spec',()=>{

  describe('type checking',()=>{

    describe('ListQuery',()=>{

      it('identifies ListQuery by prop "length:number"',()=>{
        expect(isListQuery({length: 1})).toBeTrue()
      })

      it('does not identify ListQuery by prop "length:string"',()=>{
        expect(isListQuery({length: "1"})).toBeFalse()
      })

      it('identifies ListQuery by prop "contains"',()=>{
        expect(isListQuery({contains: ['foo']})).toBeTrue()
        expect(isListQuery({contains: 'foo'})).toBeTrue()
      })

      it('identifies ListQuery by prop "containsNot"',()=>{
        expect(isListQuery({containsNot: ['foo']})).toBeTrue()
        expect(isListQuery({containsNot: 'foo'})).toBeTrue()
      })

      it('identifies ListQuery by prop "all"',()=>{
        expect(isListQuery({all: ['foo']})).toBeTrue()
        expect(isListQuery({all: 'foo'})).toBeTrue()
      })

      it('identifies ListQuery by prop "deepEqual"',()=>{
        expect(isListQuery({deepEqual: ['foo']})).toBeTrue()
        expect(isListQuery({deepEqual: 'foo'})).toBeTrue()
      })


    })

    describe('QueryableAnnotation',()=>{

      it(`identifies ${JSON.stringify(fixtureSrc)}`,()=>{
        expect(isQueryableAnnotation(fixtureSrc)).toBeTrue()
      })

      it(`identifies ${JSON.stringify(fixtureTxt)}`,()=>{
        expect(isQueryableAnnotation(fixtureTxt)).toBeTrue()
      })

      it(`identifies ${JSON.stringify(fixtureFragment)}`,()=>{
        expect(isQueryableAnnotation(fixtureFragment)).toBeTrue()
      })

    })

    describe('QueryableFragmentAnnotation',()=>{

      it(`does not identify ${JSON.stringify(fixtureSrc)}`,()=>{
        expect(isQueryableFragmentAnnotation(fixtureSrc)).toBeFalse()
      })

      it(`does not identify ${JSON.stringify(fixtureTxt)}`,()=>{
        expect(isQueryableFragmentAnnotation(fixtureTxt)).toBeFalse()
      })

      it(`identifies ${JSON.stringify(fixtureFragment)}`,()=>{
        expect(isQueryableFragmentAnnotation(fixtureFragment)).toBeTrue()
      })

    })

  })

  describe('from object data',()=>{

    describe('txt',()=>{

      expect(fromObject<KioCtnTxt>({
        name: 'TestTxt',
        ...fixtureTxt
      }))

    })


  })

})