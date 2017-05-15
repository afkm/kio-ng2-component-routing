import 'mocha'
import expect, { assert } from 'ceylon'

import { ComponentFixture, ComponentFragmentFixture,ComponentNodeFixture } from './'

import { 
  fromString
} from './from'

import { 
  KioCtnTxt, KioCtnSrc, KioCtnFragment,
  KioNodeType,
  KioChildContentType,
  nodeTypeByName
} from 'kio-ng2'

interface FixtureExpectation<T extends KioChildContentType> {
  type: T
  modifiers: string[]
  childTypes?: FixtureExpectation<KioChildContentType>[]
}

interface TestItem<T extends KioChildContentType> {
  source: string
  expect: FixtureExpectation<T>
}

function createFixtureAssertion <T extends KioChildContentType>( expectedType:T, expectedModifiers:string[], expectedChildTypes? ):FixtureExpectation<T> {
  return {
    type: expectedType ,
    modifiers: expectedModifiers,
    childTypes: expectedChildTypes
  }
}

function assertFixtureObject <T extends KioChildContentType,K extends keyof FixtureExpectation<T>&keyof ComponentFixture<T>>( fixture:ComponentFixture<T>, expectation:FixtureExpectation<T>, keypath:string='' ) {
  Object.keys(expectation).forEach ( (key:K) => {
    assertKey(key, fixture, expectation, keypath)
  } )
}

function assertKey <T extends KioChildContentType, K extends keyof FixtureExpectation<T>&keyof ComponentFixture<T>> ( key:K, fixture:ComponentFixture<T>, expectation:FixtureExpectation<T>, keypath:string='' ) {

  //describe(`${keypath}[${key}]`,()=>{

    if ( key === 'modifiers' )
    {
      it ( `${keypath}.${key} should be "${expectation[key]}"`, () => {
        expect(fixture.modifiers).toHaveLength(expectation.modifiers.length)
        expectation.modifiers.forEach(modifier=>{
          expect(fixture.modifiers).toContain(modifier)
        })    
      } )
    }
    else if ( key === 'childTypes' && fixture instanceof ComponentFragmentFixture )
    {
      expect(fixture.childTypes).toHaveLength(expectation.childTypes.length)
      expectation.childTypes.forEach((childType,idx)=>{
         assertFixtureObject(fixture.childTypes[idx],childType,keypath+`childType[${idx}]` )
      })     
    }
    else if ( key in fixture )
    {
      it ( `${keypath}.${key} should be "${expectation[key]}"`, () => {
        expect(fixture[key]).toEqual(expectation[key])
      })
    }
  //})
}

function assertFixture <T extends KioChildContentType>( description:string, fixtureAssertion:TestItem<T> ) {

  function assert <C extends KioChildContentType>( fixture:ComponentFixture<C>, expectation:FixtureExpectation<C> ) {

    it(`${description} type is "${expectation.type}"`,()=>{
      expect(fixture.type).toEqual(expectation.type)
    })

    it(`${description} modifiers is "${expectation.modifiers}"`,()=>{
      expect(fixture.modifiers).toEqual(expectation.modifiers)
    })

    if ( fixture instanceof ComponentFragmentFixture )
    {
      expectation.childTypes.forEach ( (childTypeExpectation,idx) => {
        const childFixture = fixture.childTypes[idx]
        assert ( childFixture, childTypeExpectation )
      } )
    }
  }

  return ( fixture:ComponentFixture<T> ) => {
    return assert ( fixture, fixtureAssertion.expect )
  }
}

const FIXTURES:TestItem<KioChildContentType>[] = [
  {
    source: 'src.img',
    expect: {
      type: KioNodeType.src,
      modifiers: ['img']
    }
  },
  {
    source: 'src',
    expect: {
      type: KioNodeType.src,
      modifiers: []
    }
  },
  {
    source: 'txt.headline',
    expect: {
      type: KioNodeType.txt,
      modifiers: ['headline']
    }
  },  
  {
    source: 'txt',
    expect: {
      type: KioNodeType.txt,
      modifiers: []
    }
  },
  {
    source: 'fragment.bigpic',
    expect: {
      type: KioNodeType.fragment,
      modifiers: ['bigpic'],
      childTypes: []
    }
  },
  {
    source: 'fragment',
    expect: {
      type: KioNodeType.fragment,
      modifiers: [],
      childTypes: []
    }
  },
  {
    source: 'src txt.description',
    expect: {
      type: KioNodeType.fragment,
      modifiers: [],
      childTypes: [
        {
          type: KioNodeType.src,
          modifiers: []
        },
        {
          type: KioNodeType.txt,
          modifiers: ['description']
        }
      ]
    }
  }
]


describe('testing component fixtures',()=>{

  describe('creating fixture from string',()=>{

    const fixture = 'txt.foo.bar'
    const fixture1 = 'src.img'
    const fixture2 = 'fragment.bigpic'
    const fragmentFixture = [fixture, fixture1, fixture2]
    const fixture3 = fragmentFixture.join(' ')

    it(`parses "${fixture}" to node fixture`,()=>{

      const componentFixture = fromString(fixture)
      expect(componentFixture).toBeA(ComponentNodeFixture)
      expect(componentFixture.type).toEqual(KioNodeType.txt)

    })

    it(`parses "${fixture1}" to node fixture`,()=>{

      const componentFixture = fromString(fixture1)
      expect(componentFixture).toBeA(ComponentNodeFixture)
      expect(componentFixture.type).toEqual(KioNodeType.src)

    })

    it(`parses "${fixture2}" to fragment fixture`,()=>{

      const componentFixture = fromString(fixture2)
      expect(componentFixture).toBeA(ComponentFragmentFixture)
      expect(componentFixture.type).toEqual(KioNodeType.fragment)

    })

    it(`parses "${fixture3}" to fragment fixture with childs`,()=>{

      const componentFixture = fromString(fixture3)
      expect(componentFixture).toBeA(ComponentFragmentFixture)
      expect(componentFixture.type).toEqual(KioNodeType.fragment)
      if ( componentFixture instanceof ComponentFragmentFixture )
      {
        expect(componentFixture.childTypes.length).toEqual(3)
        expect(componentFixture.childTypes[0]).toBeA(ComponentNodeFixture)
        expect(componentFixture.childTypes[1]).toBeA(ComponentNodeFixture)
        expect(componentFixture.childTypes[2]).toBeA(ComponentFragmentFixture)
      }

    })

  })

  describe('FIXTURES',()=>{

    FIXTURES.forEach ( fixtureTestItem => {

      describe(fixtureTestItem.source,()=>{

        //it('works',()=>{

          const fixture = fromString(fixtureTestItem.source)
          //console.log('\x1b[2m',fixture,'\x1b[0m')
          assertFixtureObject(fixture,fixtureTestItem.expect)

        //})

      })

    } )

  })

})