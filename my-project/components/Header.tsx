"use client";
import Image from "next/image";
import Link from "next/link";
import {MagnifyingGlassIcon} from "@heroicons/react/24/solid"
import { SearchButton } from "./SearchButton";
import { SearchSelect,SearchSelectItem,Select,SelectItem } from "@tremor/react";
import Avatar from "react-avatar";
import { useState } from "react";
import { useRouter } from "next/navigation";
export const Header = () => {
    const [pages,setPages]=useState<String>('')
    const [sortBy,setSortBy] = useState<String>('')
    const [minPrice,setMinPrice] = useState<String>('')
    const [maxPrice,setMaxPrice]=useState<String>('')
    const router = useRouter();

    console.log(pages,sortBy,minPrice,maxPrice)
const SORT_BY_MAP = {
    r:'Default',
    rv:"By Review",
    p:"By Price (low to high)",
    pd:"By Price ( high to low )"
}

  return (
    <header className="flex flex-col items-center md:flex-row md:items-start md:space-x-6 px-2 py-10 pb-5 md:p-10 md:pb-5">
      <Link href="/">
        <Image
          src="https://links.papareact.com/208"
          alt="logo"
          width={150}
          height={150}
          className="object-contain mr-10"
        />
      </Link>
      <div className="w-full md:max-w-2xl">
        <form action={(formData)=>{
            const searchTerm = formData.get('searchTerm')
            console.log(searchTerm)
            if(!formData.get('searchTerm')) return
            
            const params = new URLSearchParams()

            if(pages) params.set('pages',pages.toString())

            if(sortBy) params.set('sortBy',sortBy.toString())

            if(minPrice) params.set('min_price',minPrice.toString())

            if(maxPrice) params.set('max_price',maxPrice.toString())

           

           router.push(`/search/${searchTerm}?${params.toString()}`)

        }}>
            <div className="flex items-center gap-2 w-full px-4">
                <div className="flex items-center space-x-2 bg-white shadow-xl rounded-full border-0 px-6 py-4  flex-1">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                    <input className="outline-none flex-1" placeholder="Search..." name="searchTerm"/>
                </div>
                <SearchButton/>
            </div>
            <div className="grid grid-cols-2 gap-2 p-4 md:grid-cols-4 max-w-lg md:max-w-none mx-auto item-center">
                <SearchSelect className="min-w-4" placeholder="# of pages
                "
                onValueChange={value=>setPages(value)}
                >
                    {
                        [...Array(100)].map((_,i)=>(
                            <SearchSelectItem key={i} value={(i+1).toString()}>
                                {(i+1).toString()} pages
                            </SearchSelectItem>
                        ))
                    }
                </SearchSelect>
                <Select className="min-w-4" placeholder="Sort" onValueChange={value=>setSortBy(value)}>
                    {
                        Object.entries(SORT_BY_MAP).map(([key,value])=>(
                            <SelectItem key={key} value={key}>
                                {value}
                            </SelectItem>
                        ))
                    }
                </Select>
                <SearchSelect placeholder="Min price"
                onValueChange={value=>setMinPrice(value)}
                >
                    {
                        ['','100','250','500','750','900','1000+'].map((_,i)=>(
                            <SearchSelectItem key={i} value={_.toString()}>
                                {i===0?"No Minimum":`${_.toString()}`}
                            </SearchSelectItem>
                        ))
                    }
                </SearchSelect>
                <SearchSelect placeholder="Max price"
                onValueChange={value=>setMaxPrice(value)}
                >
                    {
                        ['','100','250','500','750','900','1000+'].map((_,i)=>(
                            <SearchSelectItem key={i} value={_.toString()}>
                                {i===0?"No Minimum":`${_.toString()}`}
                            </SearchSelectItem>
                        ))
                    }
                </SearchSelect>
            </div>
        </form>
      </div>
      <div className="cursor-pointer hidden lg:flex flex-1 justify-end">
        <Avatar name="Rainaz" round size="50" />
      </div>
    </header>
  );
};
