import { Client } from "@elastic/elasticsearch";

export const client = new Client({
  node: "http://34.69.211.228:9200/", // Elasticsearch endpoint
});
