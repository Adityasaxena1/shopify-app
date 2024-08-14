

export default function EmptyCard(props) {
    return (
        <Card>
        <EmptyState
          heading="Schedule Your Products Delivery"
          action={{
            content: "Schedule Delivery",
            onAction: props.handle,
          }}
          image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
        >
          <p>Delivery Schedule is just one click away.</p>
        </EmptyState>
      </Card>
    )
}