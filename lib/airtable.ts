import Airtable from 'airtable'
import { CustomizerState, Design, Order } from '@/types'
import { generateOrderId } from './utils'

const getBase = () => {
  if (process.env.AIRTABLE_API_KEY && process.env.AIRTABLE_BASE_ID) {
    return new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID)
  }
  return null
}

export async function saveDesignToAirtable(
  design: CustomizerState,
  email?: string
): Promise<{ id: string; shareUrl: string; editUrl: string }> {
  const base = getBase()
  if (!base) {
    // Fallback for development without Airtable
    const id = Math.random().toString(36).substr(2, 9)
    return {
      id,
      shareUrl: `/share/${id}`,
      editUrl: `/customize?edit=${id}`,
    }
  }

  try {
    const record = await base!('Designs').create({
      'Email': email || '',
      'Design Data': JSON.stringify(design),
      'Status': 'Draft',
      'Created': new Date().toISOString(),
    })

    return {
      id: record.id,
      shareUrl: `/share/${record.id}`,
      editUrl: `/customize?edit=${record.id}`,
    }
  } catch (error) {
    console.error('Error saving design to Airtable:', error)
    throw new Error('Failed to save design')
  }
}

export async function getDesignFromAirtable(designId: string): Promise<Design | null> {
  const base = getBase()
  if (!base) {
    // Fallback for development
    return null
  }

  try {
    const record = await base!('Designs').find(designId)
    
    return {
      id: record.id,
      email: record.get('Email') as string || undefined,
      designData: JSON.parse(record.get('Design Data') as string),
      createdAt: new Date(record.get('Created') as string),
      updatedAt: new Date(record.get('Updated') as string || record.get('Created') as string),
      status: record.get('Status') as 'draft' | 'completed',
    }
  } catch (error) {
    console.error('Error getting design from Airtable:', error)
    return null
  }
}

export async function createOrderInAirtable(orderData: {
  stripePaymentId: string
  designId: string
  customer: {
    email: string
    name: string
    address: any
  }
  amount: number
}): Promise<Order> {
  const orderId = generateOrderId()

  const base = getBase()
  if (!base) {
    // Fallback for development
    return {
      orderId,
      stripePaymentId: orderData.stripePaymentId,
      customerEmail: orderData.customer.email,
      customerName: orderData.customer.name,
      shippingAddress: orderData.customer.address,
      designId: orderData.designId,
      items: {} as any,
      totalAmount: orderData.amount,
      status: 'paid',
      createdAt: new Date(),
    }
  }

  try {
    const record = await base!('Orders').create({
      'Order ID': orderId,
      'Stripe Payment ID': orderData.stripePaymentId,
      'Design': [orderData.designId],
      'Customer Email': orderData.customer.email,
      'Customer Name': orderData.customer.name,
      'Shipping Address': JSON.stringify(orderData.customer.address),
      'Total Amount': orderData.amount / 100,
      'Status': 'Paid',
      'Order Date': new Date().toISOString(),
    })

    return {
      orderId,
      stripePaymentId: orderData.stripePaymentId,
      customerEmail: orderData.customer.email,
      customerName: orderData.customer.name,
      shippingAddress: orderData.customer.address,
      designId: orderData.designId,
      items: {} as any,
      totalAmount: orderData.amount,
      status: 'paid',
      createdAt: new Date(),
    }
  } catch (error) {
    console.error('Error creating order in Airtable:', error)
    throw new Error('Failed to create order')
  }
}

export async function updateOrderStatus(
  orderId: string,
  status: Order['status'],
  trackingNumber?: string
): Promise<void> {
  const base = getBase()
  if (!base) {
    return
  }

  try {
    const records = await base!('Orders').select({
      filterByFormula: `{Order ID} = '${orderId}'`,
      maxRecords: 1,
    }).firstPage()

    if (records.length > 0) {
      await base!('Orders').update(records[0].id, {
        'Status': status.charAt(0).toUpperCase() + status.slice(1),
        ...(trackingNumber && { 'Tracking Number': trackingNumber }),
      })
    }
  } catch (error) {
    console.error('Error updating order status:', error)
    throw new Error('Failed to update order status')
  }
}