"use client"

import { useState, useEffect } from 'react';
export default function BookDetails({ booktId }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredHadiths, setFilteredHadiths] = useState([]);
  const [searchedHadiths, setSearchedHadiths] = useState([]); // Separate state for searchedHadiths
  const [noResults, setNoResults] = useState(false);

  function removeDiacritics(text) {
    return text.replace(/[\u064B-\u065F\u0670\u0674]/g, '');
    // Regular expression to match diacritics
  }

  useEffect(() => {
    // Fetch data and set hadiths and searchedHadiths
    async function fetchData() {
      try {
        const response = await fetch(
          `https://api.hadith.gading.dev/books/${booktId}?range=1-300`,
          {
            next: {
              revalidate: 300 // ISR reload every 2 min
            }
          }
        );
        const book = await response.json();
        const hadiths = book.data.hadiths;
        setFilteredHadiths(hadiths);
        setSearchedHadiths(hadiths); // Set searchedHadiths here
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [booktId]);

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setFilteredHadiths(searchedHadiths); // Restore all hadiths
      setNoResults(false);
    } else {
      const searchTermWithoutDiacritics = removeDiacritics(searchTerm);
      const filtered = searchedHadiths.filter((hadith) =>
        removeDiacritics(hadith.arab).includes(searchTermWithoutDiacritics)
      );
      setFilteredHadiths(filtered);
      setNoResults(filtered.length === 0);
    }
  };

const handleChange =(e)=>{
  setSearchTerm(e.target.value)
  
}


  return (
    <div className="bg-yellow-50 ">
  
    <div className="text-right p-6">
   
          <h2 className="text-[18px] leading-[18px] font-bold capitalize rtl">   ({booktId} Ahadith list) قائمة أحاديث  {translateBookName(booktId)}</h2>
  </div>

  <div class="input-container">
  <input
    type="text"
    value={searchTerm}
    onChange={handleChange}
    placeholder="حديث"
   class="custom-input"
  />
  <button
    onClick={handleSearch}
   class="custom-button"
  >
    <img src="/search.svg" alt="Search" class="search-icon" />
  </button>
</div>


            <div className="mt-6 space-y-4 p-8">
        {filteredHadiths.map((hadith) => (
          <div
            key={hadith.number}
          className="my-custom-style">
            <p className="text-right text-[14px]">{hadith.arab}</p>
            <p className="text-center text-[14px]">{hadith.number}</p>
          </div>
        ))}
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
