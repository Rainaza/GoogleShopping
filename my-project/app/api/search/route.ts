import { SearchParams } from "@/app/typings";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  const { searchTerm, pages, ...params } = await request.json();
  const searchParams: SearchParams = params;

  if (!searchTerm) {
    return NextResponse.next(
      new Response("Missing search term", {
        status: 400,
      })
    );
  }
  const filters: any = [];

  Object.entries(searchParams).forEach(([key, value]) => {
    if (value) {
      if (key == "max_price") {
        if ((value = "1000+")) return;
      }
      filters.push({ key, value: key === "sort_by" ? value : Number(value) });
    }
  });

  const username = process.env.OXYLABS_USERNAME;
  const password = process.env.OXYLABS_PASSWORD;
  const body = {
    source: "google_shopping_product",
    domain: "com",
    query: "5007040952399054528",
  };
  const response = await fetch("https://realtime.oxylabs.io/v1/queries", {
    method: "post",
   
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Basic " + Buffer.from(`${username}:${password}`).toString("base64"),
    },
    cache: 'no-store',
    body: JSON.stringify({
        domain:'com',
        pages:Number(pages) || 1,
        parse:true,
        context:filters,
    }),
  });
  const data = await response.json()
  console.log(data)
  const pageResults:PageResult[] = data.result;

  return NextResponse.json(pageResults)
}
