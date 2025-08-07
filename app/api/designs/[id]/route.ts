import { NextRequest, NextResponse } from 'next/server'
import { getDesignFromAirtable } from '@/lib/airtable'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const design = await getDesignFromAirtable(id)

    if (!design) {
      return NextResponse.json(
        { error: 'Design not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(design)
  } catch (error) {
    console.error('Error getting design:', error)
    return NextResponse.json(
      { error: 'Failed to get design' },
      { status: 500 }
    )
  }
}