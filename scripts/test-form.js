const { MongoClient } = require('mongodb');

// Test data
const testContact = {
  name: 'Test User',
  surname: 'Test Surname',
  phone: '+27123456789',
  email: 'test@example.com',
  location: 'Test City',
  postalCode: '12345',
  province: 'Gauteng',
  userType: 'individual',
  service: 'consultation',
  isTest: true,
  createdAt: new Date()
};

async function testFormSubmission() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('Please set MONGODB_URI environment variable');
    process.exit(1);
  }

  const client = new MongoClient(uri);

  try {
    console.log('Connecting to MongoDB Atlas...');
    await client.connect();
    
    const db = client.db('proliink');
    const contacts = db.collection('contacts');
    
    // 1. Insert test contact
    console.log('\nInserting test contact...');
    const insertResult = await contacts.insertOne(testContact);
    console.log('Test contact inserted:', insertResult.insertedId);
    
    // 2. Verify the contact was stored correctly
    console.log('\nVerifying stored contact...');
    const storedContact = await contacts.findOne({ _id: insertResult.insertedId });
    console.log('Stored contact:', storedContact);
    
    // 3. Verify all required fields are present
    const requiredFields = ['name', 'surname', 'phone', 'email', 'location', 'postalCode', 'province'];
    const missingFields = requiredFields.filter(field => !storedContact[field]);
    
    if (missingFields.length > 0) {
      console.error('\n❌ Missing required fields:', missingFields);
    } else {
      console.log('\n✅ All required fields are present');
    }
    
    // 4. Clean up test data
    console.log('\nCleaning up test data...');
    const deleteResult = await contacts.deleteOne({ _id: insertResult.insertedId });
    console.log('Test contact deleted:', deleteResult.deletedCount);
    
    console.log('\n✅ Form submission test completed successfully!');
    
  } catch (error) {
    console.error('\n❌ Test failed:', error);
  } finally {
    await client.close();
  }
}

testFormSubmission(); 