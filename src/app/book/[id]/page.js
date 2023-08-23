

import BookDetails from "@/Components/BookDetails"
export default function BookDetail({params}) {
  
  return (
    <>
    
    <BookDetails booktId={params.id}/>
    
    </>
  )
}

