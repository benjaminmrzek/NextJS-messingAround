// import the Request and Response classes
import { NextResponse, NextRequest } from "next/server";
import mysql from 'mysql2/promise';
import { GetDBSettings } from "@/app/shared/common";

// populate the connection parameters
let connectionParams = GetDBSettings();

// define and export the GET handler function
export async function GET(request: NextRequest) {
    
    try {
        // connect to database
        const connection = await mysql.createConnection(connectionParams);

        // query params
        const includesQuery = '%' + request.nextUrl!.searchParams!.get('includes') + '%';
        
        // create a query to fetch data
        let get_exp_query = "";
        get_exp_query = 'select * from `nextJS-DB`.`content_table` where content like ?';

        // pass params into the query (the '?' is the param)
        let values: any[] = [ includesQuery ];     
        
        // run query and get results
        const [ results, fields ] = await connection.execute(get_exp_query, values);

        // close connection at the end
        connection.end();

        // return the results from the API as JSON
        return NextResponse.json({fields: fields.map((f) => f.name), results});
    } catch (err) {
        console.log('Error from api: ', (err as Error).message);
        
        const response = {
            error: (err as Error).message,
            returnedStatus: 200,
        }
        
        return NextResponse.json(response, { status: 200 });
    }
}