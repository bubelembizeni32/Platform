import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("proliink")
    
    // Try to list collections to verify connection
    const collections = await db.listCollections().toArray()
    
    return NextResponse.json({
      status: "success",
      message: "Successfully connected to MongoDB",
      collections: collections.map(c => c.name)
    })
  } catch (error) {
    console.error('MongoDB connection test failed:', error)
    return NextResponse.json({
      status: "error",
      message: "Failed to connect to MongoDB",
      error: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
} 