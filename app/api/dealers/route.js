import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";


export async function POST(request) {

  try {

    const body = await request.json();


    const {
      company,
      contact,
      email,
      phone,
      website,
      location,
      province,
      inventory,
      brands,
    } = body;



    const { data, error } = await supabase
      .from("dealers")
      .insert([
        {
          company,
          contact,
          email,
          phone,
          website,
          location,
          province,
          inventory,
          brands,
        }
      ])
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
      dealer: data

    });



  } catch(error) {


    return NextResponse.json(
      {
        error: "Server error"
      },
      {
        status:500
      }
    );


  }

}