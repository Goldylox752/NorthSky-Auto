import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";


export async function PATCH(request) {

  try {

    const {
      id,
      status
    } = await request.json();


    const { data, error } = await supabase
      .from("dealers")
      .update({
        status,
      })
      .eq("id", id)
      .select();


    if (error) {

      return NextResponse.json(
        {
          error: error.message
        },
        {
          status: 400
        }
      );

    }


    return NextResponse.json({
      success: true,
      dealer: data,
    });


  } catch(error) {

    return NextResponse.json(
      {
        error: "Server error"
      },
      {
        status: 500
      }
    );

  }

}