import { json } from "@remix-run/node";
import prisma from "../db.server";
import { cors } from "remix-utils/cors";


export async function loader({request}) {
    const scheduleData = await prisma.schedule.findMany();
    const response = json({
        data: scheduleData,
    });
    return cors(request, response);
}



