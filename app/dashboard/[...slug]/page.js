import React from 'react'

async function page({params}) {

const diParams = await params;

  return (
    <div>
{decodeURIComponent(diParams.slug)}
    </div>
  )
}

export default page
