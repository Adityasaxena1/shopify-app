import {
  Card,
  EmptyState,
  ButtonGroup,
  Button,
  Text,
  IndexTable,
  Thumbnail,
} from "@shopify/polaris";
import React from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import { getAllData, createMetaField } from "../models/Schedule.server";
import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";

export async function loader({ request }) {
  const { admin } = await authenticate.admin(request);
  const deliveryTableDetails = await getAllData();
  if (deliveryTableDetails.length === 0) {
    await createMetaField( admin.graphql, input_tag = deliveryTableDetails[deliveryTableDetails.length -1 ]['tags'] );
  }
  
  return json({ deliveryTableDetails });
}

const DeliveryTable = ({ deliveryTableDetails }) => (
  <IndexTable
    resourceName={{
      singular: "deliveryTableDetail",
      plural: "deliveryTableDetails",
    }}
    itemCount={deliveryTableDetails.length}
    headings={[
      { title: "Thumbnail", hidden: true },
      { title: "id" },
      { title: "Shop Domain" },
      { title: "Days" },
      { title: "Date created" },
      { title: "Tags" }
    ]}
    selectable={false}
  >
    {deliveryTableDetails.map((deliveryTableDetail) => (
      <DeliveryTableRow
        key={deliveryTableDetail.id}
        deliveryTableDetail={deliveryTableDetail}
      />
    ))}
  </IndexTable>
);

const DeliveryTableRow = ({ deliveryTableDetail }) => (
  <IndexTable.Row id={deliveryTableDetail.id} position={deliveryTableDetail.id}>
    <IndexTable.Cell>
      <Thumbnail
        source="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
        alt="Delivery Truck Logo"
        size="small"
      />
    </IndexTable.Cell>

    <IndexTable.Cell>
      <Text>{deliveryTableDetail.id}</Text>
    </IndexTable.Cell>

    <IndexTable.Cell>
      <Text>{deliveryTableDetail.shop}</Text>
    </IndexTable.Cell>

    <IndexTable.Cell>
      <Text>{deliveryTableDetail.days}</Text>
    </IndexTable.Cell>

    <IndexTable.Cell>
      <Text>{deliveryTableDetail.createdAt}</Text>
    </IndexTable.Cell>

    <IndexTable.Cell>
      <Text>{deliveryTableDetail.tags}</Text>
    </IndexTable.Cell>
    

  </IndexTable.Row>
);

export default function Index() {
  const navigate = useNavigate();
  const { deliveryTableDetails } = useLoaderData();

  function handleScheduleDelivery() {
    navigate("/app/schedule");
    
  }

  return (
    <div>
      <Card>
        <div
          style={{
            display: "flex",
            flexGrow: 1,
            justifyContent: "space-between",
            alignItems: "center",
            paddingLeft: "1rem",
            paddingRight: "1rem",
          }}
        >
          <div style={{ marginLeft: "1rem", flexGrow: 1 }}>
            <Text variant="headingLg" as="p">
              Schedule Delivery
            </Text>
          </div>

          <ButtonGroup>
            <Button variant="primary" onClick={handleScheduleDelivery}>
              Schedule Delivery
            </Button>
          </ButtonGroup>
        </div>
      </Card>

      {deliveryTableDetails.length === 0 ? (
        <Card>
          <EmptyState
            heading="Schedule Your Products Delivery"
            action={{
              content: "Schedule Delivery",
              onAction: handleScheduleDelivery,
            }}
            image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
          >
            <p>Delivery Schedule is just one click away.</p>
          </EmptyState>
        </Card>
      ) : (
        <DeliveryTable
          deliveryTableDetails={[...deliveryTableDetails].reverse()}
        />
      )}
    </div>
  );
}
