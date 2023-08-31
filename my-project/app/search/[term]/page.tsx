import { SearchParams } from '@/app/typings'
import { redirect } from 'next/navigation'
import React from 'react'
type Props = {
  searchParams:SearchParams
  params:{
    term:string,

  }
}
 const SearchPage = ({searchParams,params:{term}}:Props) => {
 if(!term){
  redirect('/')
 }

 //   fetch from API
   

  return (
    <div>Welcome to search results PAGE</div>
  )
}
export default SearchPage