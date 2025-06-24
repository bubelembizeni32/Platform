const { MongoClient } = require('mongodb');

// Replace this with your actual production connection string
const uri = process.env.MONGODB_URI;

async function testConnection() {
  if (!uri) {
    console.error('Please set MONGODB_URI environment variable');
    process.exit(1);
  }

  const client = new MongoClient(uri);

  try {
    console.log('Connecting to MongoDB Atlas...');
    await client.connect();
    
    const db = client.db('proliink');
    
    // Test database operations
    console.log('Testing database operations...');
    
    // List collections
    const collections = await db.listCollections().toArray();
    console.log('Available collections:', collections.map(c => c.name));
    
    // Test contacts collection
    const contacts = db.collection('contacts');
    
    // Insert a test document
    const testDoc = {
      name: 'Test User',
      email: 'test@example.com',
      message: 'Production connection test',
      createdAt: new Date(),
      isTest: true
    };
    
    const result = await contacts.insertOne(testDoc);
    console.log('Test document inserted:', result.insertedId);
    
    // Clean up test document
    await contacts.deleteOne({ _id: result.insertedId });
    console.log('Test document cleaned up');
    
    console.log('\n✅ Production MongoDB connection successful!');
  } catch (error) {
    console.error('\n❌ Connection test failed:', error);
  } finally {
    await client.close();
    process.exit(0);
  }
}

testConnection(); 