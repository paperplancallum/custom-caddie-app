'use client'

import { Upload } from 'lucide-react'
import { useCustomizerStore } from '@/store/customizer-store'
import { MAX_TEXT_LENGTHS } from '@/lib/constants'

export default function PersonalizationPanel() {
  const { personalization, updatePersonalization } = useCustomizerStore()

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      updatePersonalization({ logo: file })
    }
  }

  const generateInitials = () => {
    const { firstName, middleName, lastName } = personalization
    let initials = ''
    if (firstName) initials += firstName[0].toUpperCase()
    if (middleName) initials += middleName[0].toUpperCase()
    if (lastName) initials += lastName[0].toUpperCase()
    return initials.slice(0, MAX_TEXT_LENGTHS.initials)
  }

  const handleNameChange = (field: 'firstName' | 'middleName' | 'lastName', value: string) => {
    updatePersonalization({ [field]: value })
    // Auto-generate initials
    const updatedPersonalization = { ...personalization, [field]: value }
    let initials = ''
    if (updatedPersonalization.firstName) initials += updatedPersonalization.firstName[0].toUpperCase()
    if (updatedPersonalization.middleName) initials += updatedPersonalization.middleName[0].toUpperCase()
    if (updatedPersonalization.lastName) initials += updatedPersonalization.lastName[0].toUpperCase()
    updatePersonalization({ initials: initials.slice(0, MAX_TEXT_LENGTHS.initials) })
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-serif font-bold text-golf-green">Personalization</h2>
      
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">First Name *</label>
            <input
              type="text"
              value={personalization.firstName}
              onChange={(e) => handleNameChange('firstName', e.target.value)}
              className="input-field"
              placeholder="John"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Middle Name</label>
            <input
              type="text"
              value={personalization.middleName || ''}
              onChange={(e) => handleNameChange('middleName', e.target.value)}
              className="input-field"
              placeholder="Michael"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Last Name *</label>
            <input
              type="text"
              value={personalization.lastName}
              onChange={(e) => handleNameChange('lastName', e.target.value)}
              className="input-field"
              placeholder="Smith"
              required
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium mb-2">
            Initials (Auto-generated, max {MAX_TEXT_LENGTHS.initials} characters)
          </label>
          <input
            type="text"
            value={personalization.initials}
            onChange={(e) => updatePersonalization({ initials: e.target.value.toUpperCase() })}
            maxLength={MAX_TEXT_LENGTHS.initials}
            className="input-field"
            placeholder="JMS"
          />
          <p className="text-xs text-gray-500 mt-1">
            You can override the auto-generated initials if needed
          </p>
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Custom Logo (Optional)</h3>
        
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            {personalization.logo ? (
              <div className="space-y-2">
                <p className="text-sm text-golf-green font-medium">
                  Logo uploaded: {personalization.logo.name}
                </p>
                <button
                  onClick={() => updatePersonalization({ logo: null })}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  Remove logo
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <Upload className="w-12 h-12 mx-auto text-gray-400" />
                <div>
                  <label htmlFor="logo-upload" className="cursor-pointer">
                    <span className="text-golf-green hover:text-golf-fairway font-medium">
                      Click to upload
                    </span>
                    <span className="text-gray-500"> or drag and drop</span>
                  </label>
                  <input
                    id="logo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            )}
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> Logo upload adds $15 to your order. Our design team will optimize your logo for the selected products.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}