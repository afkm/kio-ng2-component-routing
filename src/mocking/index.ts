import { KioFragmentModel, KioContentModel, KioNode } from 'kio-ng2-data'

import { mockContent, mockContentFromString, mockContentWithArgs } from './content'
import { mockFragment } from './fragment'
import { cuid } from './cuid'
import { mockNodeOfType, mockType } from './node'
import { ContentMockingService } from './service/content-mocking.service'

export const Mocking = {
  mockContent, mockContentFromString, mockContentWithArgs,
  mockFragment,
  mockNodeOfType, mockType,
  cuid, ContentMockingService
}