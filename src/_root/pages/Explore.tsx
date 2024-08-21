import { useEffect, useState } from "react"
import { Input } from "../../components/ui/input"
import SearchResults from "../../components/ui/shared/SearchResults";
import GridPostList from "../../components/ui/shared/GridPostList";
import { useGetPost, useSearchPost } from "../../lib/react-query/queriesAndMutations";
import useDebounce from "../../hooks/useDebounce";
import Loader from "../../components/ui/shared/Loader";
import { useInView } from "react-intersection-observer";

const Explore = () => {
  const [searchValue,setSearchValue]= useState("");
  const debouncedValue= useDebounce(searchValue,500);

  const {data:posts,fetchNextPage,hasNextPage,}= useGetPost()
  const {data:searchedPosts,isFetching:isSearchFetching}= useSearchPost(debouncedValue)

  const {ref,inView}= useInView()

  useEffect(()=>{

    if(inView && !searchValue) fetchNextPage();
  },[inView,searchValue])
  
  if(!posts){
    return (
      <div className=" flex-center w-full h-full">
        <Loader/>
      </div>
    )
  }
  
  const shouldShowSearchResults= searchValue !== "";
  const shouldShowPosts= !shouldShowSearchResults && posts.pages.every(
    (item)=>item.documents.length ===0)
  return (
    <div className="  flex flex-col flex-1 items-center overflow-scroll py-10 px-5 md:p-14 custom-scrollbar">
      <div className=" max-w-5xl flex flex-col items-center w-full gap-6 md:gap-9">
        <h2 className=" h3-bold md:h2-bold w-full">Search Posts</h2>

        <div className=" flex gap-1 px-4 w-full rounded-lg bg-dark-4">
          <img 
           src="/assets/icons/search.svg"
           width={24}
           height={24} 
           alt="search" />
           <Input 
             type="text"
             placeholder="search"
             className=" h-12 bg-dark-4 border-none placeholder:text-light-4 focus-visible:ring-0 focus-visible:ring-offset-0 ring-offset-0"
             value={searchValue}
             onChange={(e)=>setSearchValue(e.target.value)}
             
           />
        </div>
      </div>

      <div className=" flex-between w-full max-w-5xl mt-16 mb-7">
        <h3 className=" body-bold md:h3-bold">Popular Today</h3>
        <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
          <p className="small-medium lg:base-medium text-light-2">All</p>
          <img 
            src="/assets/icons/filter.svg" 
            alt="filter"
            height={20}
            width={20} />
        </div>
      </div>

      <div className=" flex flex-wrap gap-9 w-full max-w-5xl">
       {shouldShowSearchResults ? 
      <SearchResults
       isSearchFetching={isSearchFetching}
       searchedPosts={searchedPosts}
      />: shouldShowPosts ?(
        <p className=" text-light-4 mt-10 text-center w-full">End Of Posts</p>
      ) :(
        posts.pages.map((item,index)=>(
          <GridPostList key={`page-${index}`} posts={item.documents}/>
        ))
      )
      }
      </div>

    {hasNextPage && !searchValue && (
      <div ref={ref} className=" mt-10">

        <Loader />
      </div>
    )}
    </div>
  )
}

export default Explore