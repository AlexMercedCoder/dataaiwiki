/**
 * P2 (2026-10-13): the top 20 terms on this site that match a Data Lakehouse Hub
 * glossary entry. Each matched term page shows a "See also on the Data Lakehouse
 * Hub glossary" link. The same pairs are recorded in
 * docs-and-audits/network-performance-audit-2026-10-13/status/small-sites.md so the
 * Hub can link back. Every URL was checked for HTTP 200 on 2026-10-13.
 */
export const hubGlossary: Record<string, { url: string; title: string }> = {
  'data-lakehouse': { url: 'https://datalakehousehub.com/knowledgebase/data-lakehouse/', title: "What is Data Lakehouse?" },
  'data-lake': { url: 'https://datalakehousehub.com/knowledgebase/data-lake/', title: "What is a Data Lake?" },
  'apache-polaris': { url: 'https://datalakehousehub.com/knowledgebase/apache-polaris/', title: "What is Apache Polaris?" },
  'apache-spark': { url: 'https://datalakehousehub.com/knowledgebase/apache-spark/', title: "What is Apache Spark?" },
  'delta-lake': { url: 'https://datalakehousehub.com/knowledgebase/delta-lake/', title: "What is Delta Lake?" },
  'apache-hudi': { url: 'https://datalakehousehub.com/knowledgebase/apache-hudi/', title: "What is Apache Hudi?" },
  'acid': { url: 'https://datalakehousehub.com/knowledgebase/acid-transactions/', title: "What are ACID Transactions?" },
  'etl-extract-transform-load': { url: 'https://datalakehousehub.com/knowledgebase/etl/', title: "What is ETL?" },
  'elt-extract-load-transform': { url: 'https://datalakehousehub.com/knowledgebase/elt/', title: "What is ELT?" },
  'data-catalog': { url: 'https://datalakehousehub.com/knowledgebase/data-catalog/', title: "What is a Data Catalog?" },
  'data-governance': { url: 'https://datalakehousehub.com/knowledgebase/data-governance/', title: "What is Data Governance?" },
  'data-pipeline': { url: 'https://datalakehousehub.com/knowledgebase/data-pipeline/', title: "What is a Data Pipeline?" },
  'data-modeling': { url: 'https://datalakehousehub.com/knowledgebase/data-modeling/', title: "What is Data Modeling?" },
  'dbt-data-build-tool': { url: 'https://datalakehousehub.com/knowledgebase/dbt-data-build-tool/', title: "What is dbt (Data Build Tool)?" },
  'duckdb': { url: 'https://datalakehousehub.com/knowledgebase/duckdb/', title: "What is DuckDB?" },
  'agentic-ai': { url: 'https://datalakehousehub.com/knowledgebase/agentic-ai/', title: "What is Agentic AI?" },
  'large-language-model': { url: 'https://datalakehousehub.com/knowledgebase/large-language-model/', title: "What is Large Language Model?" },
  'generative-ai': { url: 'https://datalakehousehub.com/knowledgebase/generative-ai/', title: "What is Generative AI?" },
  'embedding': { url: 'https://datalakehousehub.com/knowledgebase/embeddings/', title: "What is Embeddings?" },
  'kafka-apache-kafka': { url: 'https://datalakehousehub.com/knowledgebase/apache-kafka/', title: "What is Apache Kafka?" },
};
