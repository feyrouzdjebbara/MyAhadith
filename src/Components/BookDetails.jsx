"use client"

import { useState, useEffect } from 'react';

export default async function BookDetails({booktId}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredHadiths, setFilteredHadiths] = useState([]);
  const [noResults, setNoResults] = useState(false);
  function removeDiacritics(text) {
    return text.replace(/[\u064B-\u065F\u0670\u0674]/g, '');
     // Regular expression to match diacritics
}


  useEffect(() => {
      // Fetch data and set hadiths and filteredHadiths
      async function fetchData() {
          const response = await fetch(
              `https://api.hadith.gading.dev/books/${booktId}?range=1-300`,
              {
                  next: {
                      revalidate: 120 // ISR reload every 2 min
                  }
              }
          );
          const book = await response.json();
          const hadiths = book.data.hadiths;
          setFilteredHadiths(hadiths);
      }

      fetchData();
  }, [booktId]);

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
        setFilteredHadiths(hadiths);
        setNoResults(false);
    } else {
        const searchTermWithoutDiacritics = removeDiacritics(searchTerm);
        const filtered = filteredHadiths.filter((hadith) =>
            removeDiacritics(hadith.arab).includes(searchTermWithoutDiacritics)
        );
        setFilteredHadiths(filtered);
        setNoResults(filtered.length === 0);
    }
};


  return (
    <div className="bg-yellow-50 ">
  
    <div className="text-right p-6">
   
          <h2 className="text-[18px] leading-[18px] font-bold capitalize rtl">   ({booktId} Ahadith list) قائمة أحاديث  {translateBookName(booktId)}</h2>
  </div>

  <div className="mt-4 flex justify-center items-center">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="حديث"
                    className="focus:border-green-700 border-2 outline-none border-gray-300 rounded-full p-2"
                />
                <button
                    onClick={handleSearch}
                    className="ml-2 px-4 py-2 bg-green-700 text-white  rounded-full "
                >
                   <img src="/search.svg" alt="Search" className="w-6 h-6 " />
                </button>
            </div>


    <div className="flex flex-col p-6 justify-center items-start text-black-100 bg-primary-blue-100 hover:shadow-md rounded-3xl"> 
     
     <div className="w-full flex justify-between items-start gap-2">
    
    <div>
    {filteredHadiths.map((hadith) => (
                            <div className=" bg-white hover:bg-white hover:shadow-md rounded-3xl shadow-md ring-2 ring-green-700 focus:outline-none sm:text-sm">
                               
                            <p className="text-right mt-6 text-[14px] p-3">
                                    {hadith.arab} <br/>
                                </p>
                                <p className=" text-center flex text-[14px] p-4 mt-0">
                                
                                    {hadith.number} <br/>
                                </p>
                            </div>
                        ))}
      
       </div>
       
     </div>
     
    
     
   </div>
   {noResults && (
    <div className="flex items-center justify-center h-screen">
    <p className="text-bold">لا يوجد أحاديث تطابق البحث</p>
    </div>
)}
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