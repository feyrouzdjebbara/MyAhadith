import Image from 'next/image'
import Link from 'next/link'

export default async function Home() {
   
  await new Promise((resolve) => {
    setTimeout(()=>{
        resolve()
    },2000)
   })
    const response = await fetch(
        'https://api.hadith.gading.dev/books',
        {
           next :{
            revalidate:120 //ISR reload every 2 min 
           }
        }
    )

    const data =await  response.json()
    //  console.log(Ahadith.hadiths)
     const hadith=""
      const books = data.data;
  return (
    <div className="bg-yellow-50 text-right p-6 ">
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {books.map(book => (
            <li key={book.id}>
                <Link href={`/book/${book.id}`}>
                    
                        <button className=" bg-white border-2 border-green-700 block text-right  flex-col p-6 justify-center items-start text-black-100 bg-primary-blue-100 hover:bg-green-700 hover:text-white hover:shadow-md shadow-green-600 rounded-3xl w-full">
                            
                            <p className="m-3 text-[18px] font-bold capitalize rtl">({book.name}) {translateBookName(book.id)}</p>
                            
                            <p className="m-3 text-[15px] font-semibold capitalize rtl">  {hadith}({book.available}) عدد الأحاديث  </p>
                            
                        </button>
                    
                </Link>
            </li>
        ))}
    </ul>
</div>


  )
}
const bookNameTranslations = {
  "bukhari": "صحيح البخاري",
  "ahmad": "مسند أحمد",
  "ibnu-majah": "سنن ابن ماجه",
  "muslim": "صحيح مسلم",
  "abu-daud": "سنن أبي داود",
  "tirmidzi": "جامع الترمذي",
  "nasai": "سنن النسائي",
  "darimi": "سنن الدارمي",
  "malik":"مُوَطَّأُ الْإِمَامِ مَالِك"
  
};

function translateBookName(booktId) {
  return bookNameTranslations[booktId] || booktId;
}