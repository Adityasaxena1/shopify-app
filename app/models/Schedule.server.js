import prisma from "../db.server";

export default async function putData(value, admin) {
  await prisma.schedule.create({
    data: value,
  });
  await createMetaField(admin.graphql);
}

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



function getFormat(databaseData) {
  const daysData = Number(databaseData[databaseData.length - 1]["days"]);
  let today = new Date().toDateString();
  let msec = Date.parse(today);
  let days = daysData * 24 * 60 * 60 * 1000;
  const d = new Date(Number(msec) + Number(days)).toDateString(); 
  let inputDate = d.slice(0, 10);
  return inputDate;
}



export async function createMetaField(graphql, input_tag) {
  const databaseData = await getAllData();
  let inputDate = databaseData.length > 0 ? getFormat(databaseData) : "";


  const responseId = await graphql(`
    query {
      currentAppInstallation {
        id
      }
    }
  `);
  const {
    data: { currentAppInstallation },
  } = await responseId.json();


  const response = await graphql(
    `
      mutation CreateAppDataMetafield(
        $metafieldsSetInput: [MetafieldsSetInput!]!
      ) {
        metafieldsSet(metafields: $metafieldsSetInput) {
          metafields {
            id
            namespace
            key
            value
          }
          userErrors {
            field
            message
          }
        }
      }
    `,
    {
      variables: {
        metafieldsSetInput: [
          {
            namespace: "delivery",
            key: "delivery_date",
            type: "single_line_text_field",
            value: inputDate,
            ownerId: currentAppInstallation["id"],
          },
        ],
      },
    },
  );


  // const {data: {metafieldsSet: { metafields: [date] } } } = await response.json()
  // return date;
}

