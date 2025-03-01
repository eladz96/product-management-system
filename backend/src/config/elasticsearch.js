// backend/src/config/elasticsearch.js

const { Client } = require('@elastic/elasticsearch');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

// Initialize Elasticsearch client
const esClient = new Client({
    node: process.env.ES_HOST || 'http://localhost:9200'
});

// Function to check and create the index if not exists
async function initializeElasticsearch() {
    try {
        const indexExists = await esClient.indices.exists({ index: 'products' });
        if (!indexExists) {
            await esClient.indices.create({
                index: 'products',
                body: {
                    mappings: {
                        properties: {
                            id: { type: 'integer' },
                            name: { type: 'text' },
                            description: { type: 'text' },
                            price: { type: 'float' },
                            userId: { type: 'integer' }
                        }
                    }
                }
            });
            console.log('✅ Elasticsearch index "products" created');
        }
    } catch (error) {
        console.error('❌ Error initializing Elasticsearch:', error);
    }
}

initializeElasticsearch(); // Run at startup

module.exports = esClient;
