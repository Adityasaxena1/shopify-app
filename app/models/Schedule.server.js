import prisma from "../db.server";

export default async function putData(value) {
  await prisma.schedule.create({
    data: value,
  });
 

export async function getAllData() {
  const data = await prisma.schedule.findMany();
  return data;
}




export async function removeData(dateId) {
  await prisma.schedule.delete({
    where: {
      id: Number(dateId),
    },
  });
}
