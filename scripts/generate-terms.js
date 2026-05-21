import fs from 'fs';
import path from 'path';

const wikiDir = path.resolve('./wiki');

// Ensure directories exist
fs.mkdirSync(wikiDir, { recursive: true });

const terms = [
  // A
  {
    title: "ACID",
    definition: "A set of properties (Atomicity, Consistency, Isolation, Durability) that guarantee database transactions are processed reliably. ACID compliance ensures data integrity even in the event of crashes, power failures, or errors."
  },
  {
    title: "Ad-hoc Query",
    definition: "A dynamic, non-preplanned query created on-demand to answer a specific, one-time business question. Ad-hoc queries are commonly used in business intelligence and data exploration."
  },
  {
    title: "Agentic AI",
    definition: "An advanced paradigm in Artificial Intelligence where AI models function as autonomous agents capable of planning, using tools, executing complex workflows, and making decisions to achieve a specific goal without step-by-step human guidance."
  },
  {
    title: "Airflow",
    definition: "An open-source platform developed by Apache to programmatically author, schedule, and monitor workflows. It represents workflows as Directed Acyclic Graphs (DAGs), facilitating complex data orchestration tasks."
  },
  {
    title: "Analytics Engineer",
    definition: "A professional role that bridges the gap between data engineering and data analysis. Analytics engineers focus on writing clean, modular, and tested SQL/dbt code to transform raw data into well-modeled tables for business intelligence."
  },
  {
    title: "ANN (Approximate Nearest Neighbor)",
    definition: "A class of algorithms designed to search for vectors in high-dimensional space that are close to a query vector. Unlike exact search, ANN trades a small amount of accuracy for massive gains in query speed, making it essential for large-scale similarity search."
  },
  {
    title: "API (Application Programming Interface)",
    definition: "A set of protocols and tools that allows different software applications to communicate and share data with each other. APIs define the methods and data formats that applications can use to request and exchange information."
  },
  {
    title: "API Gateway",
    definition: "A management tool that sits between a client and a collection of backend microservices. It acts as a single entry point, handling request routing, API composition, rate limiting, and authentication."
  },
  {
    title: "Apache Hudi",
    definition: "An open-source transactional data lakehouse table format that provides features like upserts, deletes, and incremental data processing pipelines on top of cloud object storage."
  },
  {
    title: "Apache Iceberg",
    definition: "An open-source, high-performance transactional table format designed for massive analytic datasets. It enables engines like Spark, Trino, Flink, and Dremio to work safely and concurrently with a single copy of data using SQL behavior."
  },
  {
    title: "Apache Polaris",
    definition: "An open-source metadata catalog for data lakehouses that supports the Apache Iceberg table format. Polaris provides centralized access control, cross-engine credential vending, and multi-tenant security."
  },
  {
    title: "Artificial Intelligence",
    definition: "The simulation of human intelligence processes by machines, especially computer systems. These processes include learning (information acquisition), reasoning (using rules to reach approximate or definite conclusions), and self-correction."
  },
  {
    title: "Athena",
    definition: "Amazon Athena is an interactive query service that makes it easy to analyze data directly in Amazon S3 using standard SQL. It is serverless, meaning there is no infrastructure to manage, and you pay only for the queries you run."
  },
  {
    title: "Attention Mechanism",
    definition: "A key architecture component in modern deep learning (specifically Transformers) that allows models to dynamically focus on specific parts of an input sequence when generating output, enabling long-range contextual understanding."
  },
  {
    title: "Avro",
    definition: "Apache Avro is a row-oriented data serialization system that provides rich data structures and a compact, fast, binary data format. It uses schemas defined in JSON, making it ideal for event streaming architectures like Kafka."
  },
  {
    title: "AWS (Amazon Web Services)",
    definition: "The world's most comprehensive and broadly adopted cloud platform, offering over 200 fully featured services from data centers globally, including computing power, storage, and databases."
  },
  {
    title: "AWS Glue",
    definition: "A serverless data integration service that makes it easy to discover, prepare, and combine data for analytics, machine learning, and application development. It includes a centralized data catalog and automated ETL pipeline generation."
  },
  {
    title: "Azure (Microsoft Azure)",
    definition: "Microsoft's cloud computing platform providing a wide range of cloud services, including analytics, virtual computing, database management, and AI services, integrated with Microsoft systems."
  },
  {
    title: "Azure Blob Storage",
    definition: "A scalable object storage service provided by Microsoft Azure, designed to store massive amounts of unstructured data, such as text or binary data, for cloud-native analytics."
  },

  // B
  {
    title: "Backpropagation",
    definition: "The primary algorithm used to train artificial neural networks. It works by calculating the gradient of the loss function with respect to the network's weights, propagating errors backward from the output layer to adjust the weights."
  },
  {
    title: "BASE",
    definition: "An acronym standing for Basically Available, Soft state, Eventual consistency. It is a database design philosophy used in distributed systems that prioritizes availability and scalability over immediate consistency, contrasting with ACID."
  },
  {
    title: "Batch Size",
    definition: "A hyperparameter in machine learning that specifies the number of training samples processed in one iteration before the model's internal parameters are updated."
  },
  {
    title: "BI (Business Intelligence)",
    definition: "A technology-driven process for analyzing data and delivering actionable information to help executives, managers, and workers make informed business decisions."
  },
  {
    title: "Bias-Variance Tradeoff",
    definition: "A fundamental concept in machine learning describing the tension between error from erroneous assumptions (bias) and error from sensitivity to small fluctuations in training data (variance). Balancing the two is key to model generalization."
  },
  {
    title: "BigQuery",
    definition: "Google Cloud's fully managed, serverless, highly scalable enterprise data warehouse. It allows users to run super-fast SQL queries over petabytes of data using Google's infrastructure."
  },
  {
    title: "Blob Storage",
    definition: "A category of cloud storage optimized for storing unstructured binary large objects (blobs) such as videos, audio, backups, and large analytical datasets."
  },

  // C
  {
    title: "Cache",
    definition: "A hardware or software component that stores data temporarily so that future requests for that data can be served faster. In databases and search engines, caching reduces query latency and server load."
  },
  {
    title: "Catalog",
    definition: "In database systems, a catalog is a metadata repository containing definitions of database objects such as tables, views, columns, and security privileges. In a data lakehouse, it serves as the entry point for engines to resolve table locations."
  },
  {
    title: "CDC (Change Data Capture)",
    definition: "A set of software design patterns used to determine, track, and capture changes made to databases (inserts, updates, deletes) in real-time, allowing downstream systems to react instantly."
  },
  {
    title: "CDN (Content Delivery Network)",
    definition: "A geographically distributed group of servers that work together to provide fast delivery of internet content, minimizing page load delays by caching assets close to the user."
  },
  {
    title: "ClickHouse",
    definition: "An open-source, high-performance columnar database management system designed for real-time analytics. It uses SQL and is optimized to process petabytes of data with extremely low latency."
  },
  {
    title: "Cloud Storage",
    definition: "A cloud computing model that stores data on the Internet through a cloud computing provider who manages and operates data storage as a service, offering scale and durability."
  },
  {
    title: "Clustering",
    definition: "In databases, clustering refers to organizing table storage based on the values of one or more columns, ensuring related data is physically co-located to optimize range queries."
  },
  {
    title: "Columnar Database",
    definition: "A database management system that stores data tables by column rather than by row. This layout is highly efficient for analytical queries (OLAP) as it minimizes disk I/O and maximizes compression."
  },
  {
    title: "Compaction",
    definition: "The process of reorganizing storage files in transactional data lakes or databases. It consolidates many small files into fewer large files and resolves log deletes, optimizing read performance."
  },
  {
    title: "Compute-Storage Separation",
    definition: "An architectural pattern in modern data platforms where storage resources and query engines are scaled and paid for independently, preventing resource contention and reducing costs."
  },
  {
    title: "Computer Vision",
    definition: "A field of artificial intelligence that trains computers to interpret and understand the visual world. Using digital images and deep learning models, machines can accurately identify and classify objects."
  },
  {
    title: "Consensus Protocol",
    definition: "A system in distributed computing used to achieve agreement on a single data value or system state among multiple unreliable nodes, ensuring system reliability and fault tolerance."
  },
  {
    title: "Context Window",
    definition: "The maximum amount of text (measured in tokens) that a Large Language Model can process in a single prompt and response interaction. Larger windows allow models to reference longer documents."
  },
  {
    title: "Copy-on-Write",
    definition: "A storage optimization and write strategy where data files are never modified in place. When a write occurs, the system duplicates the original data, applies the modification, and writes a new file, maintaining transaction isolation."
  },
  {
    title: "Cosine Similarity",
    definition: "A metric used to measure how similar two vectors are, calculated as the cosine of the angle between them in a multi-dimensional space. It is widely used in document similarity and vector search."
  },

  // D
  {
    title: "DAG (Directed Acyclic Graph)",
    definition: "A structural representation of a set of tasks where edges indicate execution order and dependencies. The graph contains no loops, ensuring that tasks can be executed sequentially and reliably."
  },
  {
    title: "Dagster",
    definition: "A modern cloud-native orchestrator for machine learning, analytics, and ETL. It treats data assets as first-class citizens, focusing on local testability, data quality, and asset-based workflows."
  },
  {
    title: "Dashboard",
    definition: "A visual interface that displays key performance indicators (KPIs), metrics, and analytical data points to summarize the health and performance of an organization or process."
  },
  {
    title: "Data Analyst",
    definition: "A professional who collects, cleans, processes, and performs statistical analyses on data to help businesses make data-driven decisions and generate reports and dashboards."
  },
  {
    title: "Data Catalog",
    definition: "A detailed inventory of all data assets in an organization, using metadata to help data professionals quickly locate, evaluate, and manage datasets for various projects."
  },
  {
    title: "Data Cube",
    definition: "A multi-dimensional representation of data used in business intelligence for fast analysis. It allows users to view data from different perspectives, such as time, geography, and product lines."
  },
  {
    title: "Data Democratization",
    definition: "The process of making data accessible to non-technical users within an organization without requiring specialized assistance from IT or data engineering teams."
  },
  {
    title: "Data Engineer",
    definition: "A specialist who designs, builds, tests, and maintains data pipelines, data warehouses, and data architectures, ensuring that data is clean, reliable, and accessible for analytics."
  },
  {
    title: "Data Fabric",
    definition: "An architectural design that connects and manages data across various systems, cloud environments, and physical locations, utilizing metadata to automate integration and access control."
  },
  {
    title: "Data Federation",
    definition: "A data management technique that allows users to query data from multiple disparate sources as if they were a single database, without needing to copy or physically move the data."
  },
  {
    title: "Data Governance",
    definition: "A collection of practices and processes which ensure the formal management of data assets within an organization, covering security, privacy, compliance, and cataloging."
  },
  {
    title: "Data Lakehouse",
    definition: "An emerging data management paradigm that combines the low-cost object storage scalability of a data lake with the transactional capabilities, ACID compliance, and SQL performance of a data warehouse."
  },
  {
    title: "Data Lake",
    definition: "A centralized repository that allows you to store all your structured, semi-structured, and unstructured data at any scale, typically using cloud object storage."
  },
  {
    title: "Data Lineage",
    definition: "A map of the data's journey, showing its origin, the transformations it underwent, and its final destination across various systems and pipelines, crucial for debugging and governance."
  },
  {
    title: "Data Mart",
    definition: "A subset of a data warehouse focused on a single functional area, department, or subject, designed to provide data quickly to a specific group of users."
  },
  {
    title: "Data Mesh",
    definition: "A decentralized data architecture that organizes data by business domains rather than central pipelines. It treats data as a product and assigns ownership directly to domain teams."
  },
  {
    title: "Data Modeling",
    definition: "The process of defining the structure, relationships, constraints, and data formats of a database or data warehouse to ensure efficient queries and consistent storage."
  },
  {
    title: "Data Pipeline",
    definition: "A series of automated data processing steps that moves data from a source system to a destination system, transforming and cleaning it along the way."
  },
  {
    title: "Data Quality",
    definition: "The measurement of data's accuracy, completeness, reliability, and relevance for business operations and analytical decision-making."
  },
  {
    title: "Data Scientist",
    definition: "A professional who applies advanced analytics, statistics, machine learning, and predictive modeling to solve complex business problems and uncover hidden insights."
  },
  {
    title: "Data Virtualization",
    definition: "An approach to data management that allows applications to retrieve and manipulate data without requiring technical details about the data, such as how it is formatted or where it is physically located."
  },
  {
    title: "Data Warehouse",
    definition: "A centralized, highly structured repository designed to support business intelligence activities, query analysis, and transactional reporting across historical datasets."
  },
  {
    title: "Databricks",
    definition: "A unified, cloud-based data platform built on top of Apache Spark, Delta Lake, and MLflow, designed for data engineering, collaborative data science, and business analytics."
  },
  {
    title: "DBT (Data Build Tool)",
    definition: "An open-source command-line tool that enables data analysts and engineers to transform data in their warehouses using SQL select statements, supporting version control and testing."
  },
  {
    title: "Decoder",
    definition: "The component of a sequence-to-sequence model (like Transformers) that takes encoded representations and generates output sequences token by token, widely used in autoregressive language generation."
  },
  {
    title: "Deep Learning",
    definition: "A subset of machine learning based on artificial neural networks with multiple layers (deep networks). It mimics the human brain to solve complex problems in vision, language, and prediction."
  },
  {
    title: "Delta Lake",
    definition: "An open-source transactional table format created by Databricks that provides ACID transactions, scalable metadata handling, and unified streaming and batch data processing on top of data lakes."
  },
  {
    title: "Denormalization",
    definition: "A database optimization technique where redundant data is intentionally added to a schema to improve query performance by reducing the number of complex table joins required."
  },
  {
    title: "Dimension Table",
    definition: "A key component in dimensional modeling (star schemas) containing descriptive attributes (dimensions) like customer name or product category, used to filter and group metrics in fact tables."
  },
  {
    title: "Distributed Database",
    definition: "A database system that consists of two or more files located in different physical sites, either on the same network or entirely different networks, designed to scale out horizontally."
  },
  {
    title: "Docker",
    definition: "An open-source platform that automates the deployment of applications inside lightweight, portable software containers, ensuring consistency across development, testing, and production environments."
  },
  {
    title: "Document Store",
    definition: "A type of NoSQL database designed to store, retrieve, and manage semi-structured data as document objects, typically formatted in JSON or XML (e.g., MongoDB)."
  },
  {
    title: "Dot Product",
    definition: "An algebraic operation that takes two equal-length sequences of numbers (usually coordinate vectors) and returns a single number. In vector databases, it serves as a measure of vector alignment."
  },
  {
    title: "Double-bracket link",
    definition: "A wiki-style link format (e.g. [[Target Page]]) used to connect pages within a wiki. In this platform, double-bracket links are automatically normalized into site-friendly relative paths during compilation."
  },
  {
    title: "DuckDB",
    definition: "An open-source, embedded columnar database management system designed for analytical query processing. Often called the 'SQLite for analytics', it runs directly inside the host process with no external server."
  },

  // E
  {
    title: "ELT (Extract, Load, Transform)",
    definition: "A data integration process where raw data is extracted from source systems, loaded directly into a target storage system (like a data warehouse), and transformed there using the target's compute power."
  },
  {
    title: "Embedding",
    definition: "A representation of real-world objects (such as words, documents, or images) as dense numerical vectors in a continuous, high-dimensional space, capturing semantic meaning and relationships."
  },
  {
    title: "Encoder",
    definition: "The component of a neural network (such as a Transformer) that processes input data and converts it into a high-dimensional contextual vector representation, which can then be interpreted by a decoder."
  },
  {
    title: "Epoch",
    definition: "One complete pass of the entire training dataset through a machine learning model's training algorithm."
  },
  {
    title: "ETL (Extract, Transform, Load)",
    definition: "A traditional data integration process where data is extracted from source systems, transformed and cleaned on an external staging server, and then loaded into a target data warehouse."
  },
  {
    title: "ETL Metadata",
    definition: "Data about data generated during integration processes, detailing pipeline execution times, raw row counts, transformed column schemas, and pipeline status."
  },
  {
    title: "Euclidean Distance",
    definition: "The straight-line distance between two points in Euclidean space. In vector search, it is used to measure the dissimilarity between two vector representations."
  },
  {
    title: "Event-driven Architecture",
    definition: "A software architecture pattern where decoupled services react to events generated by other parts of the system in real-time, often using brokers like Kafka."
  },
  {
    title: "Execution Plan",
    definition: "A sequence of operations generated by a database engine's query optimizer to retrieve or update data, detailing indexes used, join algorithms, and execution costs."
  },

  // F
  {
    title: "F1 Score",
    definition: "A statistical metric used to measure the accuracy of a binary classification model. It is the harmonic mean of precision and recall, balancing both metrics into a single value."
  },
  {
    title: "Fact Table",
    definition: "The central table in a dimensional model (star schema) that stores quantitative metrics and measurements (facts) along with foreign keys referencing dimension tables."
  },
  {
    title: "Feature Engineering",
    definition: "The process of selecting, manipulating, and transforming raw data into new, informative features that improve the predictive performance of a machine learning algorithm."
  },
  {
    title: "Feature Store",
    definition: "A centralized repository for storing, managing, and serving curated machine learning features, ensuring consistency between offline model training and online real-time inference."
  },
  {
    title: "Fine-tuning",
    definition: "The process of taking a pre-trained machine learning model and training it further on a smaller, task-specific dataset to adapt its capabilities to a specialized domain."
  },
  {
    title: "Flink (Apache Flink)",
    definition: "An open-source, distributed stream processing framework engine designed to process continuous streams of data with low latency, high throughput, and stateful event-driven guarantees."
  },

  // G
  {
    title: "GCP (Google Cloud Platform)",
    definition: "Google's suite of cloud computing services, providing infrastructure, data analytics, storage, databases, and machine learning tools running on the same hardware Google uses internally."
  },
  {
    title: "Generative AI",
    definition: "A branch of artificial intelligence focused on creating new content, including text, images, code, and music, by training models on massive datasets of existing human creations."
  },
  {
    title: "Glowmorphism",
    definition: "A visual design aesthetic using bright neon highlights, glowing borders, and drop-shadows over dark translucent backdrops to build futuristic, high-contrast, premium interfaces."
  },
  {
    title: "Google Cloud Storage",
    definition: "A global, secure, and scalable object storage service offered by Google Cloud Platform, optimized for serving website content, backups, and large analytics files."
  },
  {
    title: "Gradient Descent",
    definition: "An optimization algorithm used to minimize the loss function of a machine learning model by iteratively adjusting the model's weights in the direction of steepest descent."
  },
  {
    title: "Graph Database",
    definition: "A NoSQL database that uses graph structures with nodes, edges, and properties to represent and store data, optimized for querying highly connected relationships (e.g., social networks)."
  },
  {
    title: "GraphQL",
    definition: "An open-source data query and manipulation language for APIs, allowing clients to request exactly the data they need and nothing more, reducing network usage."
  },
  {
    title: "Guardrails",
    definition: "Safety mechanisms and filters applied to Generative AI systems to restrict harmful inputs, block toxic outputs, ensure policy compliance, and reduce hallucinations."
  },

  // H
  {
    title: "Hallucination",
    definition: "A phenomenon where a Generative AI model or Large Language Model generates output that is factually incorrect, nonsensical, or unaligned with its training data."
  },
  {
    title: "Hidden Partitioning",
    definition: "An advanced feature in Apache Iceberg where the table format automatically manages partitioning columns based on source fields, freeing queries from needing to specify partition filters explicitly."
  },
  {
    title: "Hive Metastore",
    definition: "The traditional centralized metadata catalog for the Apache Hadoop ecosystem, storing structural schema definitions and directory paths for tables in a file system."
  },
  {
    title: "HNSW (Hierarchical Navigable Small World)",
    definition: "An state-of-the-art graph-based algorithm for Approximate Nearest Neighbor (ANN) search, creating multi-layer graphs to achieve extremely fast vector searches in high dimensions."
  },
  {
    title: "Hyperparameter",
    definition: "A configuration parameter in machine learning whose value is set before the training process begins (e.g., learning rate, batch size), governing how the model learns."
  },

  // I
  {
    title: "IaC (Infrastructure as Code)",
    definition: "The management and provisioning of infrastructure resources (servers, databases, networks) through machine-readable configuration files rather than manual interactive tools."
  },
  {
    title: "IAM (Identity and Access Management)",
    definition: "A framework of policies and technologies for ensuring that the right people and systems have the appropriate access to technology resources in a cloud environment."
  },
  {
    title: "Iceberg REST Catalog",
    definition: "A standardized REST API specification for managing Apache Iceberg tables. It allows query engines to safely read, write, and exchange transactional metadata with a central catalog service."
  },
  {
    title: "In-memory Database",
    definition: "A database management system that primarily relies on main memory (RAM) for data storage, resulting in ultra-fast read and write operations compared to disk-bound storage."
  },
  {
    title: "Indexing",
    definition: "A database performance optimization technique that creates data structures (indexes) on table columns to accelerate search and filter speeds at the cost of additional storage and write overhead."
  },
  {
    title: "Inference",
    definition: "The process of running a trained machine learning model on new, unseen data to generate predictions, classifications, or generated content."
  },
  {
    title: "IVF-FLAT",
    definition: "An inverted file index algorithm used in vector databases to speed up similarity searches by clustering vectors into clusters, querying only the centroids closest to the search vector."
  },

  // K
  {
    title: "Kafka (Apache Kafka)",
    definition: "An open-source distributed event streaming platform used by thousands of companies for high-performance data pipelines, streaming analytics, and system integration."
  },
  {
    title: "Key-Value Store",
    definition: "A simple NoSQL database that uses an associative array (map) as its fundamental data model, storing data as a collection of unique keys linked to specific values."
  },
  {
    title: "K-Nearest Neighbors",
    definition: "A non-parametric machine learning algorithm used for classification and regression, where a data point is classified based on the plurality vote or average value of its closest neighbors."
  },
  {
    title: "KPI (Key Performance Indicator)",
    definition: "A quantifiable measure used to evaluate the success of an organization, employee, or project in meeting objectives."
  },
  {
    title: "Kubernetes",
    definition: "An open-source container orchestration system for automating software deployment, scaling, and management of containerized applications across clusters of host machines."
  },

  // L
  {
    title: "Lakehouse Catalog",
    definition: "The metadata catalog interface that tracks transactional table namespaces and physical files in a data lakehouse, coordinating safe concurrent engine access."
  },
  {
    title: "LangChain",
    definition: "An open-source software development framework designed to simplify the creation of applications using large language models, providing integrations, prompt templates, and chains."
  },
  {
    title: "Large Language Model",
    definition: "A type of artificial intelligence model trained on massive amounts of text data, capable of understanding, generating, translating, and summarizing human language."
  },
  {
    title: "LlamaIndex",
    definition: "A data framework for connecting private custom data sources to large language models, facilitating retrieval-augmented generation (RAG) and semantic indexing."
  },
  {
    title: "Load Balancer",
    definition: "A networking device or software that distributes incoming network traffic across a group of backend servers to optimize resource utilization and prevent overload."
  },
  {
    title: "Loss Function",
    definition: "A mathematical function that measures the discrepancy between a machine learning model's predictions and the actual target values during training, guiding model optimization."
  },

  // M
  {
    title: "Machine Learning",
    definition: "A branch of artificial intelligence focused on building systems that learn from data, identify patterns, and make decisions with minimal human intervention."
  },
  {
    title: "Manifest File",
    definition: "In Apache Iceberg, a manifest file is an Avro file that tracks a list of data files or delete files, along with partition-level metrics, enabling efficient file pruning during query planning."
  },
  {
    title: "Manifest List",
    definition: "In Apache Iceberg, a manifest list is an Avro file that tracks manifest files, documenting which partition specs apply to each manifest, enabling partition-level metadata pruning."
  },
  {
    title: "Materialized View",
    definition: "A database object containing the precomputed results of a query, stored physically on disk to avoid re-evaluating complex queries, with various strategies for refresh synchronization."
  },
  {
    title: "Merge-on-Read",
    definition: "A write strategy in transactional table formats where updates and deletes are written to separate log files (delete files). During read execution, the engine merges the base files with the logs."
  },
  {
    title: "Message Queue",
    definition: "An asynchronous communications protocol where messages sent between application services are stored in a queue until the receiving service retrieves and processes them."
  },
  {
    title: "Metadata File",
    definition: "In Apache Iceberg, the root metadata file is a JSON file that maintains the state of the table, tracking table schema, partition specs, snapshots, and properties over time."
  },
  {
    title: "Metadata Layer",
    definition: "The abstraction layer in modern table formats that tracks transactional log structures, physical data paths, and index statistics, separating query execution from data layout."
  },
  {
    title: "Metric Flow",
    definition: "A semantic definition framework (originally by dbt) designed to define metric logic once and compile it into SQL for multiple downstream analytical consumption tools."
  },
  {
    title: "Metric Store",
    definition: "A centralized repository for defining and governance of business metrics, ensuring consistent mathematical calculations across all organizational dashboards and APIs."
  },
  {
    title: "Metric",
    definition: "A quantitative measurement or calculation derived from data points, used to track business performance and operational trends."
  },
  {
    title: "Microservices",
    definition: "An architectural style that structures an application as a collection of small, loosely coupled, independently deployable services organized around business capabilities."
  },
  {
    title: "MinIO",
    definition: "An open-source, high-performance, S3-compatible cloud-native object storage system designed to run on-premises or in Kubernetes clusters."
  },
  {
    title: "Model Drift",
    definition: "The decay of a machine learning model's predictive performance over time due to changes in real-world environments and the underlying distribution of incoming data."
  },
  {
    title: "Multi-agent System",
    definition: "A system composed of multiple interacting intelligent agents that collaborate or compete to solve tasks that are difficult for an individual agent to achieve."
  },
  {
    title: "MVCC (Multi-Version Concurrency Control)",
    definition: "A database design method that allows multiple users to read and write data concurrently without locking tables, by maintaining multiple historical versions of data rows."
  },

  // N
  {
    title: "Natural Language Processing",
    definition: "A subfield of computer science and artificial intelligence concerned with interactions between computers and human languages, enabling computers to read, decipher, and understand speech."
  },
  {
    title: "Nessie (Project Nessie)",
    definition: "An open-source transaction catalog for data lakehouses that provides Git-like capabilities (branching, merging, tagging) for table metadata versions."
  },
  {
    title: "Neural Network",
    definition: "A computational model inspired by the structure and function of biological brains, consisting of interconnected node layers designed to recognize patterns and solve complex problems."
  },
  {
    title: "NewSQL",
    definition: "A class of modern relational database management systems that seek to provide the same scalable read-write performance of NoSQL systems while maintaining ACID transactional guarantees."
  },
  {
    title: "NoSQL",
    definition: "A broad category of database management systems that store and retrieve data using non-relational structures, optimized for horizontal scaling, write speed, and schema flexibility."
  },
  {
    title: "Normalization",
    definition: "A database design technique that organizes tables in a relational database to minimize redundancy and dependency, dividing large tables into smaller, linked tables."
  },

  // O
  {
    title: "Object Storage",
    definition: "A computer storage architecture that manages data as objects rather than files or file system blocks, providing infinite scalability, durability, and a simple HTTP REST interface."
  },
  {
    title: "Object Storage Layout",
    definition: "The organization and prefix structuring of object keys in cloud storage, optimized to prevent network partitioning bottlenecks and hot-spotting during parallel write operations."
  },
  {
    title: "OLAP (Online Analytical Processing)",
    definition: "A category of database systems optimized for high-performance analytical queries over large datasets, typically characterized by complex reads, aggregations, and columnar storage."
  },
  {
    title: "OLTP (Online Transactional Processing)",
    definition: "A category of database systems optimized for high-volume, low-latency, transactional operations (inserts, updates, deletes) supporting operational day-to-day business systems."
  },
  {
    title: "Open Source",
    definition: "A type of software licensing that makes source code freely available for anyone to inspect, modify, enhance, and distribute under open collaboration standards."
  },
  {
    title: "ORC (Optimized Row Columnar)",
    definition: "An open-source, highly efficient columnar file format developed for the Hadoop ecosystem, offering advanced compression and light index structures to speed up analytics."
  },
  {
    title: "Orchestration",
    definition: "The centralized management, scheduling, and monitoring of complex computational workflows, data pipelines, and distributed service dependencies."
  },
  {
    title: "Overfitting",
    definition: "A common machine learning error where a model learns training data details and noise so well that it fails to generalize to new, unseen validation data."
  },

  // P
  {
    title: "Parchment Refero Aesthetic",
    definition: "A curated typography and layout system featuring flat elements, no rounded corners, dashed borders, parchment backgrounds (#fdfaf3), and cocoa typography (#472425)."
  },
  {
    title: "Parquet (Apache Parquet)",
    definition: "An open-source, column-oriented data file format designed for efficient data storage and retrieval in analytic pipelines, supporting advanced compression and projection."
  },
  {
    title: "Partition Evolution",
    definition: "An advanced feature in Apache Iceberg that allows table partitioning layouts to be updated dynamically without requiring users to rewrite historical data tables."
  },
  {
    title: "Partitioning",
    definition: "The process of dividing database tables or files into smaller, manageable chunks based on specific column values, enabling engines to skip loading irrelevant data folders."
  },
  {
    title: "Paxos",
    definition: "A family of consensus protocols used to solve agreement among a network of unreliable processors, providing strong consistency guarantees in distributed database systems."
  },
  {
    title: "Polaris REST Catalog",
    definition: "The REST API implementation of Apache Polaris, facilitating standardized catalog communication and secure query coordination across multi-engine architectures."
  },
  {
    title: "Precision",
    definition: "A statistical metric in classification models indicating the proportion of positive identifications that were actually correct (true positives divided by total predicted positives)."
  },
  {
    title: "Prefect",
    definition: "A modern workflow orchestration platform designed to automate, schedule, and observe data pipelines, emphasizing Pythonic API design and hybrid cloud execution models."
  },
  {
    title: "Presto",
    definition: "An open-source distributed SQL query engine designed for running fast analytical queries over massive datasets stored in various storage systems like Hive, Cassandra, and object stores."
  },
  {
    title: "Prompt Engineering",
    definition: "The process of structuring, designing, and optimizing input text instructions (prompts) to guide Generative AI models to output precise, contextually accurate answers."
  },
  {
    title: "Prompt",
    definition: "The input text instruction, question, or context provided to a generative AI model or large language model to trigger a generated response."
  },

  // Q
  {
    title: "Quantization",
    definition: "A technique in machine learning that compresses models by converting high-precision numerical weights (e.g. 32-bit floats) to lower-precision values (e.g. 8-bit integers) to reduce memory."
  },
  {
    title: "Query Federation",
    definition: "The ability to run a single SQL query that retrieves and combines data across multiple different database systems and storage locations in real-time."
  },
  {
    title: "Query Optimizer",
    definition: "A component in database engines that analyzes queries and determines the most efficient way to execute them by evaluating alternative processing plans."
  },
  {
    title: "Query Pushdown",
    definition: "A database performance optimization where sections of query execution logic (like filters or aggregations) are pushed down directly to the data storage system to reduce network traffic."
  },

  // R
  {
    title: "RabbitMQ",
    definition: "An open-source message broker that accepts, stores, and forwards messages between services, supporting multiple messaging protocols and complex routing configurations."
  },
  {
    title: "Raft",
    definition: "A distributed consensus algorithm designed to be easy to understand and implement, providing fault-tolerant replication of state machines across clusters."
  },
  {
    title: "RAG (Retrieval-Augmented Generation)",
    definition: "An AI architecture that enhances large language models by retrieving relevant information from an external vector store or database before generating a response."
  },
  {
    title: "Recall",
    definition: "A metric in classification indicating the proportion of actual positive cases that were correctly identified by the model (true positives divided by total actual positives)."
  },
  {
    title: "Redpanda",
    definition: "A modern, high-performance streaming data platform that is API-compatible with Apache Kafka, written in C++ to eliminate JVM garbage collection overhead."
  },
  {
    title: "Redshift (Amazon Redshift)",
    definition: "Amazon's fully managed, petabyte-scale cloud data warehouse service that uses columnar storage and massively parallel processing (MPP) for high-performance SQL analytics."
  },
  {
    title: "Reinforcement Learning",
    definition: "A type of machine learning where an agent learns to make decisions by performing actions in an environment and receiving rewards or penalties."
  },
  {
    title: "Replication",
    definition: "The process of sharing and copying database instances across multiple storage nodes or servers to ensure high availability, load balancing, and fault tolerance."
  },
  {
    title: "RLHF (Reinforcement Learning from Human Feedback)",
    definition: "A technique for aligning language models with human preferences, using human feedback to train a reward model that guides the reinforcement learning training process."
  },
  {
    title: "ROC-AUC",
    definition: "A performance measurement for classification problems at various threshold settings. AUC (Area Under the Curve) measures the model's ability to distinguish between classes."
  },
  {
    title: "Row-oriented Database",
    definition: "A traditional database management system that stores table data row-by-row on disk, optimized for fast transactional (OLTP) operations involving individual records."
  },

  // S
  {
    title: "S3 (Amazon S3)",
    definition: "Amazon Simple Storage Service is an object storage service offering industry-leading scalability, data availability, security, and performance for cloud-native storage."
  },
  {
    title: "Schema Evolution",
    definition: "The ability of transactional table formats to safely modify columns (add, drop, rename) over time without corrupting historical tables or requiring rewrites."
  },
  {
    title: "Schema Registry",
    definition: "A centralized repository that stores and manages schemas for event stream systems (like Kafka), ensuring data compatibility between producers and consumers."
  },
  {
    title: "Self-service Analytics",
    definition: "A business intelligence approach enabling non-technical users to access and analyze data directly, creating custom reports and dashboards without IT assistance."
  },
  {
    title: "Semantic Layer",
    definition: "A business representation of corporate data that helps users access data using common terms, providing unified metrics definitions and central governance."
  },
  {
    title: "Semantic Search",
    definition: "A search technique that seeks to understand the intent and contextual meaning of query words rather than simply matching literal keywords."
  },
  {
    title: "Serverless",
    definition: "A cloud computing execution model where the cloud provider manages infrastructure allocation, automatically scaling compute resources to match demand, charging only for resources used."
  },
  {
    title: "Sharding",
    definition: "A database partitioning method that breaks up large databases into smaller, faster, more easily managed parts called data shards, distributed across multiple servers."
  },
  {
    title: "Similarity Search",
    definition: "The process of finding objects in a database that are similar to a query object, commonly executed in vector databases using metric distances."
  },
  {
    title: "Slowly Changing Dimension",
    definition: "A data warehousing concept referring to dimensions that store and manage historical data changes over time (SCD Type 1, Type 2, etc.)."
  },
  {
    title: "Snapshot Isolation",
    definition: "A database transaction isolation level where transactions read a consistent snapshot of data captured at transaction start time, avoiding read locks."
  },
  {
    title: "Snowflake Schema",
    definition: "An extension of a star schema where dimension tables are normalized into multiple related tables, forming a snowflake-like shape of joins."
  },
  {
    title: "Snowflake",
    definition: "A fully managed cloud data platform that provides data warehousing, data lakes, data sharing, and modern SQL analytics scaling compute dynamically."
  },
  {
    title: "Spark (Apache Spark)",
    definition: "An open-source, distributed general-purpose cluster-computing framework engine optimized for fast query execution and large-scale data processing."
  },
  {
    title: "Speech-to-Text",
    definition: "A machine learning and signal processing technique that converts spoken language audio inputs into written text formats."
  },
  {
    title: "SQL (Structured Query Language)",
    definition: "The standard programming language designed for managing, querying, and manipulating data stored in relational database management systems."
  },
  {
    title: "Star Schema",
    definition: "A database schema design featuring a central fact table surrounded by and joined to multiple independent dimension tables, optimized for analytical queries."
  },
  {
    title: "Supervised Learning",
    definition: "A type of machine learning where models are trained on labeled datasets containing input-output pairs, learning to map inputs to correct outputs."
  },

  // T
  {
    title: "Tabular",
    definition: "A cloud-native data platform (acquired by Databricks) founded by the creators of Apache Iceberg, designed to provide automated storage optimization and security governance."
  },
  {
    title: "Terraform",
    definition: "An open-source infrastructure as code (IaC) software tool created by HashiCorp, allowing users to define and provision cloud resources using declarative configurations."
  },
  {
    title: "Test Data",
    definition: "The subset of data used at the end of machine learning training to evaluate the final performance and generalization capability of the model."
  },
  {
    title: "Text-to-Speech",
    definition: "A machine learning and speech synthesis technique that converts written text strings into spoken language audio outputs."
  },
  {
    title: "Time Series",
    definition: "A sequence of data points recorded at regular time intervals, commonly analyzed to track trends and predict future occurrences."
  },
  {
    title: "Time-series Database",
    definition: "A database system optimized for handling time-series data, specifically engineered to ingest high volumes of timestamped metrics."
  },
  {
    title: "Time Travel",
    definition: "A feature in transactional table formats (like Iceberg) that allows queries to reference historical table states using specific timestamps or snapshot IDs."
  },
  {
    title: "Token",
    definition: "A basic unit of text (ranging from single characters to full words) processed by a Large Language Model for training and inference."
  },
  {
    title: "Tokenization",
    definition: "The process of splitting a text string into individual units (tokens) before passing it to a natural language processor or language model."
  },
  {
    title: "Tokenizer",
    definition: "A software component or library that implements tokenization logic, mapping characters and subwords to numerical token IDs."
  },
  {
    title: "Training Data",
    definition: "The primary dataset used to train a machine learning model, allowing it to adjust internal weights and learn patterns."
  },
  {
    title: "Transfer Learning",
    definition: "A machine learning technique where a model developed for one task is reused as the starting point for a model on a second, related task."
  },
  {
    title: "Transformer",
    definition: "A deep learning neural network architecture introduced in 2017 that relies on self-attention mechanisms, serving as the foundation for modern LLMs."
  },
  {
    title: "Trino",
    definition: "An open-source distributed SQL query engine designed to run fast, interactive analytical queries against data storage systems at petabyte scale."
  },
  {
    title: "Two-phase Commit",
    definition: "A type of atomic commitment protocol in distributed database systems that ensures write transactions write to all participating database nodes or fail entirely."
  },

  // U
  {
    title: "Underfitting",
    definition: "A machine learning error where a model is too simple to learn the underlying structure of the training data, resulting in poor predictive performance on both training and test sets."
  },
  {
    title: "Unity Catalog",
    definition: "A unified governance solution by Databricks for data, analytics, and AI, providing centralized access control, lineage tracking, and search."
  },
  {
    title: "Unsupervised Learning",
    definition: "A type of machine learning where models are trained on unlabeled datasets, learning to discover hidden structures and groupings without target outputs."
  },

  // V
  {
    title: "Validation Data",
    definition: "A dataset used during machine learning training to fine-tune hyperparameters and prevent model overfitting."
  },
  {
    title: "Vector Database",
    definition: "A database system designed to store, index, and query high-dimensional vector embeddings, optimized for similarity search in AI and search applications."
  },
  {
    title: "Vector Embeddings",
    definition: "Numerical representations of data objects (text, images, audio) containing semantic meaning, captured as high-dimensional coordinates."
  },
  {
    title: "Vector Index",
    definition: "An indexing data structure in vector databases (like HNSW or IVF) designed to speed up search queries for high-dimensional vectors."
  },
  {
    title: "Vector Store",
    definition: "A software database layer or client library optimized for loading and querying vector embeddings (e.g. Chroma, FAISS)."
  },
  {
    title: "VPC (Virtual Private Cloud)",
    definition: "A private cloud network environment carved out inside a public cloud provider, allowing users to run resources in an isolated network."
  },

  // W
  {
    title: "Wide-column Store",
    definition: "A NoSQL database type that stores columns of data together rather than rows, utilizing dynamic column families to support sparse data structures."
  }
];

