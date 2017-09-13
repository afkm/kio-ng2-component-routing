import { ContentResolver } from './content.resolver';
export function contentResolverFactory(contentModel, parentResolver) {
    return new ContentResolver(contentModel, parentResolver);
}
//# sourceMappingURL=content.factory.js.map