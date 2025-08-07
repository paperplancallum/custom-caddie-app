'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Package, Truck, Home } from 'lucide-react'

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const [orderDetails, setOrderDetails] = useState<any>(null)

  useEffect(() => {
    // In a real app, you'd fetch order details using the session_id
    const sessionId = searchParams.get('session_id')
    if (sessionId) {
      // Mock order details
      setOrderDetails({
        orderId: 'CC-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      })
    }
  }, [searchParams])

  return (
    <div className="min-h-screen bg-gradient-to-br from-golf-sand/20 to-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="card text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-serif font-bold text-golf-green mb-4">
            Order Confirmed!
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            Thank you for your order. We've received your custom golf set design and our team is already working on it.
          </p>

          {orderDetails && (
            <div className="bg-golf-sand/20 rounded-lg p-6 mb-8">
              <p className="text-sm text-gray-600 mb-2">Order Number</p>
              <p className="text-2xl font-bold text-golf-green mb-4">{orderDetails.orderId}</p>
              
              <p className="text-sm text-gray-600 mb-2">Estimated Delivery</p>
              <p className="text-lg font-semibold">{orderDetails.estimatedDelivery}</p>
            </div>
          )}

          {/* What's Next */}
          <div className="text-left mb-8">
            <h2 className="text-xl font-semibold mb-4">What happens next?</h2>
            
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-golf-light/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-golf-green font-bold">1</span>
                </div>
                <div>
                  <p className="font-semibold">Design Review</p>
                  <p className="text-sm text-gray-600">
                    Our design team will review your customization within 24 hours
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 bg-golf-light/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-golf-green font-bold">2</span>
                </div>
                <div>
                  <p className="font-semibold">Production</p>
                  <p className="text-sm text-gray-600">
                    Your items will be crafted with care (3-5 business days)
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 bg-golf-light/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-golf-green font-bold">3</span>
                </div>
                <div>
                  <p className="font-semibold">Shipping</p>
                  <p className="text-sm text-gray-600">
                    You'll receive tracking information once your order ships
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="btn-primary flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </Link>
            
            <Link
              href="/customize"
              className="btn-secondary flex items-center justify-center gap-2"
            >
              <Package className="w-5 h-5" />
              Create Another Set
            </Link>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>
            You will receive an email confirmation shortly with your order details.
          </p>
          <p className="mt-2">
            Questions? Contact us at{' '}
            <a href="mailto:support@customcaddie.com" className="text-golf-green hover:text-golf-fairway">
              support@customcaddie.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}