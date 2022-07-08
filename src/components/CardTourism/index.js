import { Card, Image, Text } from "@mantine/core";

export default function CardTourism({ title, body, image }) {
  return (
    <Card shadow="sm" p="xl" component="a" target="_blank">
      <Card.Section>
        <Image src={image} height={200} alt="tourism bogota!" />
      </Card.Section>

      <Text weight={500} size="lg">
        {title}
      </Text>

      <Text size="sm">{body}</Text>
    </Card>
  );
}
