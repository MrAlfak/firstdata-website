type Props = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

export default function ProductJsonLdScript({ data }: Props) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
