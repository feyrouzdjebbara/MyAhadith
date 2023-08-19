
import { Suspense } from "react"
import BookDetails from "@/Components/BookDetails"
export default async function BookDetail({params}) {
  const loadingjsx = (
    <div className="bg-yellow-50  flex items-center justify-center h-screen">
      <h1 className="text-bold">...تحميل</h1>
    </div>
  );
  return (
    <>
    <Suspense fallback={loadingjsx}>
    <BookDetails booktId={params.id}/>
    </Suspense>
    </>
  )
}

