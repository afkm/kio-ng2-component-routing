import 'mocha'
import expect from 'ceylon'
import * as assert from './'

const wrapVal = ( val ) => {
  if ( 'string' === typeof val )
    return `'${val}'`
  return JSON.stringify(val)
}

const testMatcher = ( name:string , query:any , value:any, result:boolean=true ) : void => {
  const matcher = assert [ name ]
  it(`${wrapVal(value)} [${name}] ${wrapVal(query)} to be ${result}`,()=>{
    expect(matcher(query)(value)).toBe(result)
  })
}

describe('test assertion',()=>{
  
  describe('eq',()=>{
    testMatcher('eq','5','5')
    testMatcher('eq','5','4',false)
    testMatcher('eq','5',5,false)
  })

  describe('gt', ()=>{
    testMatcher('gt',3,5)
    testMatcher('gt',4,3,false)
    testMatcher('gt',5,10)
    testMatcher('gt',5,3,false)
  })

  describe('lte', ()=>{
    testMatcher('lt',5,3)
    testMatcher('lt',3,4,false)
    testMatcher('lt',10,5)
    testMatcher('lt',3,5,false)
  })

  describe('list', () => {

    describe('all', () => {
      testMatcher('all','foo',['foo','foo','foo'])
      testMatcher('all','foo',['foo','foo','foo','bar'],false)      
    })

    describe('contains', () => {
      testMatcher('contains','foo',['bar','foo'])
      testMatcher('contains',['foo','bar'],['bar','foo'])
      testMatcher('contains',['foo'],['bar','foo'])
      testMatcher('contains','boo',['bar','foo'],false)
      testMatcher('contains',['boo'],['bar','foo'],false)
    })

    describe('containsNot', () => {
      testMatcher('containsNot','boo',['bar','foo'])
      testMatcher('containsNot','foo',['bar','foo'],false)
    })

    describe('either', () => {
      testMatcher('either',['bar'],['bar','foo'])
      testMatcher('either',['foo'],['bar','foo'])
      testMatcher('either',['boo'],['bar','foo'],false)
    })
  })

  describe ( 'list query' , () => {

    testMatcher('query',{
      length: 1
    },[42])

    testMatcher('query',{
      length: 3
    },[42],false)

    testMatcher('query',{
      length: assert.lt(3)
    },[42])
  } )
})