// Let's add remaining terms to hit exactly 200 terms!
const additionalTerms = [
  // A
  { title: "Anomaly Detection", definition: "The identification of rare items, events, or observations that raise suspicions by differing significantly from the majority of the data." },
  { title: "Aggregation", definition: "A mathematical process where multiple data values are grouped together to form a single summary value, such as Sum, Average, or Count." },
  { title: "Active Learning", definition: "A semi-supervised machine learning paradigm where the algorithm selects which unlabeled data points it needs labeled next to improve training efficiency." },
  { title: "Apache Spark Structured Streaming", definition: "A scalable and fault-tolerant stream processing engine built on the Spark SQL engine, allowing streaming queries to be expressed like batch queries." },
  { title: "AI-ism", definition: "A term describing clichéd, repetitive, or sterile phrasing commonly generated by generic AI systems. Best practices advise developers to avoid these phrases in editorial writing." },
  { title: "Artificial Neural Network", definition: "A computing system modeled after the human brain's neural structure, containing layers of interconnected nodes used to solve non-linear learning problems." },
  { title: "Autoencoder", definition: "A type of unsupervised artificial neural network used to learn efficient data codings or compressions by training the network to ignore signal noise." },
  { title: "AVX-512", definition: "A set of CPU instructions that support advanced vector extensions, frequently utilized to accelerate vector search calculations and machine learning inference." },
  
  // B
  { title: "Business Glossary", definition: "A centralized directory containing definitions of business terms, concepts, and relationships, separate from physical database table schema catalogs." },
  { title: "Bag-of-Words", definition: "A simple text representation model used in NLP where a text document is represented as an unordered bag or set of its words, ignoring grammar and word order." },
  { title: "Bfloat16", definition: "Brain Floating Point 16-bit format, a truncated version of the 32-bit float format designed to accelerate machine learning computations and save memory." },
  { title: "Bootstrap Aggregating (Bagging)", definition: "An ensemble machine learning meta-algorithm designed to improve the stability and accuracy of algorithms, reducing variance and avoiding overfitting." },
  { title: "Boosting", definition: "An ensemble machine learning technique that trains weak learners sequentially, with each new model focusing on correcting the errors of its predecessor." },
  
  // C
  { title: "Computer Cluster", definition: "A set of loosely or tightly connected computers that work together as a single system, essential for executing distributed query engines like Spark or Trino." },
  { title: "Correlation", definition: "A statistical relationship indicating how closely two variables fluctuate together, ranging from perfect positive correlation to perfect negative correlation." },
  { title: "Classification", definition: "A supervised machine learning task where the model categorizes incoming input data points into predefined discrete classes or labels." },
  { title: "Clustering Algorithm", definition: "An unsupervised learning method that groups data points into clusters based on similarity metrics, such as K-Means or DBSCAN." },
  { title: "Colocation", definition: "The physical placement of computing power, data engines, or storage resources within the same data center to minimize network latency." },
  { title: "Containerization", definition: "A lightweight virtualization method that packages an application and its dependencies into a single container image, executed uniformly across environments." },
  { title: "Cross-Validation", definition: "A resampling method used to evaluate machine learning models by partitioning data into training and validation folds to obtain stable metrics." },
  
  // D
  { title: "Data Ingestion", definition: "The process of importing, loading, and transferring raw data from external source systems into a data warehouse or data lakehouse storage repository." },
  { title: "Data Lakehouse Catalog", definition: "The software interface that tracks transaction log structures, namespaces, and metadata file locations in a modern data lakehouse." },
  { title: "Data Marketplace", definition: "An online platform where organizations can publish, sell, license, or purchase standardized datasets and analytical products." },
  { title: "Data Refresh", definition: "The scheduled process of updating data warehouses, data marts, or dashboards with the latest records fetched from transaction systems." },
  { title: "Data Retention", definition: "The policies and technical configurations governing how long records and tables are preserved in storage before deletion." },
  { title: "Data Science", definition: "An interdisciplinary field combining statistics, programming, and domain expertise to extract insights and build predictive models from data." },
  { title: "Data Silo", definition: "An isolated pocket of data within an organization that is accessible to one department but cut off from the rest of the company." },
  { title: "Data Sovereignty", definition: "The concept that digital data is subject to the laws and governance structures of the country in which it is physically located." },
  { title: "Data Source", definition: "The primary origin of data, such as transaction databases, application APIs, log files, or IoT sensors, imported into analytical engines." },
  { title: "Data Stewardship", definition: "The operational responsibility for managing data assets, ensuring data quality, metadata cataloging, and policy compliance." },
  { title: "Data Transformation", definition: "The process of cleaning, converting, and formatting raw data into structured tables optimized for reporting and analysis." },
  { title: "Deep Neural Network", definition: "An artificial neural network containing multiple hidden layers between input and output layers, capable of learning high-level features." },
  { title: "Differentiable Programming", definition: "A programming paradigm where programs can be differentiated, allowing parameters to be optimized using gradient descent, common in deep learning." },
  { title: "Dimensional Modeling", definition: "A database design technique optimized for analytical queries, organizing data into star or snowflake schemas containing fact and dimension tables." },
  { title: "Data Asset", definition: "Any structured or unstructured data file, table, database, or dashboard that holds business value and is managed within an organization." },
  
  // E
  { title: "Embedding Layer", definition: "A layer in a neural network that translates discrete tokens or categorical features into dense, low-dimensional vector representations." },
  { title: "Embedding Model", definition: "A specialized machine learning model trained to convert inputs (text, images) into vector embeddings while preserving semantic relations." },
  { title: "Entity Resolution", definition: "The process of identifying and linking records across disparate datasets that refer to the same real-world entity, such as a customer." },
  { title: "Exploratory Data Analysis (EDA)", definition: "An approach to analyzing datasets by summarizing their main statistical characteristics, often using visual methods like plots." },
  
  // F
  { title: "False Positive", definition: "A classification error where a model incorrectly predicts the positive class for a negative data point." },
  { title: "False Negative", definition: "A classification error where a model incorrectly predicts the negative class for a positive data point." },
  { title: "Federated Query Engine", definition: "A distributed query processor (e.g. Trino) that executes SQL queries spanning multiple external databases without copying data." },
  { title: "Feature Vector", definition: "An n-dimensional vector of numerical features that represents some object, used as input for machine learning models." },
  { title: "Few-Shot Learning", definition: "A machine learning scenario where a model is trained or prompted to perform a task using only a small number of training examples." },
  { title: "Fully Connected Layer", definition: "A layer in an artificial neural network where each node is connected to every node in the preceding layer." },
  
  // G
  { title: "Generative Adversarial Network (GAN)", definition: "A machine learning architecture where two neural networks (Generator and Discriminator) compete to create realistic synthetic data." },
  { title: "GPT (Generative Pre-trained Transformer)", definition: "A family of decoder-only transformer language models trained on massive text corpora to perform diverse text generation tasks." },
  { title: "GPU (Graphics Processing Unit)", definition: "A specialized electronic circuit designed to rapidly manipulate memory, accelerating machine learning model training and vector math." },
  
  // H
  { title: "Heuristic", definition: "A practical method or rule of thumb used to solve problems quickly, often utilized by query optimizers to draft initial query paths." },
  { title: "Hot Tier", definition: "A high-performance storage tier optimized for active data that is queried frequently, utilizing fast SSDs or in-memory caches." },
  { title: "Hudi Timeline", definition: "A core log structure in Apache Hudi that tracks all actions performed on a table, providing transactional guarantees and point-in-time queries." },
  
  // I
  { title: "Incremental Load", definition: "An ETL/ELT process that updates a target database by loading only new or changed records since the last execution, saving time." },
  { title: "Internet of Things (IoT) Data", definition: "Continuous streams of sensor readings, telemetry, and status updates generated by physical devices connected to the internet." },
  { title: "Iceberg Manifest", definition: "An Avro-formatted file in an Apache Iceberg table that lists individual data files and documents file-level statistical bounds." },
  { title: "In-database Analytics", definition: "Executing analytical algorithms and machine learning models directly inside a database engine, avoiding data export delays." },
  
  // J
  { title: "JSON (JavaScript Object Notation)", definition: "A lightweight, text-based data-interchange format that is easy for humans to read and write and easy for machines to parse." },
  { title: "JSON-LD", definition: "A method of encoding Linked Data using JSON, widely utilized to embed structured metadata schemas into website pages for search engine optimization." },
  
  // K
  { title: "Kafka Connect", definition: "A component of Apache Kafka designed to simplify integration between Kafka topics and external data sources or databases." },
  { title: "K-Means Clustering", definition: "A popular unsupervised clustering algorithm that partitions data into K distinct clusters based on Euclidean distance to centroids." },
  
  // L
  { title: "Lakehouse Storage", definition: "The open cloud object storage layer that houses transactional parquet or orc tables managed by formats like Iceberg." },
  { title: "Llama", definition: "A family of open-source foundational large language models developed by Meta, widely used for local LLM deployment and custom fine-tuning." },
  { title: "Latent Space", definition: "A compressed mathematical space where similar data points are grouped closer together, capturing the hidden features of input data." },
  { title: "Linear Regression", definition: "A basic supervised learning algorithm that models the relationship between dependent and independent variables using a straight line." },
  { title: "Logistic Regression", definition: "A classification algorithm used to predict the probability of a binary outcome based on input features." },
  
  // M
  { title: "Metric Namespace", definition: "A logical grouping of related metric definitions within a semantic layer to maintain organization and avoid naming collisions." },
  { title: "Mistral", definition: "A family of high-performance, open-source large language models developed by Mistral AI, optimized for efficiency and speed." },
  { title: "MLOps", definition: "Machine Learning Operations, a set of practices aiming to deploy and maintain machine learning models in production reliably and efficiently." },
  { title: "Model Inference", definition: "The step where a trained machine learning model runs prediction logic against incoming query data." },
  
  // N
  { title: "Named Entity Recognition (NER)", definition: "A subtask of natural language processing that identifies and classifies key entities in text into predefined categories like names or locations." },
  { title: "Nessie Catalog", definition: "The server catalog cataloging interface for Project Nessie, translating Git-like version transactions for analytical engines." },
  { title: "Node", definition: "An individual computer server or virtual instance in a cluster, coordinating with other nodes to store data and execute queries." },
  
  // O
  { title: "OLAP Cube", definition: "A multidimensional database optimized for analytical processing, pre-aggregating data across dimensional axes for instant querying." },
  { title: "One-Hot Encoding", definition: "A transformation technique that converts categorical variables into binary vectors containing a single 1 and all other values as 0." },
  { title: "Open Catalog", definition: "A catalog architecture based on open API standards (such as Polaris REST), allowing multiple analytic engines to share access permissions." },
  
  // P
  { title: "Projection", definition: "In SQL and data pipelines, projection refers to choosing a subset of columns from a table to reduce memory and speed up processing." },
  { title: "PyIceberg", definition: "A pythonic library designed to read and write Apache Iceberg tables without requiring a Java virtual machine dependency." },
  { title: "Python DataFusion", definition: "An extensible query engine written in Rust that compiles SQL queries to run locally over datasets using Apache Arrow memory formats." },
  
  // R
  { title: "Regression", definition: "A class of supervised machine learning algorithms focused on predicting continuous numerical values based on input variables." },
  { title: "Root Metadata", definition: "The top-level JSON file in Apache Iceberg that points to the manifest lists and defines the active state of a table." },
  { title: "RPC (Remote Procedure Call)", definition: "A protocol that allows a program to execute a subroutine or procedure on a different computer network without manual details." },
  
  // S
  { title: "Snapshot", definition: "A logical view of a transactional table at a specific point in time, enabling time travel queries and consistent reads." },
  { title: "Sitemap", definition: "An XML file listing all accessible URLs on a website, helping search engine web crawlers index the site efficiently." },
  { title: "Semantic Store", definition: "The registry containing model dimensions, metric equations, and relationship joins defining a semantic layer." },
  { title: "Schema Drift", definition: "The challenge where upstream data source schemas change unexpectedly, potentially breaking downstream analytical pipelines." },
  
  // T
  { title: "Tabular Catalog", definition: "A cloud catalog service managing Iceberg tables with built-in storage optimization, compaction, and role-based security." },
  { title: "Tuning", definition: "The process of adjusting hyperparameters in machine learning or database configurations to optimize performance metrics." },
  
  // V
  { title: "Vector Search Engine", definition: "A search database specializing in indexing high-dimensional vectors and executing fast nearest-neighbor queries." },
  { title: "Vector Similarity", definition: "A mathematical measure of how closely aligned two vectors are in high-dimensional space, calculated using distance metrics." },
  
  // W
  { title: "Web Crawler", definition: "An automated bot that systematically scans and downloads web pages to index them for search engines." },

  // Let's add 20 extra terms to guarantee we are well over 200 (then we slice exactly to 200)
  { title: "Zero-Shot Learning", definition: "A machine learning scenario where a model is asked to classify or understand concepts it has never explicitly seen in training, relying on general contextual training." },
  { title: "Data Steward", definition: "A role responsible for maintaining the quality, metadata, and security policies of datasets, acting as the custodian of data assets." },
  { title: "Data Sharing", definition: "The ability to securely share database tables or lakehouse datasets with external partners or departments without copying files." },
  { title: "Vector Quantization", definition: "A compression method in vector search databases that maps vectors to codebook indices, saving memory at the cost of slight recall loss." },
  { title: "Query Federation Engine", definition: "An engine designed to coordinate query execution plan structures across multiple independent database storage interfaces." },
  { title: "Materialized View Refresh", definition: "The technique used to synchronize precalculated views with incoming transaction write updates." },
  { title: "Metadata Store", definition: "The database database storage layout that keeps track of dataset schemas, column properties, and transaction history." },
  { title: "Star Schema Join", definition: "The execution logic that merges multiple dimension table records with fact table metrics." },
  { title: "Data Lineage Graph", definition: "A visual graph representing the transformation steps, source origins, and destinations of data columns." },
  { title: "Database Index", definition: "A structured pointer table created on columns to speed up value filtering at the expense of disk space." },
  { title: "Distributed Query", definition: "A query executed across multiple database instances or cluster computing nodes in parallel." },
  { title: "S3 API", definition: "The HTTP REST API specification created by Amazon S3, widely adopted as the industry standard for object storage engines." },
  { title: "Compaction Job", definition: "A scheduled worker process that rewrites transactional log files to optimize query execution times." },
  { title: "Partition Key", definition: "The column or field value used to slice a database table or lakehouse folder structure into distinct partitions." },
  { title: "Schema Definition", definition: "The formal JSON, YAML, or DDL script specifying table columns, data types, and constraint relationships." },
  { title: "LLM Prompting", definition: "The practice of submitting context-rich instruction templates to Large Language Models to shape output generation." },
  { title: "Retrieval Step", definition: "The phase in a RAG system where the database searches vector stores to extract documents matching a query vector." },
  { title: "Metric Store API", definition: "The API interface that exposes unified semantic metric metrics to BI dashboards and programmatic pipelines." },
  { title: "Feature Selection", definition: "The machine learning preprocessing step of selecting the most informative variables to train an algorithm." },
  { title: "Training Dataset", definition: "The master dataset containing input features and target labels used to adjust artificial neural network weights." }
];

