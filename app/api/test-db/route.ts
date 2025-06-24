import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function GET() {
  try {
    // Test connection
    console.log('Testing MongoDB connection...')
    const client = await clientPromise
    const db = client.db("proliink")
    
    // Test database operations
    console.log('Testing database operations...')
    
    // 1. Create test collection if it doesn't exist
    const collections = await db.listCollections().toArray()
    const collectionNames = collections.map(c => c.name)
    console.log('Existing collections:', collectionNames)
    
    // 2. Test write operation
    const testDoc = {
      type: 'connection_test',
      timestamp: new Date(),
      testId: Math.random().toString(36).substring(7)
    }
    
    const writeResult = await db.collection('contacts').insertOne(testDoc)
    console.log('Test document written:', writeResult.insertedId)
    
    // 3. Test read operation
    const readResult = await db.collection('contacts')
      .findOne({ _id: writeResult.insertedId })
    console.log('Test document read:', readResult)
    
    // 4. Test update operation
    const updateResult = await db.collection('contacts')
      .updateOne(
        { _id: writeResult.insertedId },
        { $set: { updated: true } }
      )
    console.log('Test document updated:', updateResult.modifiedCount)
    
    // 5. Test delete operation
    const deleteResult = await db.collection('contacts')
      .deleteOne({ _id: writeResult.insertedId })
    console.log('Test document deleted:', deleteResult.deletedCount)
    
    // Return success response with details
    return NextResponse.json({
      status: "All tests passed successfully",
      details: {
        connection: "Connected to MongoDB Atlas",
        database: "proliink",
        collections: collectionNames,
        operations: {
          write: writeResult.acknowledged,
          read: readResult !== null,
          update: updateResult.modifiedCount === 1,
          delete: deleteResult.deletedCount === 1
        }
      }
    }, { status: 200 })
    
  } catch (error) {
    console.error('Database test failed:', error)
    return NextResponse.json({
      status: "Connection test failed",
      error: error instanceof Error ? error.message : "Unknown error",
      details: error instanceof Error ? error.stack : undefined
    }, { status: 500 })
  }
} 