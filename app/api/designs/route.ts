import { NextRequest, NextResponse } from 'next/server'
import { saveDesignToAirtable } from '@/lib/airtable'
import { CustomizerState } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { design, email }: { design: CustomizerState; email?: string } = body

    const result = await saveDesignToAirtable(design, email)

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error saving design:', error)
    return NextResponse.json(
      { error: 'Failed to save design' },
      { status: 500 }
    )
  }
}