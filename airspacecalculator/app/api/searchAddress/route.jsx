import axios from "axios";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(request) {
  revalidatePath(request.url);

  try {
    const uri = request.headers.get("uri");
    const skyTradeApiUrl = `${process.env.NEXT_PUBLIC_API_URL}`;

    const apiData = await axios.get(skyTradeApiUrl, {
      headers: {
        "Content-Type": "application/json",
        uri,
        api_key: "XXX",
      },
    });
    return NextResponse.json(
      {},
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error },
      {
        status: 500,
      }
    );
  }
}
