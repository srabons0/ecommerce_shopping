import CollectionBody from '@/features/collection/CollectionBody';
import CollectionIndex from '@/features/collection/CollectionIndex';
import CollectionNews from '@/features/collection/CollectionNews';
import CollectionsHeader from '@/features/collection/CollectionsHeader';
import CollectionShowcase from '@/features/collection/CollectionShowcase';
import React from 'react'

function page() {
  return (
    <div>
      {/* <CollectionsHeader></CollectionsHeader> */}
      <CollectionIndex></CollectionIndex>
      <CollectionBody></CollectionBody>
      {/* <CollectionShowcase></CollectionShowcase> */}
      <CollectionNews></CollectionNews>
    </div>
  );
}

export default page
