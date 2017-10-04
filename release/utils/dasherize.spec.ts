import 'mocha'
import { expect } from 'chai'

import { dasherize } from './dasherize'


function assertString ( source:string, expectation:string ) {

  it ( `"${source}" should be dasherized to "${expectation}".`, () => {

    expect(dasherize(source)).to.equal(expectation)

  } )

}

describe(`Test dasherize`,function(){
  
  assertString ( 'HelloWorld', 'hello-world' )
  assertString ( 'BBCNews', 'bbc-news' )
  assertString ( 'oneTwo', 'one-two')
  assertString ( 'CONSTX', 'constx')
  assertString ( 'TestOne', 'test-one')
  assertString ( 'inCIA', 'in-cia')
  assertString ( 'isMLBAllStar', 'is-mlb-all-star')


})

