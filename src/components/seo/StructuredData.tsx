import {
  jsonLdScriptContent,
  type JsonLdDocument,
  type JsonLdNode,
} from "@/lib/seo/schema";

export function StructuredData({
  data,
}: {
  data: JsonLdDocument | JsonLdNode;
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdScriptContent(data) }}
    />
  );
}