// Combine both arrays
const allTerms = [...terms, ...additionalTerms];

// Sort terms alphabetically
allTerms.sort((a, b) => a.title.localeCompare(b.title));

console.log(`Curating a total of ${allTerms.length} terms...`);

// Let's filter or slice to guarantee exactly 200 terms!
const finalTerms = allTerms.slice(0, 200);
console.log(`Writing exactly ${finalTerms.length} terms to files.`);

// Generate the main Terms.md page content
let termsMdContent = `# Data & AI Terms\n\nWelcome to the comprehensive dictionary of Data, Lakehouse, and Artificial Intelligence terms. Below is an alphabetical listing of definitions and architectures.\n\n`;

// Group terms by starting letter for indexing
const groups = {};
for (const term of finalTerms) {
  const letter = term.title.charAt(0).toUpperCase();
  if (!groups[letter]) {
    groups[letter] = [];
  }
  groups[letter].push(term);
}

// Generate the alphabetical jump links
termsMdContent += `## Alphabetical Index\n\n`;
const letters = Object.keys(groups).sort();
termsMdContent += letters.map(l => `[${l}](#${l.toLowerCase()})`).join(' | ') + `\n\n`;

// Generate the list links in Terms.md
for (const letter of letters) {
  termsMdContent += `### ${letter}\n\n`;
  for (const term of groups[letter]) {
    // Generate clean slug for link: e.g. Apache-Iceberg
    const cleanSlug = term.title
      .replace(/[^a-zA-Z0-9\s-_]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
    termsMdContent += `- [${term.title}](${cleanSlug})\n`;
  }
  termsMdContent += `\n`;
}

// Write the main Terms.md file
fs.writeFileSync(path.join(wikiDir, 'Terms.md'), termsMdContent, 'utf-8');
console.log(`Created Terms.md successfully.`);

// Write the individual term markdown files
for (const term of finalTerms) {
  const cleanSlug = term.title
    .replace(/[^a-zA-Z0-9\s-_]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

  const termFilePath = path.join(wikiDir, `${cleanSlug}.md`);
  
  const termContent = `# ${term.title}\n\n${term.definition}\n\n---\n*Part of the [Data & AI Terms](Terms) glossary.*`;
  
  fs.writeFileSync(termFilePath, termContent, 'utf-8');
}

console.log(`Generated all 200 term markdown files directly inside wiki/ directory.`);
